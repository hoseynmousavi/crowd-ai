declare module "process" {
    global {
        namespace NodeJS {
            interface ProcessEnv {
                NODE_ENV: "development" | "production"

                PORT: string,
                TELEGRAM_TOKENIZED_URL: string,
                LOCAL_SERVICES_API_KEY: string,
                BALE_TOKENIZED_URL: string,
                API_BASE_URL: string
            }
        }
    }
}
