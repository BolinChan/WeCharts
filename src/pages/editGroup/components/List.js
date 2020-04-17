import React, { Component } from "react"
import { FlatList, SafeAreaView, StyleSheet } from "react-native"
import Item from "./Item"
import Separator from "../../../components/Separator"
import { observer } from "mobx-react"
const ITEM_HEIGHT = 54
const LINE_HEIGHT = StyleSheet.hairlineWidth
@observer
class List extends Component {
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
    _separator = () => <Separator lineStyle={{ marginLeft: 16 }} />
    _footer= () => <SafeAreaView />
    _getItemLayout = (data, index) => ({ length: ITEM_HEIGHT, offset: (ITEM_HEIGHT + LINE_HEIGHT) * index, index })
    _keyExtractor = (item) => `${item.id}`
    render () {
        const { data, current } = this.props
        return (
            <FlatList
                renderItem={this._item}
                data={data}
                extraData={current}
                ItemSeparatorComponent={this._separator}
                ListFooterComponent={this._footer}
                getItemLayout={this._getItemLayout}
                initialNumToRender={15}
                keyExtractor={this._keyExtractor}
                removeClippedSubviews
            />
        )
    }
}
export default List
