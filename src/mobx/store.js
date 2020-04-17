import AuthStore from "./AuthStore"
import ToastStore from "./ToastStore"
import ChatStore from "./ChatStore"
import GroupStore from "./GroupStore"
import ConsoleStore from "./ConsoleStore"
import SearchStore from "./SearchStore"
import ContactStore from "./ContactStore"
import ForwardStore from "./ForwardStore"

class RootStore {
    constructor () {
        this.AuthStore = new AuthStore(this)
        this.ToastStore = new ToastStore(this)
        this.ChatStore = new ChatStore(this)
        this.GroupStore = new GroupStore(this)
        this.ConsoleStore = new ConsoleStore(this)
        this.SearchStore = new SearchStore(this)
        this.ContactStore = new ContactStore(this)
        this.ForwardStore = new ForwardStore(this)
    }
}
export default new RootStore()
