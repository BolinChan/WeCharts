import React, { Component } from "react"
import { View, StyleSheet } from "react-native"
import { observer } from "mobx-react"
import { colors } from "../layout/layout"
const HEIGHT = StyleSheet.hairlineWidth
@observer
class Separator extends Component {
    render () {
        const { containerStyle, lineStyle } = this.props
        return (
            <View style={[styles.container, containerStyle]}>
                <View style={[styles.line, lineStyle]} />
            </View>
        )
    }
}
export default Separator
const styles = StyleSheet.create({
    container: {
        height: HEIGHT,
        backgroundColor: "transparent",
    },
    line: {
        flex: 1,
        backgroundColor: colors.bor,
        marginLeft: 82,
    },
})
