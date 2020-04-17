import { observable, flow, reaction, computed, action } from "mobx"
import * as services from "../services/services"
import Storage from "../utils/Storage"
import NavigationService from "../utils/Navigation"
const all = {
    wxid: 0,
    headimg: "",
    nickname: "聚合聊天",
    devicename: "所有微信",
}
const sections = [
    { type: "current", title: "当前选择", data: [] },
    { type: "list", title: "选择微信", data: [] },
]
export default class AuthStore {
    @observable isVerify = ""
    @observable auth = {}
    @observable init = false
    @observable wechats = []
    @observable wechatsAct = {}
    @observable chatsAct = {}
    @observable groupsAct = {}

    constructor (rootStore) {
        this.rootStore = rootStore
    }

    verify = flow(function * () {
        const token = yield Storage.get("token") || ""
        if (!token) {
            this.isVerify = false
        } else {
            this.verifyToken()
        }
    })

    verifyToken = flow(function * () {
        const data = yield services.verify({})
        let isVerify = false
        let auth = ""
        let token = ""
        if (!data.error) {
            isVerify = true
            auth = data.data
            token = data.data.token
        }
        this.auth = auth
        this.isVerify = isVerify
        Storage.set("token", token)
    })

    login = flow(function * (payload) {
        const { ToastStore } = this.rootStore
        ToastStore.loading("")
        const data = yield services.login(payload)
        if (!data.error) {
            ToastStore.success("登录成功", "")
            this.auth = data.data
            this.isVerify = true
            Storage.set("token", data.data.token)
        } else {
            ToastStore.error(data.errmsg, "")
        }
    })

    autoInit = reaction(() => this.isVerify, (isVerify) => {
        NavigationService.navigate(isVerify ? "Modal" : "Auth")
        if (isVerify) {
            this.fetchWechats()
        } else {
            this.auth = {}
            this.init = false
            this.wechats = []
            this.wechatsAct = {}
            this.chatsAct = {}
            this.groupsAct = {}
        }
    })

    fetchWechats = flow(function * () {
        this.init = false
        const data = yield services.fetchWechats({})
        if (!data.error) {
            const wechats = data.data || []
            this.wechats = wechats
            this.upWechatsAct(wechats.length > 0 ? wechats[0] : all)
        }
        this.init = true
    })

    @action
    upWechatsAct (act) {
        this.wechatsAct = act
    }

    @action
    upChatsAct (act) {
        this.chatsAct = act
    }

    @action
    upGroupsAct (act) {
        this.groupsAct = act
    }

    @computed
    get wechatsCurrent () {
        return this.wechatsAct.wxid
    }

    @computed
    get chatsCurrent () {
        return this.chatsAct.userid || ""
    }

    @computed
    get groupsCurrent () {
        return this.groupsAct.id || ""
    }

    @computed
    get kefu_wxids () {
        let re = []
        const wechatsAct = this.wechatsAct
        if (wechatsAct) {
            const kefe_wxid = wechatsAct.wxid
            if (kefe_wxid) {
                re.push(kefe_wxid)
            } else {
                const wechats = this.wechatsData
                if (wechats && wechats.length > 0) {
                    wechats.map((item) => {
                        re.push(item.wxid)
                    })
                }
            }
        }
        return re
    }

    @computed
    get id () {
        return this.auth.id
    }

    @computed
    get wechat () {
        let re = ""
        const chatsAct = this.chatsAct
        if (chatsAct) {
            const wechats = this.wechatsData
            if (wechats && wechats.length > 0) {
                const index = wechats.findIndex((wechat) => wechat.wxid === chatsAct.kefu_wxid)
                if (index !== -1) {
                    re = wechats[index]
                }
            }
        }
        return re
    }

    @computed
    get wechatsData () {
        return this.wechats.slice()
    }

    @computed
    get sections () {
        let re = sections
        let list = this.wechatsData
        if (list && list.length > 0) {
            re[0].data = [{ ...this.wechatsAct, unread: this.unread }]
            re[1].data = [{ ...all, unread: this.allUnread }].concat(list)
        }
        return re
    }

    @computed
    get allUnread () {
        let un = 0
        const wechats = this.wechatsData
        if (wechats && wechats.length > 0) {
            wechats.map((item) => {
                un += Number(item.unread)
            })
        }
        return un
    }

    @computed
    get unread () {
        let un = 0
        const wxid = this.wechatsCurrent
        if (wxid === 0) {
            un = this.allUnread
        }
        if (wxid) {
            const wechats = this.wechatsData
            if (wechats && wechats.length > 0) {
                const wechat = wechats.find((item) => item.wxid === wxid)
                un = wechat.unread
            }
        }
        return un
    }

    @action
    upWechats (items) {
        let wechats = this.wechatsData
        if (wechats && wechats.length > 0) {
            let index = -1
            items.map((item) => {
                index = wechats.findIndex((wechat) => wechat.wxid === item.wxid)
                if (index !== -1) {
                    wechats[index].unread = item.unread
                }
            })
            this.wechats = wechats
        }
    }

    @action
    logOut () {
        Storage.set("token", "")
        this.isVerify = false
    }

    addFriendByCard = flow(function * (MsgSvrId) {
        let re = { error: true, errmsg: "请求失败" }
        if (MsgSvrId) {
            const chatsAct = this.chatsAct
            re = yield services.addFriendByCard({
                MsgSvrId,
                WeChatId: chatsAct.kefu_wxid,
            })
        }
        return re
    })

    upRemark = flow(function * (remark) {
        let chatsAct = this.chatsAct
        chatsAct.remark = remark
        this.chatsAct = chatsAct
        const data = yield services.upRemark({
            wxid: chatsAct.wxid,
            kefu_wxid: chatsAct.kefu_wxid,
            remark,
        })
        if (!data.error) {
            this.rootStore.ChatStore.update(chatsAct)
        }
    })

    upPhone = flow(function * (phone) {
        let chatsAct = this.chatsAct
        chatsAct.phone = phone
        this.chatsAct = chatsAct
        const data = yield services.upPhone({
            wxid: chatsAct.wxid,
            kefu_wxid: chatsAct.kefu_wxid,
            phone,
        })
        if (!data.error) {
            this.rootStore.ChatStore.update(chatsAct)
        }
    })

    setGroup = flow(function * (fid) {
        let chatsAct = this.chatsAct
        const oldFid = chatsAct.fid

        let groups = this.rootStore.GroupStore.data
        const group = groups.find((item) => item.id === fid)
        chatsAct.fid = group.id
        chatsAct.fname = group.fenzu_name
        this.chatsAct = chatsAct
        const data = yield services.setGroup({
            uid: chatsAct.userid,
            fid,
        })
        if (!data.error) {
            this.rootStore.ChatStore.update(chatsAct)
            this.rootStore.ContactStore.update(chatsAct)
            this.rootStore.GroupStore.update(fid, 1)
            if (oldFid) {
                this.rootStore.GroupStore.update(oldFid, -1)
            }
        }
    })

    setTop = flow(function * (istop) {
        let chatsAct = this.chatsAct
        const oldTop = Number(chatsAct.istop)
        chatsAct.istop = istop
        this.chatsAct = chatsAct
        const data = yield services.setTop({ userid: chatsAct.userid, oldTop })
        if (!data.error) {
            this.rootStore.ChatStore.update(chatsAct, true)
        }
    })

    setMute = flow(function * (isIgnore) {
        let chatsAct = this.chatsAct
        chatsAct.isIgnore = isIgnore
        this.chatsAct = chatsAct
        const data = yield services.setMute({ userid: chatsAct.userid, isIgnore })
        if (!data.error) {
            this.rootStore.ChatStore.update(chatsAct)
        }
    })

    setBlack = flow(function * () {
        let chatsAct = this.chatsAct
        const data = yield services.setBlack({
            aid: this.id,
            kefu_wxid: chatsAct.kefu_wxid,
            friend: chatsAct.wxid,
            userid: chatsAct.userid,
            types: 1,
        })
        if (data.error) {
            this.rootStore.ToastStore.error(data.msg)
        } else {
            this.rootStore.ToastStore.success("操作成功", "")
        }
    })

}
