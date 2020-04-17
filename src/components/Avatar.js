import React, { Component } from "react"
import { View, Image, StyleSheet } from "react-native"
import { observer } from "mobx-react"
const DEFAULT = require("../assets/logo.png")
@observer
class Avatar extends Component {
    render () {
        let { size = "medium", uri } = this.props
        const wh = sizes[size] || size
        if (uri && typeof uri === "string") {
            uri = uri.slice(0, 2) === "//" ? `http:${uri}` : uri
        }
        return (
            <View style={{
                ...styles.container,
                borderRadius: wh / 2,
            }}>
                <Image
                    style={{
                        width: wh,
                        height: wh,
                        borderRadius: wh / 2,
                        overflow: "hidden",
                    }}
                    resizeMode="cover"
                    source={uri ? { uri } : DEFAULT}
                />
            </View>
        )
    }
}
export default Avatar
const sizes = { mini: 34, small: 44, medium: 50 }
const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFFFFF",
        shadowColor: "#000000",
        shadowOffset: { height: 4, width: 0 },
        shadowRadius: 4,
        shadowOpacity: 0.12,
    },
})
