import {DomainType} from "types/RequestTypes"

function headerMaker({headers, domain}: { headers?: Record<string, string>, domain: DomainType }) {
    return {
        ...domain === "api" ? {"Authorization": `Api-Key ${process.env.LOCAL_SERVICES_API_KEY}`} : {},
        "Accept-Language": "fa",
        ...headers ? headers : {},
    }
}

export default headerMaker
