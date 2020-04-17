import { AsyncStorage } from "react-native"

export default class Storage {
    static set = async (key, value) => {
        try {
            await AsyncStorage.setItem(key, JSON.stringify(value))
        } catch (err) {
            return false
        }
    }
    static get = async (key) => {
        let re = ""
        try {
            let value = await AsyncStorage.getItem(key)
            value = JSON.parse(value)
            if (value && value !== null) {
                re = value
            }
        } catch (err) {
            re = err
        }
        return re
    }
}
