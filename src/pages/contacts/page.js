import React, { Component } from "react"
import { InteractionManager, StatusBar, View, StyleSheet } from "react-native"
import HeaderTitle from "./components/HeaderTitle"
import List from "./components/List"
import { colors } from "../../layout/layout"
import { observer, inject } from "mobx-react"
@inject("rootStore")
@observer
class Contacts extends Component {
    static navigationOptions = ({
        headerTitle: <HeaderTitle />,
    })
    constructor (props) {
        super(props)
        const { AuthStore, ContactStore } = this.props.rootStore
        this.AuthStore = AuthStore
        this.ContactStore = ContactStore
    }
    componentDidMount () {
        this.ContactStore.initContactsByGroup(this.AuthStore.groupsCurrent)
    }
    componentWillUnmount () {
        InteractionManager.runAfterInteractions(() => {
            this.ContactStore.reset()
        })
    }
    _onPress = (value) => {
        this.AuthStore.upChatsAct(value)
        this.props.navigation.navigate("Info")
    }
    _onEndReached = () => {
        this.ContactStore.loadMoreByGroup(this.AuthStore.groupsCurrent)
    }
    _onRefresh = () => {
        this.ContactStore.refreshByGroup(this.AuthStore.groupsCurrent)
    }
    render () {
        const { data, hasMore, refreshing } = this.ContactStore
        const { wechatsCurrent, wechatsData } = this.AuthStore
        return (
            <View style={styles.container}>
                <StatusBar
                    animated
                    barStyle="dark-content"
                    backgroundColor={colors.navBg}
                />
                <List
                    data={data}
                    hasMore={hasMore}
                    _onPress={this._onPress}
                    _onEndReached={this._onEndReached}
                    _onRefresh={this._onRefresh}
                    refreshing={refreshing}
                    wechatsCurrent={wechatsCurrent}
                    wechatsData={wechatsData}
                />
            </View>
        )
    }
}
export default Contacts
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.bg,
    },
})
