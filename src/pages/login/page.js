import React, { Component } from "react"
import {
    StatusBar,
    TouchableWithoutFeedback,
    SafeAreaView,
    View,
    Image,
    KeyboardAvoidingView,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { observer, inject } from "mobx-react"
import { colors, customs } from "../../layout/layout"
@inject("rootStore")
@observer
class Login extends Component {
    constructor (props) {
        super(props)
        const { AuthStore } = this.props.rootStore
        this.AuthStore = AuthStore
        this.state = {
            user: "",
            pwd: "",
            checkPwd: false,
        }
    }
    _toBlur = () => {
        this.refs.userIpt.blur()
        this.refs.pwdIpt.blur()
        this.setState({ checkPwd: false })
    }
    _changeText = (value) => this.setState({ ...value })
    _check = () => this.setState({ checkPwd: !this.state.checkPwd })
    _onSubmit = (e, value) => {
        if (value === "next") {
            this.refs.userIpt.blur()
            this.refs.pwdIpt.focus()
        } else {
            const { user, pwd } = this.state
            if (user && pwd) {
                this._toBlur()
                this.AuthStore.login({ accountnum: user, password: pwd })
            }
        }
    }
    _checkPolicy = () => {
        this.props.navigation.navigate("Policy")
    }
    render () {
        const { user, pwd, checkPwd } = this.state
        return (
            <TouchableWithoutFeedback onPress={this._toBlur}>
                <SafeAreaView style={styles.custom}>
                    <View style={styles.container}>
                        <StatusBar
                            animated
                            barStyle="dark-content"
                            backgroundColor="#FFFFFF"
                        />
                        <View style={styles.header}>
                            <Image
                                resizeMode="contain"
                                source={require("../../assets/logo.png")}
                                style={styles.logo}
                                resizeMethod="scale"
                            />
                        </View>
                        <KeyboardAvoidingView
                            behavior="position"
                            contentContainerStyle={styles.content}
                        >
                            <View style={styles.iptItem}>
                                <View style={styles.label}>
                                    <Text style={styles.formSize}>帐号</Text>
                                </View>
                                <TextInput
                                    ref="userIpt"
                                    allowFontScaling={false}
                                    autoCorrect={false}
                                    enablesReturnKeyAutomatically
                                    onChangeText={(text) => this._changeText({ user: text })}
                                    onSubmitEditing={(e) => this._onSubmit(e, "next")}
                                    placeholder="子账号@主账号"
                                    placeholderTextColor={colors.desc}
                                    returnKeyType="next"
                                    textContentType="username"
                                    style={styles.ipt}
                                    value={user}
                                    autoFocus
                                />
                                {user
                                    ? <View style={styles.extra}>
                                        <Ionicons
                                            name="ios-close-circle"
                                            size={iconSize}
                                            color={colors.lightGray}
                                            style={styles.extraIcon}
                                            onPress={() => this._changeText({ user: "" })}
                                        />
                                    </View>
                                    : null
                                }
                            </View>
                            <View style={styles.iptItem}>
                                <View style={styles.label}>
                                    <Text style={styles.formSize}>密码</Text>
                                </View>
                                <TextInput
                                    ref="pwdIpt"
                                    allowFontScaling={false}
                                    autoCorrect={false}
                                    enablesReturnKeyAutomatically
                                    keyboardAppearance="dark"
                                    onChangeText={(text) => this._changeText({ pwd: text })}
                                    onSubmitEditing={(e) => this._onSubmit(e, "submit")}
                                    placeholder="请填写密码"
                                    placeholderTextColor={colors.desc}
                                    returnKeyType="go"
                                    secureTextEntry={!checkPwd}
                                    textContentType="password"
                                    style={styles.ipt}
                                    value={pwd}
                                />
                                {pwd
                                    ? <View style={styles.extra}>
                                        <Ionicons
                                            name={checkPwd ? "ios-eye" : "ios-eye-off"}
                                            size={iconSize}
                                            color={colors.lightGray}
                                            style={styles.extraIcon}
                                            onPress={this._check}
                                        />
                                        <Ionicons
                                            name="ios-close-circle"
                                            size={iconSize}
                                            color={colors.lightGray}
                                            style={styles.extraIcon}
                                            onPress={() => this._changeText({ pwd: "" })}
                                        />
                                    </View>
                                    : null}
                            </View>
                            <TouchableOpacity style={styles.btn} onPress={this._onSubmit}>
                                <Text style={styles.btnTitle}>登录</Text>
                            </TouchableOpacity>
                        </KeyboardAvoidingView>
                        <View style={styles.footer}>
                            <Text style={styles.footFont}>
                                登录即代表阅读并同意
                                <Text style={styles.footLink} onPress={this._checkPolicy}> 服务条款</Text>
                            </Text>
                        </View>
                    </View>
                </SafeAreaView>
            </TouchableWithoutFeedback>
        )
    }
}
export default Login
const pad = 16
const iconSize = 28
const styles = StyleSheet.create({
    custom: {
        flex: 1,
    },
    container: {
        flex: 1,
        paddingVertical: pad,
        paddingHorizontal: pad * 2,
    },
    header: {
        flex: 1,
        alignItems: "center",
    },
    logo: {
        width: 120,
        height: 120,
    },
    content: {
        height: customs.fullHeight / 3,
    },
    formSize: {
        fontSize: 17,
    },
    iptItem: {
        height: 56,
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: colors.bor,
    },
    label: {
        alignItems: "center",
        justifyContent: "center",
        paddingRight: 16,
    },
    ipt: {
        flex: 1,
        fontSize: 17,
    },
    extra: {
        flexDirection: "row",
        alignItems: "center",
    },
    extraIcon: {
        marginLeft: 16,
    },
    btn: {
        borderRadius: 10,
        height: 50,
        backgroundColor: colors.act,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 44,
    },
    btnTitle: {
        color: "#FFFFFF",
        fontSize: 17,
    },
    footer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "flex-end",
    },
    footFont: {
        fontSize: 14,
        color: colors.desc,
    },
    footLink: {
        color: colors.act,
    },
})
