import React, { Component } from "react"
import {
    TouchableHighlight,
    View,
    Text,
    Image,
    StyleSheet,
} from "react-native"
import ParsedText from "react-native-parsed-text"
import { colors, customs } from "../../../../layout/layout"
import { connectActionSheet } from "@expo/react-native-action-sheet"
import { observer } from "mobx-react"
@connectActionSheet
@observer
class TextMsg extends Component {
    _onOpenUrl = (url) => {
        const { showActionSheetWithOptions, funcs } = this.props
        showActionSheetWithOptions(
            {
                title: "可能是链接",
                message: url,
                options: ["复制", "浏览器打开", "取消"],
                cancelButtonIndex: 2,
            },
            (index) => {
                if (index === 0) {
                    funcs._copy(url)
                }
                if (index === 1) {
                    funcs._openUrl(url)
                }
            }
        )
    }
    _onOpenPhone = (phone) => {
        const { showActionSheetWithOptions, funcs } = this.props
        showActionSheetWithOptions(
            {
                title: "可能是手机号",
                message: phone,
                options: ["复制", "呼叫电话", "取消"],
                cancelButtonIndex: 2,
            },
            (index) => {
                if (index === 0) {
                    funcs._copy(phone)
                }
                if (index === 1) {
                    funcs._openTel(phone)
                }
            }
        )
    }
    _onOpenEmail = (email) => {
        const { showActionSheetWithOptions, funcs } = this.props
        showActionSheetWithOptions(
            {
                title: "可能是邮箱",
                message: email,
                options: ["复制", "发送邮件", "取消"],
                cancelButtonIndex: 2,
            },
            (index) => {
                if (index === 0) {
                    funcs._copy(email)
                }
                if (index === 1) {
                    funcs._openMail(email)
                }
            }
        )
    }
    _onLongPress = () => {
        const { showActionSheetWithOptions, funcs, item } = this.props
        const { id, text } = item
        if (text) {
            if (text.indexOf("淘♂寳♀") !== -1) {
                showActionSheetWithOptions(
                    {
                        title: "可能是淘口令",
                        message: text,
                        options: ["复制", "转发", "复制到淘宝", "取消"],
                        cancelButtonIndex: 3,
                    },
                    (index) => {
                        if (index === 0) {
                            funcs._copy(text)
                        }
                        if (index === 1) {
                            funcs._forward(id)
                        }
                        if (index === 2) {
                            funcs._copyToTaobao(text)
                        }
                    }
                )
            } else {
                showActionSheetWithOptions(
                    {
                        options: ["复制", "转发", "取消"],
                        cancelButtonIndex: 2,
                    },
                    (index) => {
                        if (index === 0) {
                            funcs._copy(text)
                        }
                        if (index === 1) {
                            funcs._forward(id)
                        }
                    }
                )
            }
        }
    }
    render () {
        const parse = [
            { type: "url", style: styles.parsed, onPress: this._onOpenUrl },
            { type: "phone", style: styles.parsed, onPress: this._onOpenPhone },
            { type: "email", style: styles.parsed, onPress: this._onOpenEmail },
        ]
        const { item, isMine } = this.props
        const { text } = item
        return (
            <TouchableHighlight
                onLongPress={this._onLongPress}
                style={styles.custom}
            >
                <View
                    style={[
                        styles.container,
                        { backgroundColor: isMine ? colors.act : colors.lightGray },
                    ]}
                >
                    <Text style={styles.text}>
                        <ParsedText
                            style={{ color: isMine ? "#FFFFFF" : "#000000" }}
                            parse={parse}
                        >
                            {text || " "}
                        </ParsedText>
                    </Text>
                </View>
            </TouchableHighlight>
        )
    }
}
export default TextMsg
const pad = 8
const radius = 10
const styles = StyleSheet.create({
    custom: {
        borderRadius: radius,
    },
    container: {
        maxWidth: customs.fullWidth - 136,
        minWidth: 64,
        padding: pad,
        borderRadius: radius,
    },
    text: {
        fontSize: 17,
        lineHeight: 28,
    },
    parsed: {
        textDecorationLine: "underline",
    },
})
