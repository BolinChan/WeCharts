import React, { Component } from "react"
import { SafeAreaView, StatusBar, InteractionManager, StyleSheet } from "react-native"
import List from "./components/List"
import { colors } from "../../layout/layout"
import { observer, inject } from "mobx-react"
import { reaction } from "mobx"
let chatPoll
@inject("rootStore")
@observer
class Chats extends Component {
    static navigationOptions = ({
        tabBarOnPress: ({ navigation, defaultHandler }) => {
            if (navigation.isFocused()) {
                navigation.state.params.chatsToTop()
            } else {
                defaultHandler()
            }
        },
    })
    constructor (props) {
        super(props)
        const { AuthStore, ChatStore } = this.props.rootStore
        this.AuthStore = AuthStore
        this.ChatStore = ChatStore
        reaction(() => this.AuthStore.wechatsCurrent, (wechatsCurrent) => {
            this.ChatStore.initChats(wechatsCurrent)
        })
    }
    componentDidMount () {
        this.props.navigation.setParams({ chatsToTop: () => {this.scrollToTop()} })
        InteractionManager.runAfterInteractions(
            () => {
                chatPoll && clearInterval(chatPoll)
                chatPoll = setInterval(() => {
                    this.ChatStore.pollUpdate(this.AuthStore.wechatsCurrent)
                }, 2000)
            }
        )
    }
    componentWillUnmount () {
        chatPoll && clearInterval(chatPoll)
    }
    _scrollToTop = (func) => {
        this.scrollToTop = func
    }
    _onPress = (value) => {
        this.AuthStore.upChatsAct(value)
        this.props.navigation.navigate("Console")
    }
    _onEndReached = () => {
        this.ChatStore.loadMore(this.AuthStore.wechatsCurrent)
    }
    _onRefresh = () => {
        this.ChatStore.refresh(this.AuthStore.wechatsCurrent)
    }
    _onSearch = () => {
        this.props.navigation.navigate("Search", { index: "chats" })
    }
    render () {
        const { data, hasMore, refreshing } = this.ChatStore
        const { wechatsCurrent, wechatsData } = this.AuthStore
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar
                    animated
                    barStyle="dark-content"
                    backgroundColor={colors.navBg}
                />
                <List
                    _scrollToTop={this._scrollToTop}
                    data={data}
                    hasMore={hasMore}
                    _onPress={this._onPress}
                    _onEndReached={this._onEndReached}
                    _onRefresh={this._onRefresh}
                    refreshing={refreshing}
                    _onSearch={this._onSearch}
                    wechatsCurrent={wechatsCurrent}
                    wechatsData={wechatsData}
                />
            </SafeAreaView>
        )
    }
}
export default Chats
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.bg,
    },
})
