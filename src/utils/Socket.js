import Storage from "./Storage"

let lockReconnect = false
const ip = "ws://118.31.167.215:8282"
let ws = ""
let heartCheck = {
    timeout: 15000,
    timeoutObj: null,
    serverTimeoutObj: null,
    reset: function () {
        clearTimeout(this.timeoutObj)
        clearTimeout(this.serverTimeoutObj)
        return this
    },
    start: function () {
        this.timeoutObj = setTimeout(() => {
            send(ws, { act: "heart" })
            this.serverTimeoutObj = setTimeout(() => {
                ws.close()
            }, this.timeout)
        }, this.timeout)
    },
}

const send = async (ws, body) => {
    body.token = await Storage.get("token") || ""
    ws.send(JSON.stringify(body))
}

export default class Socket {
    static tuiMsg

    static createSocket = async () => {
        try {
            const token = await Storage.get("token") || ""
            ws = new WebSocket(`${ip}?token=${token}`)
            this.initSocket()
        } catch (e) {
            this.reconnect()
        }
    }

    static initSocket = () => {
        ws.onopen = (evt) => {
            heartCheck.reset().start()
        }
        ws.onmessage = (evt) => {
            heartCheck.reset().start()
            const payload = JSON.parse(evt.data)
            if (payload && "act" in payload && payload.act) {
                switch (payload.act) {
                    case "tui_msg":
                        if (this.tuiMsg) {
                            this.tuiMsg(payload)
                        }
                        break
                    default: break
                }
            }
        }
        ws.onclose = () => {
            this.reconnect()
        }
    }

    static reconnect = () => {
        if (lockReconnect) {
            return
        }
        lockReconnect = true
        setTimeout(() => {
            this.createSocket()
            lockReconnect = false
        }, 5000)
    }
}
