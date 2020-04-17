import React, { Component } from "react"
import { SafeAreaView, StatusBar, StyleSheet } from "react-native"
import List from "./components/List"
import { colors } from "../../layout/layout"
import { observer, inject } from "mobx-react"
import { reaction } from "mobx"
@inject("rootStore")
@observer
class Groups extends Component {
    static navigationOptions = ({
        tabBarOnPress: ({ navigation, defaultHandler }) => {
            if (navigation.isFocused()) {
                navigation.state.params.groupsToTop()
            } else {
                defaultHandler()
            }
        },
    })
    constructor (props) {
        super(props)
        const { AuthStore, GroupStore } = this.props.rootStore
        this.AuthStore = AuthStore
        this.GroupStore = GroupStore
        reaction(() => this.AuthStore.wechatsCurrent, (wechatsCurrent) => {
            this.GroupStore.initGroups(wechatsCurrent)
        })
    }
    componentDidMount () {
        this.props.navigation.setParams({ groupsToTop: () => {this.scrollToTop()} })
    }
    _scrollToTop = (func) => {
        this.scrollToTop = func
    }
    _onPress = (value) => {
        this.AuthStore.upGroupsAct(value)
        this.props.navigation.navigate("Contacts")
    }
    _onRefresh = () => {
        this.GroupStore.refresh(this.AuthStore.wechatsCurrent)
    }
    _onSearch = () => {
        this.props.navigation.navigate("Search", { index: "groups" })
    }
    render () {
        const { init, data, refreshing } = this.GroupStore
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar
                    animated
                    barStyle="dark-content"
                    backgroundColor={colors.navBg}
                />
                <List
                    init={init}
                    data={data}
                    _onPress={this._onPress}
                    _onRefresh={this._onRefresh}
                    refreshing={refreshing}
                    _scrollToTop={this._scrollToTop}
                    _onSearch={this._onSearch}
                />
            </SafeAreaView>
        )
    }
}
export default Groups
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.bg,
    },
})
