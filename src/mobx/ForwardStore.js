import { observable, computed, flow, action } from "mobx"
import * as services from "../services/services"

export default class ForwardStore {
    @observable forwards = []
    @observable page = 0
    @observable hasMore = true
    @observable init = false
    @observable loading = false

    @observable status = "init"
    @observable text = ""
    @observable searchData = []

    constructor (rootStore) {
        this.rootStore = rootStore
    }

    @computed
    get data () {
        return this.status !== "done"
            ? this.forwards.slice()
            : this.searchData.slice()
    }

    @action
    changeText (text = "") {
        this.text = text
        if (!text) {
            this.status = "init"
            this.searchData = []
        }
    }

    @action
    reset () {
        this.forwards = []
        this.page = 0
        this.hasMore = true
        this.init = false
        this.loading = false
        this.status = "init"
        this.text = ""
        this.searchData = []
    }

    doSearch = flow(function * (kefu_wxid) {
        const keyword = this.text
        if (keyword && kefu_wxid) {
            this.status = "pending"
            const data = yield services.fetchForwards({ keyword, kefu_wxid })
            if (!data.error) {
                this.searchData = data.data || []
            }
            this.status = "done"
        }
    })

    initForward = flow(function * (kefu_wxid) {
        if (kefu_wxid) {
            this.init = false
            this.forwards = []
            this.hasMore = true
            const page = 1
            const data = yield services.fetchForwards({ page, kefu_wxid })
            if (!data.error) {
                this.forwards = data.data || []
                this.hasMore = data.hasMore
                this.page = page
            }
            this.init = true
        }
    })

    loadMore = flow(function * (kefu_wxid) {
        if (kefu_wxid && !this.loading && this.status !== "done") {
            this.loading = true
            const page = this.page + 1
            const data = yield services.fetchForwards({ page, kefu_wxid })
            if (!data.error) {
                this.hasMore = data.hasMore
                this.page = page
                const items = data.data || []
                if (items.length > 0) {
                    let forwards = this.data
                    if (forwards && forwards.length > 0) {
                        items.map((item) => {
                            if (forwards.findIndex((forward) => forward.userid === item.userid) === -1) {
                                forwards.push(item)
                            }
                        })
                    } else {
                        forwards = items
                    }
                    this.forwards = forwards
                }
            }
            this.loading = false
        }
    })
}
