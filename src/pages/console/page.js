import React, { Component } from "react"
import {
    Keyboard,
    Animated,
    StatusBar,
    Clipboard,
    Linking,
    InteractionManager,
    StyleSheet,
} from "react-native"
import HeaderIcon from "./components/HeaderIcon"
import HeaderTitle from "./components/HeaderTitle"
import { ActionSheetProvider } from "@expo/react-native-action-sheet"
import ImgViewer from "../../components/ImgViewer"
import List from "./components/List"
import InputBar from "./components/InputBar"
import { colors } from "../../layout/layout"
import { saveToCamera } from "../../utils/Utils"
import { observer, inject } from "mobx-react"
import { Audio } from "expo"

let consolePoll
@inject("rootStore")
@observer
class Console extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerLeft: <HeaderIcon _onPress={() => navigation.goBack()} />,
        headerTitle: <HeaderTitle />,
    })
    constructor (props) {
        super(props)
        this.playbackInstance = null
        const { AuthStore, ChatStore, ConsoleStore, ToastStore } = this.props.rootStore
        this.AuthStore = AuthStore
        this.ChatStore = ChatStore
        this.ConsoleStore = ConsoleStore
        this.ToastStore = ToastStore
        this.keyboardHeight = new Animated.Value(0)
        this.state = {
            visible: false,
            current: "",
            isPlaying: false,
        }
    }
    componentWillMount () {
        this.keyboardWillShowSub = Keyboard.addListener("keyboardWillShow", this._keyboardWillShow)
        this.keyboardWillHideSub = Keyboard.addListener("keyboardWillHide", this._keyboardWillHide)
    }
    componentDidMount () {
        const userid = this.AuthStore.chatsCurrent
        this.ConsoleStore.initConsole(userid)
        this.ChatStore.upLastTime(userid)
        InteractionManager.runAfterInteractions(
            () => {
                consolePoll && clearInterval(consolePoll)
                consolePoll = setInterval(() => {
                    this.ConsoleStore.pollUpdate(this.AuthStore.chatsAct)
                    this.ConsoleStore.checkMsg()
                }, 2000)
            }
        )
    }
    componentWillUnmount = () => {
        consolePoll && clearInterval(consolePoll)
        this.keyboardWillShowSub.remove()
        this.keyboardWillHideSub.remove()
        InteractionManager.runAfterInteractions(() => {
            this.ConsoleStore.reset()
            this.AuthStore.upChatsAct({})
            this.ChatStore.upLastTime("")
        })
    }
    _keyboardWillShow = (e) => {
        Animated.parallel([Animated.timing(this.keyboardHeight, { duration: e.duration, toValue: e.endCoordinates.height })]).start()
    }
    _keyboardWillHide = (e) => {
        Animated.parallel([Animated.timing(this.keyboardHeight, { duration: e.duration, toValue: 0 })]).start()
    }
    _fetchRecord = () => {
        this.ConsoleStore.fetchRecord(this.AuthStore.chatsCurrent)
    }
    _info = () => {
        this.props.navigation.navigate("Info")
    }
    // 复制消息
    _copy = (text) => {
        Clipboard.setString(text)
    }
    // 选择转发好友
    _forward = (current) => {
        this.setState({ current })
        this.props.navigation.navigate("Forward", { callback: this.doForward })
    }
    // 转发
    doForward = (item) => {
        const kefu_wxid = this.AuthStore.chatsAct.kefu_wxid || ""
        this.ConsoleStore.forward({
            kefu_wxid,
            userids: [item.userid],
            content: this.state.current,
            status: "2",
        })
    }
    // 复制到淘宝
    _copyToTaobao = (text) => {
        this._copy(text)
        Linking.openURL("taobao://")
    }
    // 浏览器打开
    _openUrl = (url) => {
        Linking.openURL(url)
    }
    // 拨打电话
    _openTel = (phone) => {
        Linking.openURL(`tel:${phone}`)
    }
    // 发送邮件
    _openMail = (email) => {
        Linking.openURL(`mailto:${email}`)
    }
    // 大图预览
    _showImg = (current) => {
        this.setState({ visible: true, current })
    }
    // 大图隐藏
    _hideImg = () => {
        this.setState({ visible: false, current: "" })
    }
    _viewerChange = (index) => {
        const { imageUrls } = this.ConsoleStore
        this.setState({ current: imageUrls[index].id })
    }
    // 保存到相册
    _saveToCamera = async (url) => {
        const { error, msg } = await saveToCamera(url)
        if (error) {
            this.ToastStore.error(msg, "")
        } else {
            this.ToastStore.success(msg, "")
        }
    }
    // 播放语音
    _playVoice = async (id, uri) => {
        if (this.playbackInstance !== null) {
            await this.playbackInstance.unloadAsync()
            this.playbackInstance.setOnPlaybackStatusUpdate(null)
            this.playbackInstance = null
        }
        const { current } = this.state
        if (current === id) {
            this.setState({ current: "", isPlaying: false })
        } else {
            this.setState({ current: id, isPlaying: false })
            try {
                const { sound } = await Audio.Sound.createAsync(
                    { uri },
                    { shouldPlay: true },
                    this._onPlaybackStatusUpdate
                )
                this.playbackInstance = sound
            } catch (error) {
                this.ToastStore.error("获取语音失败", "")
            }
        }
    }
    _onPlaybackStatusUpdate = async (status) => {
        if (!status.isLoaded) {
            if (status.error) {
                this.ToastStore.error(`播放语音失败：${status.error}`, "")
            }
        } else {
            if (status.isPlaying) {
                this.setState({ isPlaying: true })
            } else {
                this.setState({ isPlaying: false })
            }
            if (status.didJustFinish && !status.isLooping) {
                this.setState({ current: "", isPlaying: false })
                await this.playbackInstance.unloadAsync()
                this.playbackInstance.setOnPlaybackStatusUpdate(null)
                this.playbackInstance = null
            }
        }
    }

    _addFriend = async (MsgSvrId) => {
        const data = await this.AuthStore.addFriendByCard(MsgSvrId)
        if (data.error) {
            this.ToastStore.error(data.errmsg, "")
        } else {
            this.ToastStore.success("请求成功", "")
        }
    }
    funcs = ({
        _copy: this._copy,
        _forward: this._forward,
        _copyToTaobao: this._copyToTaobao,
        _openUrl: this._openUrl,
        _openTel: this._openTel,
        _openMail: this._openMail,
        _showImg: this._showImg,
        _saveToCamera: this._saveToCamera,
        _playVoice: this._playVoice,
        _addFriend: this._addFriend,
    })

    render () {
        const { init, data, hasMore, recording, imageUrls } = this.ConsoleStore
        const { visible, current, isPlaying } = this.state
        const index = imageUrls && imageUrls.length > 0
            ? imageUrls.findIndex((item) => item.id === current)
            : 0
        return (
            <ActionSheetProvider>
                <Animated.View
                    style={[styles.container, { paddingBottom: this.keyboardHeight }]}
                >
                    <StatusBar
                        animated
                        barStyle="dark-content"
                        backgroundColor={colors.navBg}
                    />
                    <ImgViewer
                        visible={visible}
                        _close={this._hideImg}
                        imageUrls={imageUrls}
                        index={index}
                        _onChange={this._viewerChange}
                    />
                    <List
                        init={init}
                        data={data}
                        hasMore={hasMore}
                        recording={recording}
                        _fetchRecord={this._fetchRecord}
                        _info={this._info}
                        funcs={this.funcs}
                        current={current}
                        isPlaying={isPlaying}
                    />
                    <InputBar />
                </Animated.View>
            </ActionSheetProvider>
        )
    }
}
export default Console
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.bg,
    },
})
