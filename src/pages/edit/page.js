import React, { Component } from "react"
import {
    SafeAreaView,
    StatusBar,
    View,
    TouchableOpacity,
    ScrollView,
    Text,
    TextInput,
    StyleSheet,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { colors } from "../../layout/layout"
import Button from "../../components/Button"
import { observer, inject } from "mobx-react"
@inject("rootStore")
@observer
class Edit extends Component {
    constructor (props) {
        super(props)
        const { AuthStore } = this.props.rootStore
        this.AuthStore = AuthStore
        const { chatsAct } = this.AuthStore
        this.state = {
            remark: chatsAct.remark,
            phone: chatsAct.phone,
        }
    }
    _cancel = () => {
        this.props.navigation.goBack()
    }
    _done = () => {
        const { remark, phone } = this.state
        const { chatsAct } = this.AuthStore
        if (chatsAct.remark !== remark) {
            this.AuthStore.upRemark(remark)
        }
        if (chatsAct.phone !== phone) {
            this.AuthStore.upPhone(phone)
        }
        this._cancel()
    }
    _changeReamrk = (e) => {
        this.setState({ remark: e })
    }
    _changePhone = (e) => {
        this.setState({ phone: e })
    }
    _next = () => {
        this.refs.phoneIpt.focus()
    }
    render () {
        const { chatsAct } = this.AuthStore
        const { remark, phone } = this.state
        const disabled = chatsAct.remark === remark && chatsAct.phone === phone
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar
                    animated
                    barStyle="dark-content"
                    backgroundColor={colors.bg}
                />
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
                <ScrollView style={styles.custom}>
                    <View style={styles.item}>
                        <Text style={styles.label}>备注名</Text>
                        <View style={styles.iptItem}>
                            <TextInput
                                ref="remarkIpt"
                                style={styles.ipt}
                                allowFontScaling={false}
                                autoCorrect={false}
                                defaultValue={remark}
                                onChangeText={this._changeReamrk}
                                onSubmitEditing={this._next}
                                returnKeyType="next"
                                placeholder="添加备注名"
                                placeholderTextColor={colors.desc}
                            />
                            {
                                remark
                                    ? <View style={styles.extra}>
                                        <Ionicons
                                            name="ios-close-circle"
                                            size={iconSize}
                                            color={colors.desc}
                                            style={styles.extraIcon}
                                            onPress={() => this._changeReamrk("")}
                                        />
                                    </View>
                                    : null
                            }
                        </View>
                    </View>
                    <View style={styles.item}>
                        <Text style={styles.label}>手机号码</Text>
                        <View style={styles.iptItem}>
                            <TextInput
                                ref="phoneIpt"
                                style={styles.ipt}
                                allowFontScaling={false}
                                autoCorrect={false}
                                defaultValue={phone}
                                keyboardType="numeric"
                                maxLength={11}
                                onChangeText={this._changePhone}
                                placeholder="添加手机号码"
                                placeholderTextColor={colors.desc}
                            />
                            {
                                phone
                                    ? <View style={styles.extra}>
                                        <Ionicons
                                            name="ios-close-circle"
                                            size={iconSize}
                                            color={colors.desc}
                                            style={styles.extraIcon}
                                            onPress={() => this._changePhone("")}
                                        />
                                    </View>
                                    : null
                            }
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}
export default Edit
const pad = 16
const iconSize = 16
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
    custom: {
        flex: 1,
        paddingHorizontal: pad,
    },
    item: {
        paddingVertical: pad,
    },
    label: {
        fontSize: 17,
        color: colors.desc,
    },
    iptItem: {
        height: 54,
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: colors.bor,
    },
    ipt: {
        flex: 1,
        height: "100%",
        fontSize: 17,
    },
    extra: {
        flexDirection: "row",
        alignItems: "center",
    },
    extraIcon: {
        marginLeft: pad,
    },
})
