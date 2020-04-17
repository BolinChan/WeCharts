import React from "react"
import { createBottomTabNavigator } from "react-navigation"
import Chats from "../pages/chats/page"
import Groups from "../pages/groups/page"
import Mine from "../pages/mine/page"
import IconWithBadge from "../components/IconWithBadge"
import { colors, customs } from "../layout/layout"
import HeaderTitle from "../components/HeaderTitle"
const Tab = createBottomTabNavigator(
    {
        Chats: {
            screen: Chats,
            navigationOptions: ({
                tabBarLabel: "消息",
                tabBarIcon: ({ tintColor }) => (
                    <IconWithBadge
                        name="ios-text"
                        color={tintColor}
                        type="chats"
                    />
                ),
            }),
        },
        Groups: {
            screen: Groups,
            navigationOptions: ({
                tabBarLabel: "分组",
                tabBarIcon: ({ tintColor }) => (
                    <IconWithBadge
                        name="ios-list-box"
                        color={tintColor}
                        type="contacts"
                    />
                ),
            }),
        },
        Mine: {
            screen: Mine,
            navigationOptions: ({
                tabBarLabel: "我的",
                tabBarIcon: ({ tintColor }) => (
                    <IconWithBadge
                        name="ios-person"
                        color={tintColor}
                        type="contacts"
                    />
                ),
            }),
        },
    },
    {
        // initialRouteName: "Mine",
        swipeEnabled: false,
        animationEnabled: false,
        lazy: false,
        removeClippedSubviews: true,
        backBehavior: "none",
        tabBarOptions: {
            activeTintColor: colors.act,
            inactiveTintColor: colors.unact,
            showLabel: true,
            showIcon: true,
            scrollEnabled: false,
            style: {
                backgroundColor: colors.navBg,
                borderTopWidth: customs.lineSize,
                borderTopColor: colors.bg,
            },
            tabStyle: {
                alignItems: "center",
                justifyContent: "center",
            },
            indicatorStyle: {
                height: 0,
            },
            allowFontScaling: false,
        },
    }
)
Tab.navigationOptions = ({ navigation }) => {
    let re = { header: null }
    const key = navigation.state.routes[navigation.state.index].key
    const index = titles.findIndex((item) => item.key === key)
    if (index !== -1) {
        re = { headerTitle: <HeaderTitle title={titles[index].title} /> }
    }
    return re
}
export default Tab
const titles = [
    { key: "Chats", title: "消息" },
    { key: "Groups", title: "分组" },
    // { key: "Mine", title: "我的" },
]
