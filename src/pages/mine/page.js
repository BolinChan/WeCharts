import React, { Component } from "react"
import {
    View,
    StatusBar,
    SafeAreaView,
    ScrollView,
    Text,
    TouchableHighlight,
    StyleSheet,
} from "react-native"
import Avatar from "../../components/Avatar"
import { Ionicons } from "@expo/vector-icons"
import Separator from "../../components/Separator"
import { colors } from "../../layout/layout"
import { observer, inject } from "mobx-react"
@inject("rootStore")
@observer
class Mine extends Component {
    constructor (props) {
        super(props)
        const { AuthStore } = this.props.rootStore
        this.AuthStore = AuthStore
    }
    _label = (icon, title) => (
        <TouchableHighlight>
            <View style={styles.label}>
                <Ionicons
                    name={`ios-${icon}`}
                    size={24}
                    color={iconColor}
                    style={{ marginRight: pad / 2 }}
                />
                <View style={styles.custom}>
                    <Text style={styles.labelTitle}>{title}</Text>
                </View>
                <Ionicons
                    name="ios-arrow-forward"
                    size={iconSize}
                    color={iconColor}
                />
            </View>
        </TouchableHighlight>
    )
    _separator = <Separator lineStyle={{ marginLeft: pad }} />
    _logOut = () => {
        this.AuthStore.logOut()
    }
    render () {
        const { auth } = this.AuthStore
        return (
            <View style={styles.container}>
                <StatusBar
                    animated
                    barStyle="dark-content"
                    backgroundColor={colors.navBg}
                />
                <SafeAreaView style={styles.safe} />
                <View style={styles.header}>
                    <View style={styles.info}>
                        <View style={styles.thumb}>
                            <Avatar uri={auth.headimg} />
                        </View>
                        <View style={styles.content}>
                            <Text style={styles.title} numberOfLines={1}>
                                {auth.nickname}
                            </Text>
                            <Text style={styles.desc} numberOfLines={1}>
                                帐号：{auth.accountnum}
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={styles.devices}>
                    <View style={styles.device}>
                        <Text style={styles.deviceTitle}>{auth.all_num}</Text>
                        <Text style={styles.deviceDesc}>设备</Text>
                    </View>
                    <View style={styles.device}>
                        <Text style={styles.deviceTitle}>{auth.online_num}</Text>
                        <Text style={styles.deviceDesc}>在线</Text>
                    </View>
                    <View style={styles.device}>
                        <Text style={styles.deviceTitle}>{auth.outline_num}</Text>
                        <Text style={styles.deviceDesc}>离线</Text>
                    </View>
                </View>
                <ScrollView style={styles.custom}>
                    <View style={styles.item}>
                        {this._label("apps", "设备列表")}
                        {this._separator}
                        {this._label("chatbubbles", "定时消息")}
                        {this._separator}
                        {this._label("compass", "小程序")}
                        {this._separator}
                        {this._label("star", "收藏表情")}
                    </View>
                    <View style={styles.item}>
                        {this._label("create", "反馈意见")}
                        {this._separator}
                        {this._label("sad", "黑名单")}
                    </View>
                    <View style={styles.item}>
                        <TouchableHighlight onPress={this._logOut}>
                            <View style={[styles.label, styles.btn]}>
                                <Text style={[styles.btnTitle, { color: colors.red }]}>退出登录</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                </ScrollView>
            </View>
        )
    }
}
export default Mine
const pad = 16
const iconSize = 16
const iconColor = colors.desc
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.bg,
    },
    safe: {
        backgroundColor: "#FFFFFF",
    },
    header: {
        paddingHorizontal: pad,
        backgroundColor: "#FFFFFF",
    },
    info: {
        flexDirection: "row",
        paddingVertical: pad,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: colors.bor,
    },
    thumb: {
        marginRight: pad,
    },
    content: {
        flex: 1,
        justifyContent: "space-around",
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
    },
    desc: {
        fontSize: 14,
        color: colors.desc,
    },
    devices: {
        height: 54,
        flexDirection: "row",
        backgroundColor: "#FFFFFF",
    },
    device: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-around",
        padding: 4,
    },
    deviceTitle: {
        fontSize: 17,
        fontWeight: "bold",
    },
    deviceDesc: {
        fontSize: 14,
        color: colors.desc,
    },
    custom: {
        flex: 1,
    },
    item: {
        marginTop: pad,
        backgroundColor: "#FFFFFF",
    },
    label: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        paddingHorizontal: pad,
        flexDirection: "row",
        alignItems: "center",
        height: 54,
    },
    labelTitle: {
        fontSize: 17,
    },
    btn: {
        justifyContent: "center",
    },
    btnTitle: {
        fontSize: 17,
        fontWeight: "bold",
        color: colors.act,
    },
})
