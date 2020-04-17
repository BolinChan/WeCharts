import React, { Component } from "react"
import {
    SafeAreaView,
    StatusBar,
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
} from "react-native"
import { colors } from "../../layout/layout"
import Button from "../../components/Button"
import List from "./components/List"
import { observer, inject } from "mobx-react"
@inject("rootStore")
@observer
class EditGroup extends Component {
    constructor (props) {
        super(props)
        const { AuthStore, GroupStore } = this.props.rootStore
        this.AuthStore = AuthStore
        this.GroupStore = GroupStore
        const { chatsAct } = this.AuthStore
        this.state = { fid: chatsAct.fid }
    }
    _cancel = () => {
        this.props.navigation.goBack()
    }
    _done = () => {
        const { fid } = this.state
        this.AuthStore.setGroup(fid)
        this._cancel()
    }
    _onPress = (fid) => {
        this.setState({ fid })
    }
    render () {
        const { chatsAct } = this.AuthStore
        const { data } = this.GroupStore
        const { fid } = this.state
        const disabled = chatsAct.fid === fid
        return (
            <View style={styles.container}>
                <StatusBar
                    animated
                    barStyle="dark-content"
                    backgroundColor={colors.bg}
                />
                <SafeAreaView />
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={this._cancel}
                        style={styles.headerBtn}
                    >
                        <Text style={styles.cancel}>取消</Text>
                    </TouchableOpacity>
                    <Button
                        disabled={disabled}
                        _onPress={this._done}
                        containerStyles={styles.headerBtn}
                        title="完成"
                    />
                </View>
                <List
                    data={data}
                    current={fid}
                    _onPress={this._onPress}
                />
            </View>
        )
    }
}
export default EditGroup
const pad = 16
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.bg,
    },
    header: {
        height: 54,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    headerBtn: {
        height: "100%",
        paddingHorizontal: pad,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    cancel: {
        fontSize: 17,
    },
})
