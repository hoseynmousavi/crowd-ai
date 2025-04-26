import axios from "axios"
import headerMaker from "request/headerMaker"
import urlMaker from "request/urlMaker"
import {RequestGetType, RequestType} from "types/RequestTypes"

function get({url, domain, params, headers}: RequestGetType) {
    const reqUrl = urlMaker({url, params, domain})
    return axios.get(reqUrl, {headers: headerMaker({headers, domain})})
        .then(res => res.data)
        .catch(err => errorHandler(err))
}

function post({url, domain, data, params, headers}: RequestType) {
    const reqUrl = urlMaker({url, params, domain})
    return axios.post(reqUrl, data, {headers: headerMaker({headers, domain})})
        .then(res => res.data)
        .catch(err => errorHandler(err))
}

function patch({url, domain, data, params, headers}: RequestType) {
    const reqUrl = urlMaker({url, params, domain})
    return axios.patch(reqUrl, data, {headers: headerMaker({headers, domain})})
        .then(res => res.data)
        .catch(err => errorHandler(err))
}

function del({url, domain, data, params, headers}: RequestType) {
    const reqUrl = urlMaker({url, params, domain})
    return axios.delete(reqUrl, {headers: headerMaker({headers, domain}), data})
        .then(res => res.data)
        .catch(err => errorHandler(err))
}

function errorHandler(err: any) {
    console.error({
        data: err?.response?.data,
        status: err?.response?.status,
        url: err?.response?.config?.url,
    })
    throw err
}

const request = {
    get,
    post,
    patch,
    del,
}

export default request
