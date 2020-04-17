import React, { Component } from "react"
import {
    View,
    StatusBar,
    SafeAreaView,
    InteractionManager,
    StyleSheet,
} from "react-native"
import Confirm from "./components/Confirm"
import Head from "./components/Head"
import List from "./components/List"
import { colors } from "../../layout/layout"
import { observer, inject } from "mobx-react"
@inject("rootStore")
@observer
class Forward extends Component {
    constructor (props) {
        super(props)
        const { AuthStore, ForwardStore } = this.props.rootStore
        this.AuthStore = AuthStore
        this.ForwardStore = ForwardStore
        this.state = {
            item: {},
            visible: false,
        }
    }
    componentDidMount () {
        InteractionManager.runAfterInteractions(() => {
            const kefu_wxid = this.AuthStore.chatsAct.kefu_wxid || ""
            this.ForwardStore.initForward(kefu_wxid)
        })
    }
    componentWillUnmount () {
        InteractionManager.runAfterInteractions(() => {
            this.ForwardStore.reset()
        })
    }
    _loadMore = () => {
        const kefu_wxid = this.AuthStore.chatsAct.kefu_wxid || ""
        this.ForwardStore.loadMore(kefu_wxid)
    }
    _onCancel = () => {
        this.props.navigation.goBack()
    }
    _onPress = (item) => {
        this.setState({ item, visible: true })
    }
    _closeModal = () => {
        this.setState({ item: {}, visible: false })
    }
    _onOk = () => {
        const { item } = this.state
        this._closeModal()
        this.props.navigation.state.params.callback(item)
        this._onCancel()
    }
    _changeText = (text) => {
        this.ForwardStore.changeText(text)
    }
    _search = () => {
        const kefu_wxid = this.AuthStore.chatsAct.kefu_wxid || ""
        this.ForwardStore.doSearch(kefu_wxid)
    }
    render () {
        const { item, visible } = this.state
        const { data, hasMore, status, text } = this.ForwardStore
        return (
            <View style={styles.container}>
                <StatusBar
                    animated
                    barStyle="dark-content"
                    backgroundColor="#FFFFFF"
                />
                <Confirm
                    item={item}
                    visible={visible}
                    onCancel={this._closeModal}
                    onOk={this._onOk}
                />
                <SafeAreaView>
                    <Head _onCancel={this._onCancel} />
                </SafeAreaView>
                <View style={styles.content}>
                    <List
                        data={data}
                        hasMore={hasMore}
                        _loadMore={this._loadMore}
                        _onPress={this._onPress}
                        status={status}
                        _changeText={this._changeText}
                        text={text}
                        _search={this._search}
                    />
                </View>
            </View>
        )
    }
}
export default Forward
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        backgroundColor: colors.bg,
    },
})
