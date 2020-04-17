import React, { Component } from "react"
import { View, FlatList } from "react-native"
import Item from "./Item"
import Header from "./Header"
import Footer from "./Footer"
import { observer } from "mobx-react"
@observer
class List extends Component {
    _item = ({ item }) => {
        const { _info, funcs, current, isPlaying } = this.props
        return (
            <Item
                item={item}
                _info={_info}
                funcs={funcs}
                current={current}
                isPlaying={isPlaying}
            />
        )
    }
    _keyExtractor = (item) => `${item.id}`
    render () {
        const { init, data, hasMore, recording, _fetchRecord } = this.props
        return (
            <View style={{ flex: 1 }}>
                <FlatList
                    contentContainerStyle={{ paddingBottom: pad }}
                    renderItem={this._item}
                    data={data}
                    initialNumToRender={15}
                    inverted
                    keyExtractor={this._keyExtractor}
                    removeClippedSubviews
                    extraData={{ init, recording }}
                    ListHeaderComponent={<Header init={init} />}
                    ListFooterComponent={
                        <Footer
                            init={init}
                            hasMore={hasMore}
                            recording={recording}
                            _fetchRecord={_fetchRecord}
                        />
                    }
                />
            </View>
        )
    }
}
export default List
const pad = 8
