import React, { Component } from "react"
import { TouchableOpacity, View, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { colors } from "../layout/layout"
import { observer } from "mobx-react"
@observer
class HeaderIcon extends Component {
    render () {
        const {
            _onPress,
            name = "ios-arrow-back",
            color = colors.act,
            size = 28,
        } = this.props
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
})
