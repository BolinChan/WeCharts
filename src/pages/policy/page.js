import React, { Component } from "react"
import { StatusBar, SafeAreaView, ScrollView, Text, StyleSheet } from "react-native"
import { colors } from "../../layout/layout"
class Policy extends Component {
    render () {
        return (
            <SafeAreaView style={styles.custom}>
                <ScrollView style={styles.container}>
                    <StatusBar
                        animated
                        barStyle="dark-content"
                        backgroundColor={colors.navBg}
                    />
                    <Text style={styles.content}>
                        <Text style={styles.textReason}>缩进</Text>
                        云控系统是一款利用模拟人工点击技术来操作微信账号的工具，您可以用它来替代枯燥的人工点击等行为，由于云控系统的批量化操作特性，容易引发针对微信平台的非善意使用，因此若您存在如下行为，需立即退出并卸载云控系统：
                    </Text>
                    <Text />
                    <Text style={styles.content}>
                        1. 将非法获取的公民个人信息导入了云控系统中
                    </Text>
                    <Text style={styles.content}>
                        2. 进行色情变现业务，如利用各种借口讨要红包等
                    </Text>
                    <Text style={styles.content}>
                        3. 进行实体类诈骗业务，如套路卖茶叶等
                    </Text>
                    <Text style={styles.content}>
                        4. 进行金融类诈骗业务，如推广非法股票配资等
                    </Text>
                    <Text style={styles.content}>
                        5. 进行博彩类业务，如推广海外线上博彩平台等
                    </Text>
                    <Text style={styles.content}>
                        6. 进行邪教传教业务，如法轮功推广等
                    </Text>
                    <Text style={styles.content}>
                        7. 以上未例举但事实成立的其它违反国家法律法规的行为
                    </Text>
                    <Text />
                    <Text style={styles.content}>关于本补充协议：</Text>
                    <Text style={styles.content}>
                        为使用云控系统（以下简称“本系统”）及服务，您应当阅读并遵守《云控系统用户使用协议》，以及《云控系统补充使用协议》，一旦您在本页面点击了“同意”，即表示您同意并接受了本协议中的所有条款、条件及通告。
                    </Text>
                </ScrollView>
            </SafeAreaView>
        )
    }
}
export default Policy
const pad = 16
const styles = StyleSheet.create({
    custom: {
        flex: 1,
    },
    container: {
        flex: 1,
        padding: pad,
    },
    content: {
        fontSize: 17,
        lineHeight: 28,
    },
    textReason: {
        color: "transparent",
    },
})
