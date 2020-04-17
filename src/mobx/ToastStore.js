import { observable, action, reaction } from "mobx"

export default class ToastStore {
    @observable isVisible = false
    @observable icon = ""
    @observable msg = ""
    @observable type = ""

    constructor (rootStore) {
        this.rootStore = rootStore
    }

    @action
    loading (msg, icon = "ActivityIndicator") {
        this.isVisible = true
        this.icon = icon
        this.msg = msg
        this.type = "loading"
    }
    @action
    success (msg, icon = "ios-checkmark-circle-outline") {
        this.isVisible = true
        this.icon = icon
        this.msg = msg
        this.type = "success"
    }
    @action
    error (msg, icon = "ios-close-circle-outline") {
        this.isVisible = true
        this.icon = icon
        this.msg = msg
        this.type = "error"
    }

    autoHidden = reaction(() => this.isVisible, (isVisible) => {
        if (isVisible && this.type !== "loading") {
            this.hidden()
        }
    }, { delay: this.type === "success" ? 500 : 1000 })

    @action
    hidden () {
        this.isVisible = false
        this.msg = ""
        this.icon = ""
        this.type = ""
    }
}
