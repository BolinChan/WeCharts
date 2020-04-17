import { createSwitchNavigator } from "react-navigation"
import Modal from "./Modal"
import Auth from "./Auth"
const Switch = createSwitchNavigator(
    {
        Modal: {
            screen: Modal,
        },
        Auth: {
            screen: Auth,
        },
    }
)
export default Switch
