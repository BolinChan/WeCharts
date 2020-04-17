import React, { Component } from "react"
import {
    View,
    Text,
    StyleSheet,
} from "react-native"
import { colors, customs } from "../../../../layout/layout"
import { observer } from "mobx-react"
@observer
class SystemMsg extends Component {
    render () {
        const { item } = this.props
        const { text } = item
        return (
            <View style={styles.container}>
                <Text style={styles.system}>{text}</Text>
            </View>
        )
    }
}
export default SystemMsg
const pad = 8
const radius = 10
const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.mediumLightGray,
        maxWidth: customs.fullWidth - 136,
        minWidth: 128,
        padding: pad,
        borderRadius: radius,
    },
    system: {
        fontSize: 17,
        lineHeight: 28,
        color: "#FFFFFF",
    },
})
