import React, { Component } from "react"
import { SafeAreaView, View, StyleSheet } from "react-native"
import List from "./components/List"
import { colors } from "../../layout/layout"
import { observer, inject } from "mobx-react"
@inject("rootStore")
@observer
class DrawerContent extends Component {
    constructor (props) {
        super(props)
        const { AuthStore } = this.props.rootStore
        this.AuthStore = AuthStore
    }
    _onPress = (value) => {
        this.props.navigation.closeDrawer()
        this.AuthStore.upWechatsAct(value)
    }
    render () {
        const { sections, wechatsCurrent, unread, allUnread } = this.AuthStore
        return (
            <SafeAreaView style={styles.custom}>
                <View style={styles.container}>
                    <List
                        sections={sections}
                        current={wechatsCurrent}
                        unread={unread}
                        allUnread={allUnread}
                        _onPress={this._onPress}
                    />
                </View>
            </SafeAreaView>
        )
    }
}
export default DrawerContent
const styles = StyleSheet.create({
    custom: {
        flex: 1,
        backgroundColor: colors.navBg,
    },
    container: {
        flex: 1,
    },
})
