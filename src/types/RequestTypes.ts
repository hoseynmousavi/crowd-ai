export interface RequestType {
    url: string,
    params?: Record<string, string | number | null>,
    headers?: Record<string, string>,
    domain: DomainType
    data?: object,
}

export type DomainType = "telegram" | "bale" | "api"

export interface RequestGetType extends Omit<RequestType, "data"> {
}
