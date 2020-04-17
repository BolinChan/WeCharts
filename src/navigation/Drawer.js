import React from "react"
import { createDrawerNavigator } from "react-navigation"
import Stack from "./Stack"
import DrawerContainer from "../components/Drawer/page"
import { customs } from "../layout/layout"
const Drawer = createDrawerNavigator(
    {
        Stack: {
            screen: Stack,
        },
    },
    {
        drawerWidth: customs.fullWidth - 82,
        contentComponent: ({ navigation }) => <DrawerContainer navigation={navigation} />,
        drawerType: "slide",
    }
)
export default Drawer
