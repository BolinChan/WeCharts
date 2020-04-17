import { observable, computed, flow, action } from "mobx"
import * as services from "../services/services"

export default class ContactStore {
    @observable contacts = []
    @observable page = 0
    @observable hasMore = true

    @observable init = false
    @observable refreshing = false
    @observable loading = false

    constructor (rootStore) {
        this.rootStore = rootStore
    }

    @action
    opt (fid) {
        const kefu_wxid = this.rootStore.AuthStore.wechatsCurrent
        let opt = {
            fid,
            type: kefu_wxid ? kefu_wxid : "all",
            kefuid: this.rootStore.AuthStore.id,
        }
        if (kefu_wxid) {
            opt.kefu_wxid = kefu_wxid
        }
        return opt
    }

    initContactsByGroup = flow(function * (fid) {
        if (fid) {
            this.init = false
            this.contacts = []
            this.hasMore = true
            let opt = this.opt(fid)
            opt.page = 1
            const data = yield services.fetchContactsByGroup(opt)
            if (!data.error) {
                this.contacts = data.data || []
                this.page = opt.page
                this.hasMore = data.hasMore
            }
            this.init = true
        }
    })

    refreshByGroup = flow(function * (fid) {
        if (fid && !this.refreshing) {
            this.refreshing = true
            let opt = this.opt(fid)
            opt.page = 1
            const data = yield services.fetchContactsByGroup(opt)
            if (!data.error) {
                this.contacts = data.data || []
                this.page = opt.page
                this.hasMore = data.hasMore
            }
            this.refreshing = false
        }
    })

    loadMoreByGroup = flow(function * (fid) {
        if (fid && !this.loading) {
            this.loading = true
            let opt = this.opt(fid)
            opt.page = this.page + 1
            const data = yield services.fetchContactsByGroup(opt)
            if (!data.error) {
                this.page = opt.page
                this.hasMore = data.hasMore
                const items = data.data || []
                if (items.length > 0) {
                    let contacts = this.data
                    if (contacts && contacts.length > 0) {
                        items.map((item) => {
                            if (contacts.findIndex((contact) => contact.userid === item.userid) === -1) {
                                contacts.push(item)
                            }
                        })
                    } else {
                        contacts = items
                    }
                    this.contacts = contacts
                }
            }
            this.loading = false
        }
    })

    @action
    reset () {
        this.init = false
        this.hasMore = true
        this.refreshing = false
        this.loading = false
    }

    @computed
    get data () {
        let contacts = []
        if (this.init) {
            contacts = this.contacts.slice()
            if (contacts.length > 0) {
                const kefu_wxids = this.rootStore.AuthStore.kefu_wxids
                if (kefu_wxids.length > 0) {
                    contacts = contacts.filter((item) => kefu_wxids.indexOf(item.kefu_wxid) !== -1)
                    if (contacts.length > 0) {
                        const fid = this.rootStore.AuthStore.groupsCurrent
                        contacts = contacts.filter((item) => item.fid === fid)
                    }
                } else {
                    contacts = []
                }
            }
        }
        return contacts
    }

    @action
    update (item) {
        let contacts = this.contacts.slice()
        if (contacts.length > 0) {
            const index = contacts.findIndex((contact) => contact.userid === item.userid)
            if (index !== -1) {
                contacts[index] = { ...contacts[index], fid: item.fid, fname: item.fname }
                this.contacts = contacts
            }
        }
    }

}
