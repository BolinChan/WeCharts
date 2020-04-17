import { observable, flow, action, computed } from "mobx"
import * as services from "../services/services"

export default class SearchStore {
    @observable status = "init"
    @observable text = ""
    @observable searchData = []

    constructor (rootStore) {
        this.rootStore = rootStore
    }

    @action
    changeText (text = "") {
        this.text = text
        if (!text) {
            this.status = "init"
            this.searchData = []
        }
    }

    doSearch = flow(function * () {
        const keyword = this.text
        if (keyword) {
            this.status = "pending"
            const wxid = this.rootStore.AuthStore.wechatsAct.wxid
            const kefu_wxid = wxid ? { kefu_wxid: [wxid] } : {}
            let opt = {
                kefuid: this.rootStore.AuthStore.id,
                keyword,
                ...kefu_wxid,
            }
            const data = yield services.doSearch(opt)
            if (!data.error) {
                this.searchData = data.data
            }
            this.status = "done"
        }
    })

    @computed
    get data () {
        let re = []
        const res = this.searchData.slice()
        const wechats = this.rootStore.AuthStore.wechatsData
        if (wechats && wechats.length > 0) {
            res.map((item) => {
                if (wechats.findIndex((wechat) => wechat.wxid === item.kefu_wxid) !== -1) {
                    re.push(item)
                }
            })
        }
        return re
    }
}
