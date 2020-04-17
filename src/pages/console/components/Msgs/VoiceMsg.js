import React, { Component } from "react"
import {
    TouchableHighlight,
    View,
    Image,
    Text,
    StyleSheet,
} from "react-native"
import { colors } from "../../../../layout/layout"
import { connectActionSheet } from "@expo/react-native-action-sheet"
import { observer } from "mobx-react"
const MVP = require("../../../../assets/mine_voice_playing.gif")
const MV = require("../../../../assets/mine_voice.png")
const VP = require("../../../../assets/voice_playing.gif")
const V = require("../../../../assets/voice.png")
@connectActionSheet
@observer
class VoiceMsg extends Component {
    _onPress = () => {
        const { item, funcs } = this.props
        const { id, url } = item
        funcs._playVoice(id, url)
    }
    _onLongPress = () => {
        const { showActionSheetWithOptions, item, funcs } = this.props
        const { id } = item
        showActionSheetWithOptions(
            {
                options: ["转发", "取消"],
                cancelButtonIndex: 1,
            },
            (index) => {
                if (index === 0) {
                    funcs._forward(id)
                }
            }
        )
    }
    render () {
        let { item, isMine, current, isPlaying } = this.props
        const { id, seconds } = item
        const palying = current === id && isPlaying
        return (
            <TouchableHighlight
                onPress={this._onPress}
                onLongPress={this._onLongPress}
                style={styles.custom}
            >
                <View
                    style={[
                        styles.container,
                        { backgroundColor: isMine ? colors.act : colors.lightGray },
                        { flexDirection: isMine ? "row-reverse" : "row" },
                    ]}
                >
                    <Image
                        style={styles.voice}
                        resizeMode="cover"
                        source={isMine ? palying ? MVP : MV : palying ? VP : V}
                    />
                    <Text style={[styles.time, { color: isMine ? "#FFFFFF" : "#000000" }]}>
                        {seconds || "1"} "
                    </Text>
                </View>
            </TouchableHighlight>
        )
    }
}
export default VoiceMsg
const pad = 8
const radius = 10
const styles = StyleSheet.create({
    custom: {
        borderRadius: radius,
    },
    container: {
        width: 128,
        padding: pad,
        borderRadius: radius,
        justifyContent: "space-between",
        alignItems: "center",
    },
    voice: {
        width: 20,
        height: 20,
    },
    time: {
        fontSize: 17,
        lineHeight: 28,
    },
})
