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
        const { groupsAct, wechatsAct } = this.AuthStore
        return (
            <View style={styles.container}>
                <Text style={styles.title} numberOfLines={1}>
                    {groupsAct.fenzu_name || " "}
                </Text>
                <View style={styles.desc}>
                    {
                        wechatsAct.wxid
                            ? <Ionicons
                                name="ios-funnel"
                                size={16}
                                style={styles.icon}
                                color={colors.unact}
                            />
                            : <View style={styles.badge} />
                    }
                    <Text style={styles.caption} numberOfLines={1}>
                        {wechatsAct.nickname}
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
    badge: {
        height: pad,
        width: pad,
        borderRadius: pad / 2,
        backgroundColor: colors.unact,
        marginRight: pad / 2,
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
