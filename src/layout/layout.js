import { StatusBar, Platform, StyleSheet, Dimensions } from "react-native"

export const customs = {
    lineSize: StyleSheet.hairlineWidth,
    fullWidth: Dimensions.get("window").width,
    fullHeight: Dimensions.get("window").height,
    headerLayout: Platform.OS === "android" ? { marginTop: -StatusBar.currentHeight } : {},
}

export const colors = {
    // navBg: "#F9F9F9",
    navBg: "#FFFFFF",
    bg: "#F2F2F2",
    bor: "rgba(0, 0, 0, 0.12)",
    // bor: "#F2F2F2",
    act: "#007AFF",
    unact: "#A1A1A1",
    desc: "rgba(0, 0, 0, 0.36)",

    red: "rgb(255, 59, 48)",
    orange: "rgb(255, 149, 0)",
    yellow: "rgb(255, 204, 0)",
    green: "rgb(76, 217, 100)",
    tealBlue: "rgb(90, 200, 250)",
    blue: "rgb(0, 122, 255)",
    purple: "rgb(88, 86, 214)",
    pink: "rgb(255, 45, 85)",
    superLightGray: "rgb(239, 239, 244)", // 超浅灰
    lightGray: "rgb(229, 229, 234)", // 浅灰
    mediumLightGray: "rgb(209, 209, 214)", // 浅中灰
    mediumGray: "rgb(199, 199, 204)", // 中灰
    gray: "rgb(142, 142, 147)",
}
