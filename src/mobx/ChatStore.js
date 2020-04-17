import { observable, computed, flow, action } from "mobx"
import * as services from "../services/services"

export default class ChatStore {
    @observable chats = []
    @observable page = 0
    @observable hasMore = true

    @observable init = false
    @observable refreshing = false
    @observable loading = false
    @observable polling = false
    @observable pollId = ""

    constructor (rootStore) {
        this.rootStore = rootStore
    }

    @computed
    get data () {
        let list = this.chatsData
        if (list.length > 0) {
            const kefu_wxids = this.rootStore.AuthStore.kefu_wxids
            if (kefu_wxids.length > 0) {
                list = list.filter((item) => kefu_wxids.indexOf(item.kefu_wxid) !== -1)
                if (list.length > 0) {
                    let topChats = []
                    let chats = []
                    list.map((item) => {
                        if (item.istop) {
                            topChats.push(item)
                        } else {
                            chats.push(item)
                        }
                    })
                    list = topChats.concat(chats)
                }
            } else {
                list = []
            }
        }
        return list
    }

    @computed
    get chatsData () {
        return this.chats.slice()
    }

    @action
    opt (kefu_wxid) {
        let opt = {
            type: kefu_wxid ? kefu_wxid : "all",
            typeOf: "chats",
        }
        if (kefu_wxid === 0) {
            opt.kefuid = this.rootStore.AuthStore.id
        }
        if (kefu_wxid) {
            opt.kefu_wxid = [kefu_wxid]
        }
        return opt
    }

    initChats = flow(function * (kefu_wxid) {
        if (kefu_wxid || kefu_wxid === 0) {
            this.init = false
            this.chats = []
            this.hasMore = true
            let opt = this.opt(kefu_wxid)
            opt.page = 1
            const data = yield services.fetchChats(opt)
            if (!data.error) {
                this.chats = data.data || []
                this.page = opt.page
                this.hasMore = data.hasMore
            }
            this.init = true
        }
    })

    refresh = flow(function * (kefu_wxid) {
        if ((kefu_wxid || kefu_wxid === 0) && !this.refreshing) {
            this.refreshing = true
            let opt = this.opt(kefu_wxid)
            opt.page = 1
            const data = yield services.fetchChats(opt)
            if (!data.error) {
                this.chats = data.data || []
                this.page = opt.page
                this.hasMore = data.hasMore
            }
            this.refreshing = false
        }
    })

    loadMore = flow(function * (kefu_wxid) {
        if ((kefu_wxid || kefu_wxid === 0) && !this.loading) {
            this.loading = true
            let opt = this.opt(kefu_wxid)
            opt.page = this.page + 1
            const data = yield services.fetchChats(opt)
            if (!data.error) {
                this.page = opt.page
                this.hasMore = data.hasMore
                const items = data.data || []
                if (items.length > 0) {
                    let chats = this.chatsData
                    if (chats && chats.length > 0) {
                        items.map((item) => {
                            if (chats.findIndex((chat) => chat.userid === item.userid) === -1) {
                                chats.push(item)
                            }
                        })
                    } else {
                        chats = items
                    }
                    this.chats = chats
                }
            }
            this.loading = false
        }
    })

    pollUpdate = flow(function * (kefu_wxid) {
        if (this.init && !this.refreshing && !this.polling) {
            this.polling = true
            let opt = {
                id: this.pollId,
                type: kefu_wxid ? 1 : 2,
                kefu_wxid,
                typeOf: "chats",
                userid: this.rootStore.AuthStore.chatsCurrent,
            }
            const data = yield services.pollUpdate(opt)
            if (!data.error && kefu_wxid === this.rootStore.AuthStore.wechatsCurrent) {
                this.pollId = data.hid
                const items = data.friends || []
                if (items.length > 0) {
                    let chats = this.chatsData
                    if (chats && chats.length > 0) {
                        let index = -1
                        items.map((item) => {
                            index = chats.findIndex((chat) => chat.userid === item.userid)
                            if (index !== -1) {
                                chats.splice(index, 1)
                            }
                        })
                        chats = items.concat(chats)
                    } else {
                        chats = items
                    }
                    this.chats = chats
                }
                const devices = data.devices || []
                if (devices.length > 0) {
                    this.rootStore.AuthStore.upWechats(devices)
                }
            }
            this.polling = false
        }
    })

    @action
    update (item, add = false) {
        let chats = this.chatsData
        if (chats && chats.length > 0) {
            const index = chats.findIndex((chat) => chat.userid === item.userid)
            if (index !== -1) {
                chats[index] = { ...item, unread: chats[index].unread }
            } else if (add) {
                chats.push(item)
            }
        } else if (add) {
            chats.push(item)
        }
        this.chats = chats
    }

    @action
    upLastTime (userid) {
        this.updateLastTime(userid)
        this.clearUnread(userid)
    }

    updateLastTime = flow(function * (userid) {
        yield services.updateLastTime({ userid })
    })

    @action
    clearUnread (userid) {
        if (userid) {
            let chats = this.chatsData
            if (chats && chats.length > 0) {
                const index = chats.findIndex((chat) => chat.userid === userid)
                if (index !== -1) {
                    chats[index].unread = 0
                }
            }
            this.chats = chats
        }
    }

}
