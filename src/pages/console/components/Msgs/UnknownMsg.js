import React, { Component } from "react"
import {
    View,
    Text,
    StyleSheet,
} from "react-native"
import { customs } from "../../../../layout/layout"
import { observer } from "mobx-react"
@observer
class UnknownMsg extends Component {
    render () {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>不支持的消息，可在微信查看</Text>
            </View>
        )
    }
}
export default UnknownMsg
const pad = 8
const radius = 10
const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFFFFF",
        maxWidth: customs.fullWidth - 136,
        minWidth: 128,
        padding: pad,
        borderRadius: radius,
        alignItems: "center",
    },
    title: {
        fontSize: 17,
        lineHeight: 28,
    },
})
