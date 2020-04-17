import React, { Component } from "react"
import { SafeAreaView, View, Text, StyleSheet } from "react-native"
import { colors } from "../../../layout/layout"
import { observer } from "mobx-react"
@observer
class Footer extends Component {
    render () {
        const { hasMore, status, data } = this.props
        if (data.length > 0) {
            return <SafeAreaView />
        }
        if (hasMore && status !== "done") {
            return (
                <View style={styles.container}>
                    <Text style={styles.title}>正在加载...</Text>
                </View>
            )
        }
        return null
    }
}
export default Footer
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
