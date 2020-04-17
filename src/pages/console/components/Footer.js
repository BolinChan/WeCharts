import React, { Component } from "react"
import { View } from "react-native"
import { colors } from "../../../layout/layout"
import Button from "../../../components/Button"
import { observer } from "mobx-react"
@observer
class Footer extends Component {
    render () {
        const { init, hasMore, recording, _fetchRecord } = this.props
        if (init && hasMore) {
            return (
                <View style={{ padding: pad, alignItems: "center" }}>
                    <Button
                        _onPress={_fetchRecord}
                        title="查看更多"
                        loading={recording}
                        icon="ios-time"
                        iconColor={colors.bg}
                        textStyles={{ color: colors.bg }}
                        btnStyles={{ backgroundColor: colors.mediumLightGray }}
                    />
                </View>
            )
        }
        return null
    }
}
export default Footer
const pad = 8
