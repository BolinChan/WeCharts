import React, { Component } from "react"
import {
    SafeAreaView,
    View,
    TouchableOpacity,
    TouchableHighlight,
    TextInput,
    Text,
    StyleSheet,
} from "react-native"
import { Permissions, Audio } from "expo"
import { connectActionSheet } from "@expo/react-native-action-sheet"
import {
    checkPermission,
    takePhoto,
    pickPhoto,
    uploadImage,
    uploadVoice,
} from "../../../utils/Utils"
import request from "../../../utils/Request"
import { Ionicons } from "@expo/vector-icons"
import { observer, inject } from "mobx-react"
import dayjs from "dayjs"
const uuid = require("uuid/v1")
@connectActionSheet
@inject("rootStore")
@observer
class InputBar extends Component {
    constructor (props) {
        super(props)
        this.recordingInstance = null
        const { AuthStore, ChatStore, ConsoleStore, ToastStore } = this.props.rootStore
        this.AuthStore = AuthStore
        this.ChatStore = ChatStore
        this.ConsoleStore = ConsoleStore
        this.ToastStore = ToastStore
        this.state = {
            msgType: "text",
            text: "",
            seconds: 0,
        }
    }
    _onPress = () => {
        this.props.showActionSheetWithOptions(
            {
                options: ["拍照", "从相册选取", "取消"],
                cancelButtonIndex: 2,
            },
            async (buttonIndex) => {
                let res = ""
                if (buttonIndex === 0) {
                    res = await takePhoto()
                }
                if (buttonIndex === 1) {
                    res = await pickPhoto()
                }
                if (res) {
                    this.addImgMsg(res)
                }
            }
        )
    }
    addImgMsg = (res) => {
        if (res.error) {
            this.ToastStore.error(res.msg, "")
        } else {
            // 添加临时消息并上传图片
            const uri = res.uri
            if (uri) {
                const id = uuid()
                const msg = {
                    imgStatus: "pending",
                    type: "2",
                    url: uri,
                    addtime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
                    id,
                    key: id,
                }
                this.ConsoleStore.addMsg(msg)
                this.updateImg(msg)
            }
        }
    }
    updateImg = async (msg) => {
        const res = await uploadImage(msg.url)
        const key = msg.key
        let upData = { key }
        if (res.error) {
            upData = {
                ...upData,
                imgStatus: "error",
            }
            this.ToastStore.error(res.msg, "")
        } else {
            upData = {
                ...upData,
                imgStatus: "success",
                url: res.data[0].url,
            }
            this.ConsoleStore.sendMsg({ ...msg, ...upData })
        }
        this.ConsoleStore.updateMsg(upData)
    }
    addTextMsg = () => {
        const { text } = this.state
        if (text) {
            const id = uuid()
            const msg = {
                type: "1",
                text,
                addtime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
                id,
                key: id,
            }
            this.changeText("")
            this.ConsoleStore.addMsg(msg)
            this.ConsoleStore.sendMsg({ ...msg, contents: text })
        }
    }
    changeText = (text) => {
        this.setState({ text })
    }
    changeMsgType = async () => {
        let { msgType } = this.state
        msgType = msgType === "text" ? "voice" : "text"
        if (msgType === "voice") {
            let permission = await checkPermission(Permissions.AUDIO_RECORDING)
            if (!permission) {
                this.ToastStore.error("没有权限，请前往设置开启", "")
                return
            }
        }
        this.setState({ msgType })
    }
    recordStart = async () => {
        this.recordingInstance = new Audio.Recording()
        try {
            await this.recordingInstance.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY)
            await this.recordingInstance.setOnRecordingStatusUpdate(this._onRecordingStatusUpdate)
            await this.recordingInstance.startAsync()
            this.ToastStore.loading("录音中")
        } catch (error) {
            this.ToastStore.error("录音失败", "")
        }
    }
    _onRecordingStatusUpdate = (status) => {
        this.setState({ seconds: status.durationMillis })
    }
    recordEnd = async () => {
        await this.recordingInstance.stopAndUnloadAsync()
        const uri = this.recordingInstance.getURI()
        this.recordingInstance = null
        if (!uri) {
            this.ToastStore.error("录音失败", "")
            setTimeout(() => this.ToastStore.hidden(), 500)
            return
        }
        this.ToastStore.loading("发送中")
        // 上传语音
        const res = await uploadVoice(uri)
        if (res.error) {
            this.ToastStore.error(`发送失败 ${res.msg}`, "")
            setTimeout(() => this.ToastStore.hidden(), 500)
            return
        }
        let url = res.data[0].url || ""
        if (!url) {
            this.ToastStore.error("发送失败", "")
            setTimeout(() => this.ToastStore.hidden(), 500)
            return
        }
        // 语音转换
        const data = await request(
            "http://wechat.yunbeisoft.com/mp3_to_amr/mp3amr.php",
            { url }
        )
        if (data.error) {
            this.ToastStore.error(`发送失败 ${data.msg}`, "")
            setTimeout(() => this.ToastStore.hidden(), 500)
            return
        }
        this.ToastStore.hidden()
        const contents = data.data
        this.addVoiceMsg(url, contents)
    }
    addVoiceMsg = (url, contents) => {
        if (url && contents) {
            let { seconds } = this.state
            seconds = Math.round(seconds / 1000)
            const id = uuid()
            const msg = {
                type: "3",
                addtime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
                id,
                key: id,
                url,
                contents: `${contents}/?second=${seconds}`,
                seconds,
            }
            this.ConsoleStore.addMsg(msg)
            this.ConsoleStore.sendMsg(msg)
        }
    }
    render () {
        const { text, msgType } = this.state
        return (
            <SafeAreaView>
                <View style={styles.container}>
                    <TouchableOpacity onPress={this.changeMsgType}>
                        <View style={styles.btnContainer}>
                            <View style={styles.btn}>
                                <Ionicons name="ios-mic" size={iconSize} />
                            </View>
                        </View>
                    </TouchableOpacity>
                    {msgType === "text"
                        ? <TextInput
                            allowFontScaling={false}
                            multiline
                            onChangeText={this.changeText}
                            style={styles.ipt}
                            value={text}
                            underlineColorAndroid="transparent"
                        />
                        : <TouchableHighlight
                            style={styles.voiceContainer}
                            onPressIn={this.recordStart}
                            onPressOut={this.recordEnd}
                        >
                            <View style={styles.voice}>
                                <Text style={styles.voiceTitle}>
                                    按住说话
                                </Text>
                            </View>
                        </TouchableHighlight>
                    }
                    <TouchableOpacity onPress={this._onPress}>
                        <View style={styles.btnContainer}>
                            <View style={styles.btn}>
                                <Ionicons name="ios-camera" size={iconSize} />
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.addTextMsg}>
                        <View style={styles.btnContainer}>
                            <View style={styles.btn}>
                                <Ionicons name="ios-send" size={iconSize} />
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        )
    }
}
export default InputBar
const iconSize = 20
const pad = 8
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        paddingVertical: 8,
        paddingHorizontal: 5,
        alignItems: "flex-end",
    },
    btnContainer: {
        width: 44,
        height: 44,
        padding: 5,
    },
    btn: {
        width: "100%",
        height: "100%",
        borderRadius: 17,
        borderWidth: 1.5,
        justifyContent: "center",
        alignItems: "center",
    },
    ipt: {
        minHeight: 44,
        maxHeight: 116,
        flex: 1,
        backgroundColor: "#FFFFFF",
        borderRadius: 10,
        fontSize: 17,
        padding: pad,
        marginHorizontal: 5,
    },
    voiceContainer: {
        flex: 1,
        marginHorizontal: 5,
        borderRadius: 10,
        overflow: "hidden",
    },
    voice: {
        height: 44,
        backgroundColor: "#FFFFFF",
        alignItems: "center",
        justifyContent: "center",
    },
    voiceTitle: {
        fontSize: 17,
        fontWeight: "bold",
    },
})
