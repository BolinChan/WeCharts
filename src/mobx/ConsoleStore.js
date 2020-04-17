import { observable, computed, flow, action } from "mobx"
import * as services from "../services/services"
import dayjs from "dayjs"

export default class ConsoleStore {
    @observable messages = []
    @observable hasMore = true
    @observable init = false
    @observable recording = false
    @observable polling = false
    @observable checking = false

    constructor (rootStore) {
        this.rootStore = rootStore
    }

    initConsole = flow(function * (userid) {
        if (userid) {
            this.init = false
            const data = yield services.fetchMessages({
                id: "",
                userid,
                size: 10,
            })
            if (!data.error && userid === this.rootStore.AuthStore.chatsCurrent) {
                this.messages = data.data
                this.hasMore = !data.nomore
            }
            this.init = true
        }
    })

    @action
    reset () {
        this.init = false
        this.recording = false
        this.polling = false
    }

    @computed
    get data () {
        return this.init ? this.messages.slice() : []
    }

    @computed
    get imageUrls () {
        let re = []
        let data = this.data
        if (data && data.length > 0) {
            data.map((item) => {
                if (item.type === "2") {
                    re.unshift({ url: item.url, id: item.id })
                }
            })
        }
        return re
    }

    @computed
    get recordId () {
        let id = ""
        const list = this.data
        if (list && list.length > 0) {
            id = list[list.length - 1].id
        }
        return id
    }

    @computed
    get pollId () {
        let id = ""
        const list = this.data
        if (list && list.length > 0) {
            id = list[0].id
        }
        return id
    }

    fetchRecord = flow(function * (userid) {
        if (userid && !this.recording) {
            this.recording = true
            const data = yield services.fetchMessages({
                id: this.recordId,
                userid,
                size: 10,
            })
            if (!data.error) {
                let messages = this.data
                this.messages = messages.concat(data.data)
                this.hasMore = !data.nomore
            }
            this.recording = false
        }
    })

    pollUpdate = flow(function * (act) {
        if (act && this.init && !this.polling) {
            this.polling = true
            const data = yield services.pollConsole({
                kefu_wxid: act.kefu_wxid,
                userid: act.userid,
                wxid: act.wxid,
                id: this.pollId,
            })
            if (!data.error) {
                const items = data.data
                if (items && items.length > 0) {
                    let messages = this.data
                    if (messages && messages.length > 0) {
                        let index = -1
                        let newMsg = []
                        items.map((item) => {
                            index = messages.findIndex((msg) => item.id && msg.id === item.id)
                            if (index === -1) {
                                newMsg.push(item)
                            }
                            index = messages.findIndex((msg) => item.key && msg.key === item.key)
                            if (index !== -1) {
                                messages.splice(index, 1)
                                newMsg.push(item)
                            }
                        })
                        messages = newMsg.concat(messages)
                    } else {
                        messages = items
                    }
                    this.messages = messages
                }
            }
            this.polling = false
        }
    })

    forward = flow(function * (opt) {
        const data = yield services.forward(opt)
        if (!data.error) {
            this.rootStore.ToastStore.success("已发送", "")
        } else {
            this.rootStore.ToastStore.error("发送失败", "")
        }
    })

    @action
    addMsg (msg) {
        const wechat = this.rootStore.AuthStore.wechat
        msg.msgStatus = "pending"
        msg.status = "0"
        msg.headImg = wechat.headimg
        let messages = this.data
        this.messages = [msg].concat(messages)
    }

    @action
    updateMsg (data) {
        let messages = this.data
        if (messages && messages.length > 0) {
            const index = messages.findIndex((msg) => msg.key === data.key)
            if (index !== -1) {
                messages[index] = { ...messages[index], ...data }
                this.messages = messages
            }
        }
    }

    sendMsg = flow(function * (opt) {
        const wechat = this.rootStore.AuthStore.wechat
        const chat = this.rootStore.AuthStore.chatsAct
        opt = {
            ...opt,
            tag: chat.wxid,
            device_wxid: wechat.wxid,
            userid: chat.userid,
        }
        const data = yield services.sendMsg(opt)
        let upData = { key: opt.key }
        if (!data.error) {
            upData.id = data.hid
        } else {
            upData.msgStatus = "error"
        }
        this.updateMsg(upData)
    })

    @computed
    get pendingMsg () {
        let re = []
        const msgs = this.data
        if (msgs && msgs.length > 0) {
            re = msgs.filter((msg) => msg.msgStatus === "pending")
        }
        return re
    }
    @action
    checkMsg () {
        const msgs = this.pendingMsg
        if (msgs && msgs.length > 0) {
            const format = "YYYY-MM-DD HH:mm:ss"
            msgs.map((msg) => {
                const addtime = dayjs(msg.addtime, format).unix()
                const now = dayjs().unix()
                if (now - addtime >= 30) {
                    this.fetchMsgStatus(msg)
                }
            })
        }
    }
    fetchMsgStatus = flow(function * (msg) {
        if (!this.checking) {
            this.checking = true
            const data = yield services.fetchMsgStatus({ hid: msg.id })
            let upData = {
                key: msg.key,
                msgStatus: data.error ? "error" : "success",
            }
            this.updateMsg(upData)
            this.checking = false
        }
    })
}
