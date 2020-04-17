import React, { Component } from "react"
import { createAppContainer } from "react-navigation"
import { Provider } from "mobx-react"
import store from "./src/mobx/store"
import Toast from "./src/components/Toast"
import NavigationService from "./src/utils/Navigation"
import Switch from "./src/navigation/Switch"
const AppContainer = createAppContainer(Switch)
class App extends Component {
    render () {
        return (
            <Provider rootStore={store}>
                <Toast>
                    <AppContainer ref={(navigatorRef) => {NavigationService.setAppNavigator(navigatorRef)}} />
                </Toast>
            </Provider>
        )
    }
}
export default App
