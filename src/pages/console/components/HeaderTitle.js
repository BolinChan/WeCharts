import React, { Component } from "react"
import { View, Text, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { observer, inject } from "mobx-react"
import { colors } from "../../../layout/layout"
@inject("rootStore")
@observer
class HeaderTitle extends Component {
    constructor (props) {
        super(props)
        const { AuthStore } = this.props.rootStore
        this.AuthStore = AuthStore
    }
    render () {
        const { chatsAct, wechatsData } = this.AuthStore
        let desc = ""
        if (wechatsData && wechatsData.length > 0) {
            const item = wechatsData.find((item) => item.wxid === chatsAct.kefu_wxid)
            desc = item.nickname || item.devicename || ""
        }
        return (
            <View style={styles.container}>
                <Text style={styles.title} numberOfLines={1}>
                    {chatsAct.remark || chatsAct.nick || " "}
                </Text>
                <View style={styles.desc}>
                    <Ionicons
                        name="ios-funnel"
                        size={16}
                        style={styles.icon}
                        color={colors.unact}
                    />
                    <Text style={styles.caption} numberOfLines={1}>
                        {desc}
                    </Text>
                </View>
            </View>
        )
    }
}
export default HeaderTitle
const pad = 8
const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: "100%",
        paddingVertical: pad / 2,
        justifyContent: "space-around",
        alignItems: "center",
    },
    desc: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    icon: {
        marginRight: pad / 2,
    },
    title: {
        fontSize: 17,
        fontWeight: "bold",
    },
    caption: {
        fontSize: 14,
        color: colors.unact,
    },
})
