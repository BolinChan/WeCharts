import React, { Component } from "react"
import {
    TouchableHighlight,
    View,
    Text,
    StyleSheet,
} from "react-native"
import { customs } from "../../../../layout/layout"
import { connectActionSheet } from "@expo/react-native-action-sheet"
import { observer } from "mobx-react"
@connectActionSheet
@observer
class RedPacketMsg extends Component {
    _onPress = () => {
        console.log(1)
    }
    render () {
        return (
            <TouchableHighlight
                onPress={this._onPress}
                style={styles.custom}
            >
                <View style={styles.container}>
                    <Text style={styles.title}>收到红包，请在微信查看</Text>
                </View>
            </TouchableHighlight>
        )
    }
}
export default RedPacketMsg
const pad = 8
const radius = 10
const styles = StyleSheet.create({
    custom: {
        borderRadius: radius,
    },
    container: {
        backgroundColor: "#FFFFFF",
        maxWidth: customs.fullWidth - 136,
        minWidth: 64,
        padding: pad,
        borderRadius: radius,
    },
    title: {
        fontSize: 17,
        lineHeight: 28,
    },
})
