import { createStackNavigator } from "react-navigation"
import Drawer from "./Drawer"
import Search from "../pages/search/page"
import Forward from "../pages/forward/page"
const Modal = createStackNavigator(
    {
        Drawer: {
            screen: Drawer,
        },
        Search: {
            screen: Search,
        },
        Forward: {
            screen: Forward,
        },
    },
    {
        mode: "modal",
        headerMode: "none",
    }
)
export default Modal
