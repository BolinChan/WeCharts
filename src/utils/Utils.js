import { Platform, CameraRoll } from "react-native"
import { Permissions, FileSystem, ImagePicker } from "expo"
import Storage from "./Storage"

const isIOS = Platform.OS === "ios"
const imgTypes = ["jpg", "png", "gif"]


export const checkPermission = async (permission) => {
    let re = true
    let res = await Permissions.getAsync(permission)
    if (res.status !== "granted") {
        res = await Permissions.askAsync(permission)
        if (res.status !== "granted") {
            re = false
        }
    }
    return re
}

const getImgName = (url) => {
    let re = false
    if (url && url.indexOf("/") !== -1) {
        re = url.substring(url.lastIndexOf("/") + 1)
        if (re.indexOf(".") !== -1) {
            const suffix = re.substring(re.lastIndexOf(".") + 1)
            if (imgTypes.findIndex((item) => item.toUpperCase() === suffix.toUpperCase()) === -1) {
                re = `${re}.jpg`
            }
        } else {
            re = `${re}.jpg`
        }
    }
    return re
}

const getFileName = (url) => {
    let re = url
    if (url && url.indexOf("/") !== -1) {
        re = url.substring(url.lastIndexOf("/") + 1)
    }
    return re
}

export const saveToCamera = async (url) => {
    let re = { error: true, msg: "文件错误" }
    if (url) {
        const fileName = getImgName(url)
        if (fileName) {
            const res = await checkPermission(Permissions.CAMERA_ROLL)
            if (res) {
                if (!isIOS) {
                    const DownloadResumable = FileSystem.createDownloadResumable(
                        url,
                        `${FileSystem.documentDirectory}${fileName}`
                    )
                    const { status, uri } = await DownloadResumable.downloadAsync()
                    if (status !== 200) {
                        url = ""
                    } else {
                        url = uri
                    }
                }
                if (url) {
                    const res = await CameraRoll.saveToCameraRoll(url)
                    if (!res) {
                        re.msg = "保存失败"
                    } else {
                        re = { error: false, msg: "保存成功" }
                    }
                } else {
                    re.msg = "下载失败，请检查网络"
                }
            } else {
                re.msg = "没有权限，请前往设置开启"
            }
        } else {
            re.msg = "文件错误"
        }
    }
    return re
}

export const takePhoto = async () => {
    let res = { error: true, msg: "没有权限，请前往设置开启" }
    let permission = await checkPermission(Permissions.CAMERA)
    permission = await checkPermission(Permissions.CAMERA_ROLL)
    if (permission) {
        res = await ImagePicker.launchCameraAsync({
            allowsEditing: false,
            quality: 0.8,
            base64: false,
            exif: false,
        })
        res.error = false
    }
    return res
}

export const pickPhoto = async () => {
    let res = { error: true, msg: "没有权限，请前往设置开启" }
    let permission = await checkPermission(Permissions.CAMERA)
    permission = await checkPermission(Permissions.CAMERA_ROLL)
    if (permission) {
        res = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: "Images",
            allowsEditing: false,
            quality: 0.8,
            base64: false,
            exif: false,
        })
        res.error = false
    }
    return res
}

export const uploadImage = async (uri) => {
    let re = { error: true, msg: "上传失败" }
    const token = await Storage.get("token") || ""
    if (token) {
        const file = {
            uri,
            type: "multipart/form-data",
            name: getImgName(uri),
        }
        let formData = new FormData()
        formData.append("type", "image")
        formData.append("file", file)
        const url = "http://wechat.yunbeisoft.com/index_test.php/home/fileupload/upload_msg"
        try {
            const data = await fetch(url, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "multipart/form-data",
                    "Authorization": token,
                },
                body: formData,
            })
            if (data.ok) {
                re = JSON.parse(data._bodyText || data._bodyInit)
            } else {
                re.msg = `${data.status}:${data.statusText}`
            }
        } catch (err) {
            re = err
        }
    }
    return re
}

export const uploadVoice = async (uri) => {
    let re = { error: true, msg: "上传失败" }
    const token = await Storage.get("token") || ""
    if (token) {
        const file = {
            uri,
            type: "multipart/form-data",
            name: getFileName(uri),
        }
        let formData = new FormData()
        formData.append("type", "audio")
        formData.append("file", file)
        const url = "http://wechat.yunbeisoft.com/index_test.php/home/fileupload/upload_m4a"
        try {
            const data = await fetch(url, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "multipart/form-data",
                    "Authorization": token,
                },
                body: formData,
            })
            if (data.ok) {
                re = JSON.parse(data._bodyText || data._bodyInit)
            } else {
                re.msg = `${data.status}:${data.statusText}`
            }
        } catch (err) {
            re = err
        }
    }
    return re
}
