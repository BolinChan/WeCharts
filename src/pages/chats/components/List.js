import React, { Component } from "react"
import { FlatList } from "react-native"
import Item from "./Item"
import Empty from "./Empty"
import Footer from "./Footer"
import Header from "./Header"
import { observer } from "mobx-react"
const ITEM_HEIGHT = 82
@observer
class List extends Component {
    componentDidMount () {
        this.props._scrollToTop(this._scrollToTop)
    }
    _scrollToTop = () => {
        this._flatList.scrollToOffset({ offset: 0, animated: true })
    }
    _item = ({ item }) => {
        const { wechatsCurrent, wechatsData, _onPress } = this.props
        return (
            <Item
                item={item}
                wechatsCurrent={wechatsCurrent}
                wechatsData={wechatsData}
                _onPress={_onPress}
            />
        )
    }
    _empty = () => <Empty hasMore={this.props.hasMore} />
    _footer = () => <Footer hasMore={this.props.hasMore} />
    _header = () => <Header data={this.props.data} _onSearch={this.props._onSearch} />
    _getItemLayout = (data, index) => ({ length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index })
    _keyExtractor = (item) => `${item.userid}`
    render () {
        let { data, _onEndReached, _onRefresh, refreshing } = this.props
        return (
            <FlatList
                ref={(flatList) => this._flatList = flatList}
                renderItem={this._item}
                data={data}
                ListEmptyComponent={this._empty}
                ListFooterComponent={this._footer}
                ListHeaderComponent={this._header}
                getItemLayout={this._getItemLayout}
                initialNumToRender={15}
                keyExtractor={this._keyExtractor}
                onEndReached={_onEndReached}
                onEndReachedThreshold={0.3}
                onRefresh={_onRefresh}
                refreshing={refreshing}
                removeClippedSubviews
            />
        )
    }
}
export default List
