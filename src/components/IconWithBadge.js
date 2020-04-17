import React, { Component } from "react"
import { View, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import Badge from "./Badge"
import { observer, inject } from "mobx-react"
@inject("rootStore")
@observer
class IconWithBadge extends Component {
    constructor (props) {
        super(props)
        const { AuthStore, ChatStore } = this.props.rootStore
        this.AuthStore = AuthStore
        this.ChatStore = ChatStore
    }
    render () {
        const { name, color, type } = this.props
        return (
            <View style={styles.container}>
                <Ionicons
                    size={iconSize}
                    name={name}
                    color={color}
                />
                <View style={styles.badge}>
                    <Badge value={type === "chats" && this.ChatStore.data.length ? this.AuthStore.unread : 0} />
                </View>
            </View>
        )
    }
}
export default IconWithBadge
const iconSize = 28
const styles = StyleSheet.create({
    container: {
        width: iconSize,
        height: iconSize,
        alignItems: "center",
        justifyContent: "center",
    },
    badge: {
        position: "absolute",
        top: 0,
        right: -15,
    },
})
