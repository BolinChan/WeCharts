import React, { Component } from "react"
import { View, Text, StyleSheet } from "react-native"
import { colors } from "../../../layout/layout"
import { observer } from "mobx-react"
@observer
class Empty extends Component {
    render () {
        const { status } = this.props
        if (status !== "done") {
            return null
        }
        return (
            <View style={styles.container}>
                <Text style={styles.title}>暂无数据</Text>
            </View>
        )
    }
}
export default Empty
const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 16,
    },
    title: {
        fontSize: 14,
        color: colors.desc,
    },
})
