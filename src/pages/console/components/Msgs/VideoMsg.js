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
const VDP = require("../../../../assets/vdp.png")
@connectActionSheet
@observer
class VideoMsg extends Component {
    _onPress = () => {
        console.log("paly")
    }
    _onLongPress = () => {
        const { showActionSheetWithOptions, item, funcs } = this.props
        const { id, url } = item
        if (url) {
            showActionSheetWithOptions(
                {
                    options: ["保存", "转发", "取消"],
                    cancelButtonIndex: 2,
                },
                (index) => {
                    if (index === 0) {
                        console.log("save")
                    }
                    if (index === 1) {
                        funcs._forward(id)
                    }
                }
            )
        }
    }
    render () {
        let { item, playing } = this.props
        const { url, id } = item
        playing = playing === id
        return (
            <TouchableHighlight
                onPress={this._onPress}
                onLongPress={this._onLongPress}
                style={styles.custom}
            >
                <View style={styles.container}>
                    <Image
                        style={styles.video}
                        resizeMode="cover"
                        source={url ? { uri: url } : VDP}
                        defaultSource={VDP}
                    />
                    <View style={styles.wrap}>
                        {playing
                            ? <ActivityIndicator color="#FFFFFF" size="large" />
                            : <Ionicons
                                size={44}
                                name="ios-play-circle"
                                color="#FFFFFF"
                            />
                        }
                    </View>
                </View>
            </TouchableHighlight>
        )
    }
}
export default VideoMsg
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
    video: {
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
