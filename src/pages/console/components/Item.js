import React, { Component } from "react"
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
} from "react-native"
import Avatar from "../../../components/Avatar"
import { Ionicons } from "@expo/vector-icons"

import TextMsg from "./Msgs/TextMsg"
import ImgMsg from "./Msgs/ImgMsg"
import VoiceMsg from "./Msgs/VoiceMsg"
import VideoMsg from "./Msgs/VideoMsg"
import SystemMsg from "./Msgs/SystemMsg"
import UrlMsg from "./Msgs/UrlMsg"
import AppMsg from "./Msgs/AppMsg"
import CardMsg from "./Msgs/CardMsg"
import RedPacketMsg from "./Msgs/RedPacketMsg"
import TransferMsg from "./Msgs/TransferMsg"
import UnknownMsg from "./Msgs/UnknownMsg"

import { colors } from "../../../layout/layout"
import { observer } from "mobx-react"
import dayjs from "dayjs"
const jsonTypes = ["6", "7", "8", "9"]
@observer
class Item extends Component {
    _msg = (isMine) => {
        let { item, funcs, current, isPlaying } = this.props

        let re = null
        let { type } = item
        if (jsonTypes.findIndex((item) => item === type) !== -1) {
            try {
                item.text = item.text ? JSON.parse(item.text) : ""
            } catch (err) {
                type = "0"
            }
        }
        const props = { isMine, item, funcs, current, isPlaying }
        switch (type) {
            case "1":
                re = <TextMsg {...props} />
                break
            case "2":
                re = <ImgMsg {...props} />
                break
            case "3":
                re = <VoiceMsg {...props} />
                break
            case "4":
                re = <VideoMsg {...props} />
                break
            case "5":
                re = <SystemMsg {...props} />
                break
            case "6":
                re = <UrlMsg {...props} />
                break
            case "7":
                re = <AppMsg {...props} />
                break
            case "9":
                re = <CardMsg {...props} />
                break
            case "11":
                re = <RedPacketMsg />
                break
            case "12":
                re = <TransferMsg />
                break
            default:
                re = <UnknownMsg />
                break
        }
        return re
    }
    render () {
        const { item, _info } = this.props
        let { status, headImg, addtime, type, msgStatus } = item
        addtime = dayjs(addtime).format("YY/MM/DD HH:mm")
        const isMine = status === "0"
        const flexDirection = isMine ? "row-reverse" : "row"
        const justifyContent = type === "5" ? "center" : "flex-start"
        return (
            <View
                style={[
                    styles.container,
                    { flexDirection },
                    { justifyContent },
                ]}
            >
                {
                    type !== "5"
                        ? <TouchableOpacity
                            style={styles.thumb}
                            activeOpacity={1}
                            onPress={isMine ? null : _info}
                        >
                            <Avatar uri={headImg} size="small" />
                        </TouchableOpacity>
                        : null
                }
                <View>
                    {this._msg(isMine)}
                    {type !== "5"
                        ? <View style={[styles.timeContainer, { flexDirection }]}>
                            <Text style={styles.time}>{addtime}</Text>
                        </View>
                        : null
                    }
                    {isMine && msgStatus === "error"
                        ? <View style={styles.status}>
                            <Ionicons
                                size={16}
                                name="ios-information-circle"
                                color={colors.red}
                            />
                        </View>
                        : null
                    }
                </View>
            </View>
        )
    }
}
export default Item
const pad = 8
const styles = StyleSheet.create({
    container: {
        padding: pad,
        overflow: "hidden",
    },
    thumb: {
        marginHorizontal: pad,
    },
    timeContainer: {
        paddingTop: pad / 2,
        paddingHorizontal: pad,
    },
    time: {
        fontSize: 12,
        color: colors.desc,
    },
    status: {
        position: "absolute",
        bottom: 18,
        left: -20,
    },
})
