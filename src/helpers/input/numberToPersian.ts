function numberToPersian(inputNumber: string | number = ""): string {
    return inputNumber
        .toString()
        .replace(new RegExp("0", "g"), "۰")
        .replace(new RegExp("1", "g"), "۱")
        .replace(new RegExp("2", "g"), "۲")
        .replace(new RegExp("3", "g"), "۳")
        .replace(new RegExp("4", "g"), "۴")
        .replace(new RegExp("5", "g"), "۵")
        .replace(new RegExp("6", "g"), "۶")
        .replace(new RegExp("7", "g"), "۷")
        .replace(new RegExp("8", "g"), "۸")
        .replace(new RegExp("9", "g"), "۹")
}

export default numberToPersian
