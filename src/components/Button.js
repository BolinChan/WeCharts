import React, { Component } from "react"
import {
    TouchableOpacity,
    View,
    ActivityIndicator,
    Text,
    StyleSheet,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { colors } from "../layout/layout"
import { observer } from "mobx-react"
@observer
class Button extends Component {
    render () {
        const {
            _onPress,
            title,
            loading,
            disabled,
            containerStyles,
            btnStyles,
            textStyles,
            icon,
            iconColor = "#FFFFFF",
        } = this.props
        return (
            <TouchableOpacity
                style={containerStyles}
                onPress={_onPress}
                disabled={disabled}
            >
                <View
                    style={[styles.container, btnStyles, { opacity: disabled ? 0.6 : 1 }]}
                >
                    {loading
                        ? <View style={{ marginRight: 4 }}>
                            <ActivityIndicator
                                color={iconColor}
                                size="small"
                            />
                        </View>
                        : icon
                            ? <View style={{ marginRight: 4 }}>
                                <Ionicons
                                    name={icon}
                                    color={iconColor}
                                    size={iconSize}
                                />
                            </View>
                            : null
                    }
                    <Text style={[styles.title, textStyles]}>{title}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}
export default Button
const pad = 16
const iconSize = 16
const styles = StyleSheet.create({
    container: {
        height: 34,
        backgroundColor: colors.act,
        paddingHorizontal: pad,
        borderRadius: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 14,
        color: "#FFFFFF",
        textAlign: "center",
        includeFontPadding: false,
        textAlignVertical: "center",
    },
})
