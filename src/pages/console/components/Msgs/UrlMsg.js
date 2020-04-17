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
class UrlMsg extends Component {
    _onLongPress = () => {
        const { showActionSheetWithOptions, funcs, item } = this.props
        const { id, text } = item
        const { Url } = text
        showActionSheetWithOptions(
            {
                options: ["浏览器打开", "转发", "取消"],
                cancelButtonIndex: 2,
            },
            (index) => {
                if (index === 0) {
                    funcs._openUrl(Url)
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
        let url = text.Thumb || text.thumb || text.img_url || ""
        return (
            <TouchableHighlight
                onLongPress={this._onLongPress}
                style={styles.custom}
            >
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.title} numberOfLines={2}>
                            {text.Title || text.title || " "}
                        </Text>
                    </View>
                    <View style={styles.content}>
                        <View style={styles.context}>
                            <Text style={styles.caption} numberOfLines={2}>
                                {text.Des || text.desc || " "}
                            </Text>
                        </View>
                        <View style={styles.thumb}>
                            <Image
                                style={styles.img}
                                resizeMode="cover"
                                source={url ? { uri: url } : IDP}
                                defaultSource={IDP}
                            />
                        </View>
                    </View>
                    <View style={styles.footer}>
                        <Ionicons
                            size={16}
                            name="ios-link"
                            color={colors.act}
                            style={{ marginRight: pad / 2 }}
                        />
                        <Text style={styles.desc}>链接</Text>
                    </View>
                </View>
            </TouchableHighlight>
        )
    }
}
export default UrlMsg
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
    header: {
        paddingHorizontal: pad,
        paddingTop: pad,
    },
    title: {
        fontSize: 17,
    },
    content: {
        padding: pad / 2,
        flexDirection: "row",
    },
    context: {
        padding: pad / 2,
        flex: 1,
    },
    caption: {
        fontSize: 14,
        color: colors.desc,
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
