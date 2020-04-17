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
function getIcon (icon) {
    let re = ""
    if (icon) {
        re = `http://wechat.yunbeisoft.com/index_test.php/home/Test/get_img/?url=${encodeURIComponent(icon)}`
    }
    return re
}
@connectActionSheet
@observer
class AppMsg extends Component {
    _onLongPress = () => {
        const { showActionSheetWithOptions, funcs, item } = this.props
        const { id } = item
        showActionSheetWithOptions(
            {
                options: ["收藏", "转发", "取消"],
                cancelButtonIndex: 2,
            },
            (index) => {
                if (index === 0) {
                    console.log("collection")
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
        let { Icon, Thumb } = text
        return (
            <TouchableHighlight
                onLongPress={this._onLongPress}
                style={styles.custom}
            >
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Image
                            style={styles.icon}
                            resizeMode="cover"
                            source={Icon ? { uri: getIcon(Icon) } : IDP}
                            defaultSource={IDP}
                        />
                        <Text style={styles.desc} numberOfLines={1}>
                            {text.Source || " "}
                        </Text>
                    </View>
                    <View style={styles.content}>
                        <View style={styles.context}>
                            <Text style={styles.caption} numberOfLines={2}>
                                {text.Title || " "}
                            </Text>
                        </View>
                        <View style={styles.thumb}>
                            <Image
                                style={styles.img}
                                resizeMode="cover"
                                source={Thumb ? { uri: Thumb } : IDP}
                                defaultSource={IDP}
                            />
                        </View>
                    </View>
                    <View style={styles.footer}>
                        <Ionicons
                            size={16}
                            name="ios-compass"
                            color={colors.act}
                            style={{ marginRight: pad / 2 }}
                        />
                        <Text style={styles.desc}>小程序</Text>
                    </View>
                </View>
            </TouchableHighlight>
        )
    }
}
export default AppMsg
const pad = 8
const radius = 10
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
    header: {
        paddingHorizontal: pad,
        paddingTop: pad,
        flexDirection: "row",
        alignItems: "center",
    },
    icon: {
        width: 20,
        height: 20,
        marginRight: pad,
    },
    desc: {
        fontSize: 12,
        color: colors.desc,
    },
    content: {
        padding: pad / 2,
    },
    context: {
        padding: pad / 2,
    },
    caption: {
        fontSize: 17,
    },
    thumb: {
        overflow: "hidden",
        width: customs.fullWidth - 136 - 16,
        height: (customs.fullWidth - 136 - 16) / 4 * 3,
        borderRadius: radius / 2,
        margin: pad / 2,
        borderColor: colors.bor,
        borderWidth: StyleSheet.hairlineWidth,
    },
    img: {
        width: customs.fullWidth - 136 - 16,
        height: (customs.fullWidth - 136 - 16) / 4 * 3,
    },
    footer: {
        paddingHorizontal: pad,
        paddingBottom: pad,
        flexDirection: "row",
        alignItems: "center",
    },
})
