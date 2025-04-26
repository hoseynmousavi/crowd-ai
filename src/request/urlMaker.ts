import createQueryString from "helpers/query-param/createQueryString"
import {DomainType} from "types/RequestTypes"

function urlMaker({url, params, domain}: { url: string, params?: Record<string, string | number | null>, domain?: DomainType }): string {
    return findBaseUrl(domain) + "/" + url + (params ? createQueryString({params}) : "")
}

function findBaseUrl(domain?: DomainType) {
    switch (domain) {
        case "telegram":
            return process.env.TELEGRAM_TOKENIZED_URL
        case "bale":
            return process.env.BALE_TOKENIZED_URL
        default:
            return process.env.API_BASE_URL
    }
}

export default urlMaker
