import React, { Component } from "react"
import { SectionList, View, Text, StyleSheet } from "react-native"
import Item from "./Item"
import { observer } from "mobx-react"
import { colors } from "../../../layout/layout"
const ITEM_HEIGHT = 64
@observer
class List extends Component {
    _keyExtractor = (item, index) => `${item.wxid}`
    _item = ({ item }) => {
        const { current, _onPress } = this.props
        return (
            <Item
                item={item}
                current={current}
                _onPress={_onPress}
            />
        )
    }
    _sectionHeader = (info) => (
        <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle} numberOfLines={1}>
                {info.section.title}
            </Text>
        </View>
    )
    _getItemLayout = (data, index) => ({ length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index })
    render () {
        const { sections, current, unread, allUnread } = this.props
        return (
            <SectionList
                sections={sections}
                initialNumToRender={15}
                keyExtractor={this._keyExtractor}
                renderItem={this._item}
                extraData={{ current, unread, allUnread }}
                removeClippedSubviews
                renderSectionHeader={this._sectionHeader}
                stickySectionHeadersEnabled
                getItemLayout={this._getItemLayout}
            />
        )
    }
}
export default List
const styles = StyleSheet.create({
    sectionHeader: {
        height: 44,
        backgroundColor: colors.bg,
        justifyContent: "center",
        paddingHorizontal: 16,
    },
    sectionTitle: {
        fontSize: 17,
        fontWeight: "bold",
        color: colors.desc,
    },
})
