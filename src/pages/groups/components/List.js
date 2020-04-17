import React, { Component } from "react"
import { FlatList } from "react-native"
import Item from "./Item"
import Empty from "./Empty"
import Header from "./Header"
import { observer } from "mobx-react"
const ITEM_HEIGHT = 54
@observer
class List extends Component {
    componentDidMount () {
        this.props._scrollToTop(this._scrollToTop)
    }
    _scrollToTop = () => {
        this._flatList.scrollToOffset({ offset: 0, animated: true })
    }
    _item = ({ item }) => <Item item={item} _onPress={this.props._onPress} />
    _empty = () => <Empty init={this.props.init} />
    _header = () => <Header data={this.props.data} _onSearch={this.props._onSearch} />
    _getItemLayout = (data, index) => ({ length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index })
    _keyExtractor = (item) => `${item.id}`
    render () {
        const { data, refreshing, _onRefresh } = this.props
        return (
            <FlatList
                ref={(flatList) => this._flatList = flatList}
                renderItem={this._item}
                data={data}
                ListEmptyComponent={this._empty}
                ListHeaderComponent={this._header}
                getItemLayout={this._getItemLayout}
                initialNumToRender={15}
                keyExtractor={this._keyExtractor}
                onRefresh={_onRefresh}
                refreshing={refreshing}
                removeClippedSubviews
            />
        )
    }
}
export default List
