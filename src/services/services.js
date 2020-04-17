import request from "../utils/Request"
const home = "http://wechat.yunbeisoft.com/index_test.php/home"

export function verify (data) {
    return request(`${home}/ziaccount/yantoken`, data)
}

export function login (data) {
    return request(`${home}/ziaccount/login`, data)
}

export function fetchWechats (data) {
    return request(`${home}/api/get_device`, data)
}

export function fetchChats (data) {
    return request(`${home}/api/get_friends_new`, data)
}

export function pollUpdate (data) {
    return request(`${home}/Getmsg/get_msg_current`, data)
}

export function fetchMessages (data) {
    return request(`${home}/Collect/get_friend_msg`, data)
}

export function pollConsole (data) {
    return request(`${home}/Collect/get_friend_msg_new_current`, data)
}

export function update (data) {
    return request(`${home}/fileupload/upload_msg`, data)
}

export function setTop (data) {
    if (data.oldTop) {
        return request(`${home}/topping/delTop`, data)
    } else {
        return request(`${home}/topping/addTop`, data)
    }
}

export function setMute (data) {
    return request(`${home}/quns/ignoreMsg`, data)
}

export function doSearch (data) {
    return request(`${home}/api/sertch_friends`, data)
}

export function upRemark (data) {
    return request(`${home}/api/update_remark`, data)
}

export function upPhone (data) {
    return request(`${home}/api/phone_to_wxid`, data)
}

export function setGroup (data) {
    return request(`${home}/api/editusergroup`, data)
}

export function setBlack (data) {
    return request(`${home}/black/addBlack`, data)
}

export function fetchGroups (data) {
    return request(`${home}/api/kefugetsusergroup`, data)
}

export function fetchContactsByGroup (data) {
    return request(`${home}/api/getFriendsByFenzu`, data)
}

export function addFriendByCard (data) {
    return request(`${home}/Ids/add_friends_by_card`, data)
}

export function updateLastTime (data) {
    return request(`${home}/ziaccount/updateUserLastTime`, data)
}

export function fetchForwards (data) {
    return request(`${home}/Collect/get_qunfa_friends`, data)
}

export function forward (data) {
    return request(`${home}/api/doqunfa_kefu`, data)
}

export function sendMsg (data) {
    return request(`${home}/api/domessage`, data)
}

export function fetchMsgStatus (data) {
    return request(`${home}/Collect/get_msg_status`, data)
}
