import React, { Component } from "react"
import { FlatList, StyleSheet } from "react-native"
import Item from "./Item"
import Separator from "../../../components/Separator"
import Empty from "./Empty"
import Footer from "./Footer"
import { observer } from "mobx-react"
const ITEM_HEIGHT = 64
const LINE_HEIGHT = StyleSheet.hairlineWidth
@observer
class List extends Component {
    _item = ({ item }) => <Item item={item} _onPress={this.props._onPress} />
    _separator = () => (
        <Separator
            containerStyle={{ backgroundColor: "#FFFFFF" }}
            lineStyle={{ marginLeft: 76 }}
        />
    )
    _empty = () => <Empty status={this.props.status} />
    _footer = () => <Footer status={this.props.status} data={this.props.data} />
    _getItemLayout = (data, index) => ({
        length: ITEM_HEIGHT,
        offset: (ITEM_HEIGHT + LINE_HEIGHT) * index,
        index,
    })
    _keyExtractor = (item) => `${item.userid}`
    render () {
        const { data } = this.props
        return (
            <FlatList
                renderItem={this._item}
                data={data}
                ItemSeparatorComponent={this._separator}
                ListEmptyComponent={this._empty}
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
