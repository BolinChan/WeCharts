import React, { Component } from "react"
import { View, Text, StyleSheet } from "react-native"
import { colors } from "../../../layout/layout"
import { observer } from "mobx-react"
@observer
class Header extends Component {
    render () {
        const { init } = this.props
        if (!init) {
            return (
                <View style={styles.container}>
                    <Text style={styles.title}>正在加载...</Text>
                </View>
            )
        }
        return null
    }
}
export default Header
const pad = 8
const styles = StyleSheet.create({
    container: {
        padding: pad,
        alignItems: "center",
    },
    title: {
        fontSize: 14,
        color: colors.desc,
    },
})
