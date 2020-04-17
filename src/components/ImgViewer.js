import React, { Component } from "react"
import { Modal, SafeAreaView, Text, ActivityIndicator, StyleSheet } from "react-native"
import ImageViewer from "react-native-image-zoom-viewer"
import Button from "./Button"
import Toast from "./Toast"
import { observer, inject } from "mobx-react"
import { saveToCamera } from "../utils/Utils"
const IDP = require("../assets/idp.png")
@inject("rootStore")
@observer
class ImgViewer extends Component {
    constructor (props) {
        super(props)
        const { ToastStore } = this.props.rootStore
        this.ToastStore = ToastStore
        this.state = { show: true, loading: false }
    }
    _onClick = () => this.setState({ show: !this.state.show })
    _indicator = (index, size) => {
        let re = null
        if (this.state.show) {
            re = (
                <SafeAreaView style={styles.indicator}>
                    <Text style={styles.title}>
                        {index} / {size}
                    </Text>
                </SafeAreaView>
            )
        }
        return re
    }
    _footer = (index) => {
        let re = null
        const { show, loading } = this.state
        if (show) {
            re = (
                <Button
                    title="保存到相册"
                    icon="ios-cloud-download"
                    loading={loading}
                    _onPress={this.downLoad(index)}
                />
            )
        }
        return re
    }
    downLoad = (index) => async () => {
        const url = this.props.imageUrls[index].url
        this.setState({ loading: true })
        const { error, msg } = await saveToCamera(url)
        this.setState({ loading: false })
        if (error) {
            this.ToastStore.error(msg, "")
        } else {
            this.ToastStore.success(msg, "")
        }
    }
    _loading = () => <ActivityIndicator size="large" color="#FFFFFF" />
    _cancel = () => {
        this.setState({ show: true, loading: false })
        this.props._close()
    }
    render () {
        const { visible, imageUrls, index, _onChange } = this.props
        return (
            <Modal
                visible={visible}
                onRequestClose={this._cancel}
                animationType="fade"
                hardwareAccelerated
            >
                <Toast>
                    <ImageViewer
                        imageUrls={imageUrls}
                        failImageSource={IDP}
                        saveToLocalByLongPress={false}
                        style={styles.container}
                        enableSwipeDown
                        swipeDownThreshold={80}
                        onClick={this._onClick}
                        renderFooter={this._footer}
                        footerContainerStyle={styles.footer}
                        renderIndicator={this._indicator}
                        onCancel={this._cancel}
                        loadingRender={this._loading}
                        onChange={_onChange}
                        index={index}
                    />
                </Toast>
            </Modal>
        )
    }
}
export default ImgViewer
const pad = 16
const styles = StyleSheet.create({
    container: {
        backgroundColor: "#000000",
        position: "relative",
    },
    indicator: {
        position: "absolute",
        width: "100%",
        flexDirection: "row",
        justifyContent: "center",
        top: pad,
    },
    title: {
        fontSize: 17,
        color: "#FFFFFF",
    },
    footer: {
        position: "absolute",
        width: "100%",
        flexDirection: "row",
        justifyContent: "center",
        bottom: 64,
    },
})
