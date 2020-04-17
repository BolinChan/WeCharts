import React, { Component } from "react"
import { SafeAreaView } from "react-native"
import { observer } from "mobx-react"
@observer
class Footer extends Component {
    render () {
        const { status, data } = this.props
        if (status === "done" && data.length > 0) {
            return <SafeAreaView />
        }
        return null
    }
}
export default Footer
