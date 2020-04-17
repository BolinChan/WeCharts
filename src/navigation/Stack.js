import React from "react"
import { Alert } from "react-native"
import { createStackNavigator } from "react-navigation"
import Tab from "./Tab"
import Console from "../pages/console/page"
import Contacts from "../pages/contacts/page"
import Info from "../pages/info/page"
import Edit from "../pages/edit/page"
import EditGroup from "../pages/editGroup/page"
import HeaderIcon from "../components/HeaderIcon"
import { colors, customs } from "../layout/layout"
import StackViewStyleInterpolator from "react-navigation-stack/src/views/StackView/StackViewStyleInterpolator"
const Stack = createStackNavigator(
    {
        Tab: {
            screen: Tab,
            navigationOptions: ({ navigation }) => ({
                headerLeft: (
                    <HeaderIcon
                        _onPress={() => navigation.openDrawer()}
                        name="ios-options"
                    />
                ),
                headerRight: (
                    <HeaderIcon
                        _onPress={() => Alert.alert("暂未支持")}
                        name="ios-add-circle-outline"
                    />
                ),
                gesturesEnabled: false,
            }),
        },
        Console: {
            screen: Console,
            navigationOptions: ({ navigation }) => ({
                headerRight: (
                    <HeaderIcon
                        _onPress={() => navigation.navigate("Info")}
                        name="ios-more"
                    />
                ),
                gesturesEnabled: true,
            }),
        },
        Contacts: {
            screen: Contacts,
            navigationOptions: ({ navigation }) => ({
                headerLeft: () => (
                    <HeaderIcon
                        _onPress={() => navigation.goBack()}
                    />
                ),
                gesturesEnabled: true,
            }),
        },
        Info: {
            screen: Info,
            navigationOptions: ({ navigation }) => ({
                headerLeft: (
                    <HeaderIcon
                        _onPress={() => navigation.goBack()}
                    />
                ),
                headerRight: (
                    <HeaderIcon
                        _onPress={() => Alert.alert("暂未支持")}
                        name="ios-share"
                    />
                ),
                headerTitle: "好友资料",
                gesturesEnabled: true,
            }),
        },
        Edit: {
            screen: Edit,
            navigationOptions: ({
                header: null,
                gesturesEnabled: true,
            }),
        },
        EditGroup: {
            screen: EditGroup,
            navigationOptions: ({
                header: null,
                gesturesEnabled: true,
            }),
        },
    },
    {
        headerMode: "float",
        headerTransitionPreset: "fade-in-place",
        headerLayoutPreset: "center",
        defaultNavigationOptions: () => ({
            headerBackTitle: null,
            headerTitleAllowFontScaling: false,
            headerBackAllowFontScaling: false,
            headerStyle: {
                height: 54,
                backgroundColor: colors.navBg,
                borderBottomWidth: customs.lineSize,
                borderBottomColor: colors.bg,
                elevation: 0,
                ...customs.headerLayout,
            },
            headerTitleStyle: {
                fontSize: 17,
                fontWeight: "bold",
            },
        }),
        transitionConfig: () => ({
            screenInterpolator: StackViewStyleInterpolator.forHorizontal,
        }),
    }
)
Stack.navigationOptions = ({ navigation }) => {
    let drawerLockMode = "locked-closed"
    let nav = navigation.state.routes[navigation.state.index]
    if (nav.routeName === "Tab") {
        nav = nav.routes[nav.index]
        if (nav.routeName !== "Mine") {
            drawerLockMode = "unlocked"
        }
    }
    return { drawerLockMode }
}
export default Stack
