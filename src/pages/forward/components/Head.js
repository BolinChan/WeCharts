import React, { Component } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { colors } from "../../../layout/layout"
import { observer } from "mobx-react"
@observer
class Head extends Component {
    render () {
        const { _onCancel } = this.props
        return (
            <View style={styles.container}>
                <View style={styles.btnContainer} />
                <View style={styles.titleContainer}>
                    <Text style={styles.title} numberOfLines={1}>
                        选择好友
                    </Text>
                </View>
                <View style={[styles.btnContainer, { alignItems: "flex-end" }]}>
                    <TouchableOpacity onPress={_onCancel}>
                        <View style={styles.btn}>
                            <Text style={styles.btnTitle}>取消</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
export default Head
const pad = 16
const styles = StyleSheet.create({
    container: {
        height: 54,
        flexDirection: "row",
        alignItems: "center",
        borderBottomColor: colors.bg,
        borderBottomWidth: StyleSheet.hairlineWidth,
        backgroundColor: "#FFFFFF",
    },
    btnContainer: {
        flex: 1,
        height: "100%",
    },
    titleContainer: {
        flex: 2,
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 17,
        fontWeight: "bold",
    },
    btn: {
        height: "100%",
        paddingHorizontal: pad,
        flexDirection: "row",
        alignItems: "center",
    },
    btnTitle: {
        fontSize: 17,
        color: colors.act,
    },
})
