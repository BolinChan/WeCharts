import React, { Component } from "react"
import { TouchableOpacity, View, Text, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { colors } from "../../../layout/layout"
import { observer } from "mobx-react"
@observer
class Search extends Component {
    render () {
        const { data, _onSearch } = this.props
        let visible = false
        if (data && data.length > 0) {
            visible = true
        }
        if (!visible) {
            return null
        }
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    activeOpacity={1}
                    style={styles.search}
                    onPress={_onSearch}
                >
                    <Ionicons
                        size={iconSize}
                        name="ios-search"
                        color={colors.desc}
                        style={{ marginRight: pad / 2 }}
                    />
                    <Text style={styles.title}>搜索</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
export default Search
const iconSize = 16
const pad = 16
const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFFFFF",
        paddingHorizontal: pad,
        paddingVertical: 10,
    },
    search: {
        height: 34,
        backgroundColor: colors.bg,
        borderRadius: 20,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: pad,
    },
    title: {
        fontSize: 17,
        color: colors.desc,
    },
})
