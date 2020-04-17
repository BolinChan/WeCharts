import React from "react"
import { createStackNavigator } from "react-navigation"
import Login from "../pages/login/page"
import Policy from "../pages/policy/page"
import HeaderIcon from "../components/HeaderIcon"
import { colors, customs } from "../layout/layout"
import StackViewStyleInterpolator from "react-navigation-stack/src/views/StackView/StackViewStyleInterpolator"
const Auth = createStackNavigator(
    {
        Login: {
            screen: Login,
            navigationOptions: ({
                header: null,
                gesturesEnabled: false,
            }),
        },
        Policy: {
            screen: Policy,
            navigationOptions: ({ navigation }) => ({
                headerTitle: "服务条款",
                headerLeft: (
                    <HeaderIcon
                        _onPress={() => navigation.goBack()}
                    />
                ),
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
export default Auth
