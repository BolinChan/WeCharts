import React, { Component } from "react"
import { StatusBar, SafeAreaView, View, InteractionManager, StyleSheet } from "react-native"
import InputBar from "./components/InputBar"
import List from "./components/List"
import { colors } from "../../layout/layout"
import { observer, inject } from "mobx-react"
@inject("rootStore")
@observer
class Search extends Component {
    constructor (props) {
        super(props)
        const { AuthStore, SearchStore } = this.props.rootStore
        this.AuthStore = AuthStore
        this.SearchStore = SearchStore
    }
    _changeText = (text) => {
        this.SearchStore.changeText(text)
    }
    _onCancel = () => {
        this.props.navigation.goBack()
    }
    _search = () => {
        this.SearchStore.doSearch()
    }
    _onPress = (value) => {
        this.AuthStore.upChatsAct(value)
        const { navigation } = this.props
        const index = navigation.getParam("index")
        if (index === "chats") {
            navigation.navigate("Console")
        } else {
            navigation.navigate("Info")
        }
    }
    componentWillUnmount () {
        InteractionManager.runAfterInteractions(() => {
            this._changeText("")
        })
    }
    render () {
        const { status, text, data } = this.SearchStore
        return (
            <View style={styles.container}>
                <StatusBar
                    animated
                    barStyle="dark-content"
                    backgroundColor="#FFFFFF"
                />
                <SafeAreaView>
                    <InputBar
                        status={status}
                        text={text}
                        _changeText={this._changeText}
                        _onCancel={this._onCancel}
                        _search={this._search}
                    />
                </SafeAreaView>
                <View style={styles.content}>
                    <List
                        status={status}
                        data={data}
                        _onPress={this._onPress}
                    />
                </View>
            </View>
        )
    }
}
export default Search
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        backgroundColor: colors.bg,
    },
})
