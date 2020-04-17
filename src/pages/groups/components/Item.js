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
        _onPress({ ...item })
    }
    render () {
        const { item } = this.props
        return (
            <TouchableHighlight onPress={this._onPress}>
                <View style={styles.container}>
                    <View style={styles.content}>
                        <Text style={styles.title} numberOfLines={1}>
                            {`${item.fenzu_name} `}
                        </Text>
                        <Text style={styles.desc}>
                            ({item.number})
                        </Text>
                    </View>
                    <Ionicons
                        name="ios-arrow-forward"
                        size={iconSize}
                        color={colors.desc}
                    />
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
        backgroundColor: "#FFFFFF",
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
    desc: {
        fontSize: 14,
        color: colors.desc,
    },
})
