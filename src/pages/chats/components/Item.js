import React, { Component } from "react"
import { TouchableHighlight, View, Text, StyleSheet } from "react-native"
import Avatar from "../../../components/Avatar"
import Badge from "../../../components/Badge"
import { Ionicons } from "@expo/vector-icons"
import { colors } from "../../../layout/layout"
import { observer } from "mobx-react"
import dayjs from "dayjs"
import "dayjs/locale/zh-cn"
import relativeTime from "dayjs/plugin/relativeTime"
dayjs.locale("zh-cn")
dayjs.extend(relativeTime)
@observer
class Item extends Component {
    _onPress = () => {
        const { _onPress, item } = this.props
        _onPress({ ...item })
    }
    render () {
        const { item, wechatsCurrent, wechatsData } = this.props
        const { kefu_wxid, lastTime, unread } = item
        let device = ""
        if (wechatsCurrent === 0 && wechatsData && wechatsData.length > 0) {
            const wechat = wechatsData.find((item) => item.wxid === kefu_wxid)
            device = wechat.nickname || wechat.devicename || ""
        }
        const formNow = lastTime && lastTime !== "1970-01-01 08:00:00" ? dayjs().from(dayjs(lastTime)) : ""
        return (
            <TouchableHighlight onPress={this._onPress}>
                <View style={[styles.container, { backgroundColor: Number(item.istop) ? colors.bg : "#FFFFFF" }]}>
                    <View style={styles.thumb}>
                        <Avatar uri={item.headImg} />
                    </View>
                    <View style={styles.content}>
                        <View style={styles.item}>
                            <View style={styles.title}>
                                <Text style={styles.nick} numberOfLines={1}>{item.remark || item.nick || " "}</Text>
                            </View>
                            <View style={styles.extra}>
                                <Text style={styles.time}>{formNow}</Text>
                            </View>
                        </View>
                        {device
                            ? <View style={styles.item}>
                                <Ionicons
                                    name="ios-funnel"
                                    size={16}
                                    style={styles.icon}
                                    color={colors.unact}
                                />
                                <Text style={styles.device} numberOfLines={1}>{device}</Text>
                            </View>
                            : null
                        }
                        <View style={styles.item}>
                            <View style={styles.title}>
                                <Text style={styles.msg} numberOfLines={device ? 1 : 2}>{item.lastMsg || item.lastMsgs || " "}</Text>
                            </View>
                            {Number(unread) > 0
                                ? <View style={styles.extra}>
                                    <Badge value={unread} mute={item.isIgnore} />
                                </View>
                                : null
                            }
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
        )
    }
}
export default Item
const pad = 16
const styles = StyleSheet.create({
    container: {
        height: 82,
        paddingVertical: 10,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
    },
    thumb: {
        marginHorizontal: pad,
    },
    content: {
        height: "100%",
        flex: 1,
        justifyContent: "space-around",
    },
    item: {
        flexDirection: "row",
        alignItems: "center",
    },
    nick: {
        fontSize: 17,
    },
    time: {
        fontSize: 12,
        color: colors.desc,
    },
    icon: {
        marginRight: 4,
    },
    device: {
        fontSize: 14,
        color: colors.unact,
    },
    msg: {
        fontSize: 14,
        color: colors.desc,
    },
    title: {
        flex: 1,
        marginRight: pad,
        justifyContent: "center",
    },
    extra: {
        marginRight: pad,
        justifyContent: "center",
        alignItems: "flex-end",
    },
})
