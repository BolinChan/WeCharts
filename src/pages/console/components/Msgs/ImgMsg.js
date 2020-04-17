import React, { Component } from "react"
import {
    TouchableHighlight,
    View,
    Image,
    ActivityIndicator,
    StyleSheet,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { colors } from "../../../../layout/layout"
import { connectActionSheet } from "@expo/react-native-action-sheet"
import { observer } from "mobx-react"
const IDP = require("../../../../assets/idp.png")
@connectActionSheet
@observer
class ImgMsg extends Component {
    state = { onLoad: false }
    _onLoad = () => {
        this.setState({ onLoad: true })
    }
    _onPress = () => {
        const { item, funcs } = this.props
        const { id, imgStatus } = item
        if (imgStatus && imgStatus !== "success") {
            return
        }
        funcs._showImg(id)
    }
    _onLongPress = () => {
        const { showActionSheetWithOptions, item, funcs } = this.props
        const { url, id, imgStatus } = item
        if (imgStatus && imgStatus !== "success") {
            return
        }
        if (url) {
            showActionSheetWithOptions(
                {
                    options: ["保存", "转发", "收藏表情", "取消"],
                    cancelButtonIndex: 3,
                },
                (index) => {
                    if (index === 0) {
                        funcs._saveToCamera(url)
                    }
                    if (index === 1) {
                        funcs._forward(id)
                    }
                    if (index === 2) {
                        console.log("collection")
                    }
                }
            )
        }
    }
    render () {
        const { onLoad } = this.state
        const { item } = this.props
        const { url, imgStatus } = item
        return (
            <TouchableHighlight
                onPress={onLoad ? this._onPress : null}
                onLongPress={onLoad ? this._onLongPress : null}
                style={styles.custom}
            >
                <View style={styles.container}>
                    <Image
                        style={styles.img}
                        resizeMode="cover"
                        source={url ? { uri: url } : IDP}
                        defaultSource={IDP}
                        onLoad={this._onLoad}
                    />
                    {imgStatus && imgStatus !== "success"
                        ? <View style={styles.wrap}>
                            {imgStatus === "pending"
                                ? <ActivityIndicator color="#FFFFFF" size="large" />
                                : <Ionicons
                                    size={44}
                                    name="ios-close-circle-outline"
                                    color="#FFFFFF"
                                />
                            }
                        </View>
                        : null
                    }
                </View>
            </TouchableHighlight>
        )
    }
}
export default ImgMsg
const size = 150
const radius = 10
const styles = StyleSheet.create({
    custom: {
        borderRadius: radius,
    },
    container: {
        overflow: "hidden",
        width: size,
        height: size,
        borderRadius: radius,
        borderColor: colors.bor,
        borderWidth: StyleSheet.hairlineWidth,
    },
    img: {
        width: size,
        height: size,
    },
    wrap: {
        position: "absolute",
        width: "100%",
        height: "100%",
        backgroundColor: colors.desc,
        justifyContent: "center",
        alignItems: "center",
    },
})
