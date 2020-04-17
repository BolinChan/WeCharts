import { observable, flow, computed, action } from "mobx"
import * as services from "../services/services"

export default class GroupStore {
    @observable init = false
    @observable groups = []
    @observable refreshing = false

    constructor (rootStore) {
        this.rootStore = rootStore
    }

    @computed
    get data () {
        const kefu_wxids = this.rootStore.AuthStore.kefu_wxids
        return kefu_wxids.length > 0 ? this.groups.slice() : []
    }

    @action
    opt (kefu_wxid) {
        let opt = {
            type: kefu_wxid ? kefu_wxid : "all",
            zid: this.rootStore.AuthStore.id,
        }
        if (kefu_wxid) {
            opt.kefu_wxid = kefu_wxid
        }
        return opt
    }

    initGroups = flow(function * (kefu_wxid) {
        if (kefu_wxid || kefu_wxid === 0) {
            this.init = false
            this.groups = []
            let opt = this.opt(kefu_wxid)
            const data = yield services.fetchGroups(opt)
            if (!data.error) {
                this.groups = data.data || []
            }
            this.init = true
        }
    })

    refresh = flow(function * (kefu_wxid) {
        if ((kefu_wxid || kefu_wxid === 0) && !this.refreshing) {
            this.refreshing = true
            let opt = this.opt(kefu_wxid)
            const data = yield services.fetchGroups(opt)
            if (!data.error) {
                this.groups = data.data || []
            }
            this.refreshing = false
        }
    })

    @action
    update (fid, add) {
        if (fid) {
            let groups = this.data
            if (groups.length > 0) {
                let index = groups.findIndex((item) => item.id === fid)
                if (index !== -1) {
                    let number = Number(groups[index].number)
                    number = number + add
                    groups[index].number = number < 0 ? 0 : number
                }
            }
        }
    }

}
