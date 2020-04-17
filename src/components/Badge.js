import React, { Component } from "react"
import { View, Text, StyleSheet } from "react-native"
import { colors } from "../layout/layout"
import { observer } from "mobx-react"
@observer
class Badge extends Component {
    render () {
        const { value, mute = false } = this.props
        return !isNaN(value) && Number(value) > 0
            ? (
                <View
                    style={[styles.badge, { backgroundColor: mute ? colors.lightGray : colors.red }]}
                >
                    <Text style={styles.text}>
                        {Number(value) > 99 ? "..." : value}
                    </Text>
                </View>
            )
            : null
    }
}
export default Badge
const size = 20
const styles = StyleSheet.create({
    badge: {
        padding: 0,
        margin: 0,
        minWidth: size,
        height: size,
        borderRadius: size / 2,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 0.6,
        borderColor: "#FFFFFF",
        overflow: "hidden",
    },
    text: {
        fontSize: 10,
        fontWeight: "bold",
        color: "#FFFFFF",
        paddingHorizontal: 4,
        textAlign: "center",
        includeFontPadding: false,
        textAlignVertical: "center",
    },
})
