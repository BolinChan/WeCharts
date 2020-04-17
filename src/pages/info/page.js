import React, { Component } from "react"
import {
    Platform,
    StatusBar,
    SafeAreaView,
    ScrollView,
    View,
    Text,
    TouchableHighlight,
    Switch,
    TouchableOpacity,
    StyleSheet,
} from "react-native"
import Avatar from "../../components/Avatar"
import ImgViewer from "../../components/ImgViewer"
import Separator from "../../components/Separator"
import { Ionicons } from "@expo/vector-icons"
import { colors } from "../../layout/layout"
import { observer, inject } from "mobx-react"
const isIOS = Platform.OS !== "android"
const switchProps = {
    trackColor: { true: colors.act, false: colors.bg },
    thumbColor: isIOS ? null : "#FFFFFF",
}
@inject("rootStore")
@observer
class Info extends Component {
    constructor (props) {
        super(props)
        const { AuthStore } = this.props.rootStore
        this.AuthStore = AuthStore
        this.state = { visible: false }
    }
    showImg = () => {
        this.setState({ visible: true })
    }
    hideImg = () => {
        this.setState({ visible: false })
    }
    caption = (label, content) => (
        <View style={styles.caption}>
            <Text style={styles.desc} numberOfLines={1}>
                {label}：{content}
            </Text>
        </View>
    )
    _separator = <Separator lineStyle={{ marginLeft: pad }} />
    _edit = () => this.props.navigation.navigate("Edit")
    _editGroup = () => this.props.navigation.navigate("EditGroup")
    _setTop = () => {
        const value = Number(this.AuthStore.chatsAct.istop) > 0 ? 0 : 1
        this.AuthStore.setTop(value)
    }
    _setMute = () => {
        const value = this.AuthStore.chatsAct.isIgnore > 0 ? 0 : 1
        this.AuthStore.setMute(value)
    }
    _chat = () => this.props.navigation.navigate("Console")
    _setBlack = () => this.AuthStore.setBlack()
    render () {
        const { visible } = this.state
        const { chatsAct, wechatsData } = this.AuthStore
        const wechat = wechatsData.find((item) => item.wxid === chatsAct.kefu_wxid)
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar
                    animated
                    barStyle="dark-content"
                    backgroundColor={colors.navBg}
                />
                <ImgViewer
                    visible={visible}
                    _close={this.hideImg}
                    imageUrls={[{ url: chatsAct.headImg }]}
                />
                <ScrollView style={styles.custom}>
                    <View style={[styles.item, { marginTop: 0 }]}>
                        <View style={styles.content}>
                            <View style={styles.thumb}>
                                <TouchableOpacity
                                    activeOpacity={1}
                                    onPress={this.showImg}
                                >
                                    <Avatar uri={chatsAct.headImg} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.custom}>
                                <Text style={styles.title} numberOfLines={2}>
                                    {chatsAct.nick}
                                </Text>
                                {this.caption("所属微信", wechat.nickname || wechat.devicename)}
                                {this.caption("微信号", chatsAct.FriendNo)}
                                {this.caption("性别", chatsAct.sex === "1" ? "男" : "女")}
                                {this.caption("地区", `${chatsAct.Province ? `${chatsAct.Province} ` : ""}${chatsAct.city}`)}
                                {this.caption("备注名", chatsAct.remark)}
                                {this.caption("手机号码", chatsAct.phone)}
                                {this.caption("分组", chatsAct.fname)}
                            </View>
                        </View>
                    </View>
                    <View style={styles.item}>
                        <TouchableHighlight onPress={this._edit}>
                            <View style={[styles.btn, styles.label]}>
                                <Text style={styles.labelTitle}>编辑资料</Text>
                                <Ionicons
                                    name="ios-arrow-forward"
                                    size={iconSize}
                                    color={colors.desc}
                                />
                            </View>
                        </TouchableHighlight>
                        {this._separator}
                        <TouchableHighlight onPress={this._editGroup}>
                            <View style={[styles.btn, styles.label]}>
                                <Text style={styles.labelTitle}>移动分组</Text>
                                <Ionicons
                                    name="ios-arrow-forward"
                                    size={iconSize}
                                    color={colors.desc}
                                />
                            </View>
                        </TouchableHighlight>
                        {this._separator}
                        <View style={[styles.btn, styles.label]}>
                            <Text style={styles.labelTitle}>聊天置顶</Text>
                            <Switch
                                {...switchProps}
                                onValueChange={this._setTop}
                                value={chatsAct.istop > 0}
                            />
                        </View>
                        {this._separator}
                        <View style={[styles.btn, styles.label]}>
                            <Text style={styles.labelTitle}>消息免打扰</Text>
                            <Switch
                                {...switchProps}
                                onValueChange={this._setMute}
                                value={chatsAct.isIgnore > 0}
                            />
                        </View>
                    </View>
                    <View style={styles.item}>
                        <TouchableHighlight onPress={this._chat}>
                            <View style={styles.btn}>
                                <Text style={styles.btnTitle}>发送消息</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                </ScrollView>
                <View style={styles.footer}>
                    <Text style={[styles.desc, { color: colors.red }]} onPress={this._setBlack}>
                        加入黑名单
                    </Text>
                </View>
            </SafeAreaView>
        )
    }
}
export default Info
const pad = 16
const iconSize = 16
const styles = StyleSheet.create({
    custom: {
        flex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: colors.bg,
    },
    item: {
        marginTop: pad,
    },
    content: {
        flex: 1,
        padding: pad,
        flexDirection: "row",
        backgroundColor: "#FFFFFF",
    },
    thumb: {
        marginRight: pad,
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
    },
    caption: {
        marginTop: pad / 2,
    },
    desc: {
        fontSize: 14,
        color: colors.desc,
    },
    btn: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        paddingHorizontal: pad,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: 54,
    },
    label: {
        justifyContent: "space-between",
    },
    labelTitle: {
        fontSize: 17,
    },
    btnTitle: {
        fontSize: 17,
        fontWeight: "bold",
        color: colors.act,
    },
    footer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: pad,
    },
})
