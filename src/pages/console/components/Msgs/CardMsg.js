import React, { Component } from "react"
import {
    TouchableHighlight,
    View,
    Image,
    Text,
    StyleSheet,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { colors, customs } from "../../../../layout/layout"
import { connectActionSheet } from "@expo/react-native-action-sheet"
import { observer } from "mobx-react"
const IDP = require("../../../../assets/idp.png")
@connectActionSheet
@observer
class CardMsg extends Component {
    _onLongPress = () => {
        const { showActionSheetWithOptions, funcs, item } = this.props
        const { id, msgSvrId } = item
        showActionSheetWithOptions(
            {
                options: ["添加好友", "转发", "取消"],
                cancelButtonIndex: 2,
            },
            (index) => {
                if (index === 0) {
                    funcs._addFriend(msgSvrId)
                }
                if (index === 1) {
                    funcs._forward(id)
                }
            }
        )
    }
    render () {
        const { item } = this.props
        const { text } = item
        let { HeadImg, Nickname, Province, City } = text
        return (
            <TouchableHighlight
                onLongPress={this._onLongPress}
                style={styles.custom}
            >
                <View style={styles.container}>
                    <View style={styles.content}>
                        <View style={styles.thumb}>
                            <Image
                                style={styles.img}
                                resizeMode="cover"
                                source={HeadImg ? { uri: HeadImg } : IDP}
                                defaultSource={IDP}
                            />
                        </View>
                        <View style={styles.context}>
                            <Text style={styles.title} numberOfLines={1}>
                                {Nickname || " "}
                            </Text>
                            {(Province || City)
                                ? <Text style={styles.caption} numberOfLines={1}>
                                    {Province && `${Province}-`}{City}
                                </Text>
                                : null
                            }
                        </View>
                    </View>
                    <View style={styles.footer}>
                        <Ionicons
                            size={16}
                            name="ios-person"
                            color={colors.act}
                            style={{ marginRight: pad / 2 }}
                        />
                        <Text style={styles.desc}>个人名片</Text>
                    </View>
                </View>
            </TouchableHighlight>
        )
    }
}
export default CardMsg
const pad = 8
const radius = 10
const size = 44
const styles = StyleSheet.create({
    custom: {
        borderRadius: radius,
    },
    container: {
        overflow: "hidden",
        width: customs.fullWidth - 136,
        backgroundColor: "#FFFFFF",
        borderRadius: radius,
    },
    content: {
        padding: pad / 2,
        flexDirection: "row",
    },
    thumb: {
        overflow: "hidden",
        width: size,
        height: size,
        borderRadius: radius / 2,
        margin: pad / 2,
        borderColor: colors.bor,
        borderWidth: StyleSheet.hairlineWidth,
    },
    img: {
        width: size,
        height: size,
    },
    context: {
        padding: pad / 2,
        flex: 1,
        justifyContent: "space-around",
    },
    title: {
        fontSize: 17,
    },
    caption: {
        fontSize: 14,
        color: colors.desc,
    },
    footer: {
        paddingHorizontal: pad,
        paddingBottom: pad,
        flexDirection: "row",
        alignItems: "center",
    },
    desc: {
        fontSize: 12,
        color: colors.desc,
    },
})
