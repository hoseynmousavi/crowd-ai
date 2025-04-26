function numberCorrection(inputNumber: string | number = ""): string {
    return inputNumber
        .toString()
        .replace(new RegExp("۰", "g"), "0")
        .replace(new RegExp("۱", "g"), "1")
        .replace(new RegExp("۲", "g"), "2")
        .replace(new RegExp("۳", "g"), "3")
        .replace(new RegExp("۴", "g"), "4")
        .replace(new RegExp("۵", "g"), "5")
        .replace(new RegExp("۶", "g"), "6")
        .replace(new RegExp("۷", "g"), "7")
        .replace(new RegExp("۸", "g"), "8")
        .replace(new RegExp("۹", "g"), "9")
        .replace(new RegExp("٠", "g"), "0")
        .replace(new RegExp("١", "g"), "1")
        .replace(new RegExp("٢", "g"), "2")
        .replace(new RegExp("٣", "g"), "3")
        .replace(new RegExp("٤", "g"), "4")
        .replace(new RegExp("٥", "g"), "5")
        .replace(new RegExp("٦", "g"), "6")
        .replace(new RegExp("٧", "g"), "7")
        .replace(new RegExp("٨", "g"), "8")
        .replace(new RegExp("٩", "g"), "9")
}

export default numberCorrection
