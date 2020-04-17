import React, { Component } from "react"
import { View, TextInput, ActivityIndicator, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { colors } from "../../../layout/layout"
import { observer } from "mobx-react"
@observer
class Header extends Component {
    _clear = () => {
        this.props._changeText("")
    }
    render () {
        const { _changeText, text, _search, status } = this.props
        return (
            <View style={styles.container}>
                <View style={styles.search}>
                    <Ionicons
                        size={iconSize}
                        name="ios-search"
                        color={colors.desc}
                        style={{ marginRight: pad / 2 }}
                    />
                    <TextInput
                        allowFontScaling={false}
                        autoCorrect={false}
                        onChangeText={_changeText}
                        onSubmitEditing={_search}
                        returnKeyType="search"
                        style={styles.ipt}
                        placeholder="搜索"
                        placeholderTextColor={colors.desc}
                        value={text}
                    />
                    {status === "pending"
                        ? <ActivityIndicator
                            size="small"
                            style={{ marginLeft: pad / 2 }}
                        />
                        : text
                            ? <Ionicons
                                size={iconSize}
                                name="ios-close-circle"
                                color={colors.desc}
                                style={{ marginLeft: pad / 2 }}
                                onPress={this._clear}
                            />
                            : null
                    }
                </View>
            </View>
        )
    }
}
export default Header
const iconSize = 16
const pad = 16
const styles = StyleSheet.create({
    container: {
        height: 54,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        paddingHorizontal: pad,
    },
    search: {
        flex: 1,
        height: 34,
        backgroundColor: colors.bg,
        borderRadius: 20,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: pad,
    },
    ipt: {
        fontSize: 17,
        flex: 1,
    },
    btn: {
        height: "100%",
        paddingHorizontal: pad,
        flexDirection: "row",
        alignItems: "center",
    },
    cancel: {
        fontSize: 17,
        color: colors.act,
    },
})
