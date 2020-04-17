import React, { Component } from "react"
import {
    TouchableHighlight,
    View,
    Text,
    StyleSheet,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { colors } from "../../../layout/layout"
import { observer } from "mobx-react"
@observer
class Item extends Component {
    _onPress = () => {
        const { _onPress, item } = this.props
        _onPress(item.id)
    }
    render () {
        const { item, current } = this.props
        return (
            <TouchableHighlight activeOpacity={1} onPress={this._onPress}>
                <View style={styles.container}>
                    <View style={styles.content}>
                        <Text style={styles.title} numberOfLines={1}>
                            {item.fenzu_name}
                        </Text>
                    </View>
                    {item.id === current
                        ? <Ionicons
                            name="ios-checkmark-circle"
                            size={iconSize}
                            color={colors.act}
                        />
                        : <Ionicons
                            name="ios-checkmark-circle-outline"
                            size={iconSize}
                            color={colors.desc}
                        />
                    }
                </View>
            </TouchableHighlight>
        )
    }
}
export default Item
const pad = 16
const iconSize = 16
const styles = StyleSheet.create({
    container: {
        height: 54,
        paddingHorizontal: pad,
        paddingVertical: 10,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.bg,
    },
    content: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        marginRight: pad,
    },
    title: {
        fontSize: 17,
    },
})
