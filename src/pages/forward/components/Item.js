import React, { Component } from "react"
import { TouchableHighlight, View, Text, StyleSheet } from "react-native"
import Avatar from "../../../components/Avatar"
import { colors } from "../../../layout/layout"
import { observer } from "mobx-react"
@observer
class Item extends Component {
    _onPress = () => {
        const { item, _onPress } = this.props
        _onPress({ ...item })
    }
    render () {
        const { item } = this.props
        return (
            <TouchableHighlight onPressOut={this._onPress}>
                <View style={styles.container}>
                    <View style={styles.thumb}>
                        <Avatar uri={item.headImg} size="small" />
                    </View>
                    <View style={styles.content}>
                        <Text style={styles.title} numberOfLines={1}>
                            {item.nick || ""}
                        </Text>
                        <Text style={styles.desc} numberOfLines={1}>
                            {item.remark || ""}
                        </Text>
                    </View>
                </View>
            </TouchableHighlight>
        )
    }
}
export default Item
const pad = 16
const styles = StyleSheet.create({
    container: {
        height: 64,
        paddingVertical: 10,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
    },
    thumb: {
        paddingHorizontal: pad,
    },
    content: {
        height: "100%",
        flex: 1,
        justifyContent: "space-around",
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
