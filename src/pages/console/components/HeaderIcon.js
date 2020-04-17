import React, { Component } from "react"
import { TouchableOpacity, View, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import Badge from "../../../components/Badge"
import { colors } from "../../../layout/layout"
import { observer, inject } from "mobx-react"
@inject("rootStore")
@observer
class HeaderIcon extends Component {
    constructor (props) {
        super(props)
        const { AuthStore } = this.props.rootStore
        this.AuthStore = AuthStore
    }
    render () {
        const { _onPress, name = "ios-arrow-back", color = colors.act, size = 28 } = this.props
        return (
            <TouchableOpacity onPress={_onPress}>
                <View style={styles.container}>
                    <View style={styles.icon}>
                        <Ionicons
                            name={name}
                            color={color}
                            size={size}
                        />
                    </View>
                    <View style={styles.badge}>
                        <Badge value={this.AuthStore.unread} mute />
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}
export default HeaderIcon
const pad = 16
const styles = StyleSheet.create({
    container: {
        height: "100%",
        paddingHorizontal: pad,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    icon: {
        height: 29,
        justifyContent: "center",
    },
    badge: {
        marginLeft: 6,
        height: "100%",
        justifyContent: "center",
    },
})
