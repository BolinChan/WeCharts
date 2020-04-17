import Storage from "./Storage"

const err = { error: true, errmsg: "" }

export default async function request (url, params, method = "POST") {
    const token = await Storage.get("token") || ""
    let res
    if (method.toUpperCase() === "POST") {
        try {
            const postData = await fetch(url, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json;charset=UTF-8",
                    "Authorization": token,
                },
                body: JSON.stringify(params),
            })
            if (postData.ok) {
                res = JSON.parse(postData._bodyText || postData._bodyInit) || err
            } else {
                res = { error: true, errmsg: `${postData.status}:${postData.statusText}` }
            }
        } catch (err) {
            res = err
        }
    } else {
        try {
            const getData = await fetch(url, { headers: { Authorization: token } })
            res = JSON.parse(getData._bodyText || getData._bodyInit) || err
        } catch (err) {
            res = err
        }
    }
    return res
}
