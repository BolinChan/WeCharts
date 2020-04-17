import React, { Component } from "react"
import {
    Modal,
    TouchableOpacity,
    Text,
    TouchableHighlight,
    View,
    StyleSheet,
} from "react-native"
import Avatar from "../../../components/Avatar"
import { colors, customs } from "../../../layout/layout"
import { observer } from "mobx-react"
@observer
class Confirm extends Component {
    _onRequestClose = () => null
    render () {
        const { visible, item, onCancel, onOk } = this.props
        return (
            <Modal
                visible={visible}
                onRequestClose={this._onRequestClose}
                transparent
                animationType="fade"
                hardwareAccelerated
            >
                <TouchableOpacity
                    activeOpacity={1}
                    style={styles.custom}
                >
                    <View style={styles.container}>
                        <View style={styles.header}>
                            <Text style={[styles.title, { fontWeight: "bold" }]}>
                                发送给：
                            </Text>
                        </View>
                        <View style={styles.item}>
                            <View style={styles.thumb}>
                                <Avatar uri={item.headImg} size="small" />
                            </View>
                            <View style={styles.content}>
                                <Text style={styles.title} numberOfLines={1}>
                                    {item.nick}
                                </Text>
                                <Text style={styles.desc} numberOfLines={1}>
                                    {item.remark}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.footer}>
                            <TouchableHighlight onPressOut={onCancel}>
                                <View
                                    style={[
                                        styles.btn,
                                        { borderRightWidth: customs.lineSize, borderRightColor: colors.bor },
                                    ]}
                                >
                                    <Text style={styles.title}>
                                        取消
                                    </Text>
                                </View>
                            </TouchableHighlight>
                            <TouchableHighlight onPressOut={onOk}>
                                <View style={styles.btn}>
                                    <Text
                                        style={[
                                            styles.title,
                                            { color: colors.act, fontWeight: "bold" },
                                        ]}
                                    >
                                        发送
                                    </Text>
                                </View>
                            </TouchableHighlight>
                        </View>
                    </View>
                </TouchableOpacity>
            </Modal>
        )
    }
}
export default Confirm
const pad = 16
const radius = 10
const width = customs.fullWidth / 3 * 2
const styles = StyleSheet.create({
    custom: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.36)",
    },
    container: {
        borderRadius: radius,
        backgroundColor: "#FFFFFF",
        width: width,
        position: "relative",
        overflow: "hidden",
    },
    header: {
        paddingHorizontal: pad,
        paddingTop: pad,
        justifyContent: "center",
    },
    item: {
        height: 76,
        paddingVertical: pad,
        flexDirection: "row",
        alignItems: "center",
    },
    thumb: {
        paddingHorizontal: pad,
    },
    content: {
        height: "100%",
        flex: 1,
        justifyContent: "space-around",
        marginRight: pad,
    },
    title: {
        fontSize: 17,
    },
    desc: {
        fontSize: 14,
        color: colors.desc,
    },
    footer: {
        height: 54,
        borderTopWidth: customs.lineSize,
        borderTopColor: colors.bor,
        flexDirection: "row",
    },
    btn: {
        backgroundColor: "#FFFFFF",
        width: width / 2,
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
})
