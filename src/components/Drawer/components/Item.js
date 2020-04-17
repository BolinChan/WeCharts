import React, { Component } from "react"
import { TouchableHighlight, View, Text, StyleSheet } from "react-native"
import Avatar from "../../Avatar"
import { Ionicons } from "@expo/vector-icons"
import Badge from "../../Badge"
import { observer } from "mobx-react"
import { colors } from "../../../layout/layout"
@observer
class Item extends Component {
    _onPress = () => {
        const { _onPress, item } = this.props
        _onPress({ ...item })
    }
    render () {
        const {
            item,
            current,
        } = this.props
        const { wxid, headimg, nickname, devicename } = item
        const isCurrent = wxid === current
        let badge = item.unread
        return (
            <TouchableHighlight onPress={this._onPress}>
                <View style={[styles.container, { backgroundColor: isCurrent ? colors.act : colors.navBg }]}>
                    <View style={styles.thumb}>
                        <Avatar uri={headimg} size="small" />
                    </View>
                    <View style={styles.content}>
                        <Text
                            style={[styles.title, { color: isCurrent ? "#FFFFFF" : "#000000" }]}
                            numberOfLines={1}
                        >
                            {nickname || " "}
                        </Text>
                        <View style={styles.device}>
                            <Ionicons
                                name="ios-phone-portrait"
                                size={16}
                                style={styles.icon}
                                color={isCurrent ? colors.navBg : colors.desc}
                            />
                            <Text
                                style={[styles.desc, { color: isCurrent ? colors.navBg : colors.desc }]}
                                numberOfLines={1}
                            >
                                {devicename || " "}
                            </Text>
                        </View>
                    </View>
                    {badge
                        ? <View style={styles.badge}>
                            <Badge value={badge} />
                        </View>
                        : null
                    }
                </View>
            </TouchableHighlight>
        )
    }
}
export default Item
const pad = 16
const styles = StyleSheet.create({
    container: {
        height: 64,
        paddingVertical: 10,
        flexDirection: "row",
        alignItems: "center",
    },
    thumb: {
        marginHorizontal: pad,
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
    device: {
        flexDirection: "row",
        alignItems: "center",
    },
    icon: {
        marginRight: 4,
    },
    desc: {
        fontSize: 14,
    },
    badge: {
        marginRight: pad,
    },
})
