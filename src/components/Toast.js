import React, { Component } from "react"
import { View, StyleSheet, Text, ActivityIndicator, Modal, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { BlurView } from "expo"
import { observer, inject } from "mobx-react"
@inject("rootStore")
@observer
class Toast extends Component {
    constructor (props) {
        super(props)
        const { AuthStore, ToastStore } = this.props.rootStore
        this.AuthStore = AuthStore
        this.ToastStore = ToastStore
        this.AuthStore.verify()
    }
    _onRequestClose = () => this.ToastStore.hidden()
    render () {
        const { isVisible, icon = "ActivityIndicator", msg } = this.ToastStore
        return (
            <View style={styles.custom}>
                {React.Children.only(this.props.children)}
                <Modal
                    visible={isVisible}
                    onRequestClose={this._onRequestClose}
                    transparent
                    animationType="fade"
                    hardwareAccelerated
                >
                    <TouchableOpacity
                        activeOpacity={1}
                        style={styles.container}
                        onPress={this._onRequestClose}
                    >
                        <BlurView
                            tint="dark"
                            intensity={100}
                            style={{ borderRadius: radius }}
                        >
                            <View style={styles.content}>
                                {icon
                                    ? icon === "ActivityIndicator"
                                        ? <ActivityIndicator size="large" color={iconColor} />
                                        : <Ionicons name={icon} color={iconColor} size={iconSize} />
                                    : null
                                }
                                {msg
                                    ? <Text style={styles.title} numberOfLines={1}>{msg}</Text>
                                    : null
                                }
                            </View>
                        </BlurView>
                    </TouchableOpacity>
                </Modal>
            </View>
        )
    }
}
export default Toast
const iconColor = "#FFFFFF"
const iconSize = 44
const pad = 16
const radius = 10
const styles = StyleSheet.create({
    custom: {
        flex: 1,
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    content: {
        backgroundColor: "rgba(0, 0, 0, 0.36)",
        padding: pad,
        borderRadius: radius,
        alignItems: "center",
        overflow: "hidden",
    },
    title: {
        color: iconColor,
        fontSize: 17,
    },
})
