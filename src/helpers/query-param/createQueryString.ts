function createQueryString({params}: { params: Record<string, string | number | null> }): string {
    const filteredKeys = Object.entries(params).filter(([_, value]) => value)
    if (filteredKeys.length) {
        return filteredKeys.reduce((sum, [key, value], index) => {
            const separator = index ? "&" : ""
            if (key && value) {
                return `${sum}${separator}${key}=${value}`
            }
            else {
                return sum
            }
        }, "?")
    }
    else {
        return ""
    }
}

export default createQueryString
