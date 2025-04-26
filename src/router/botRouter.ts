import HOOK_URLS from "constant/HOOK_URLS"
import botController from "controller/botController"
import {Express} from "express"

function botRouter(app: Express) {
    app.route(HOOK_URLS.baleHook)
        .post((req, res) => botController.updateReceived({
            req,
            res,
            isTelegram: false,
        }))

    app.route(HOOK_URLS.telegramHook)
        .post((req, res) => botController.updateReceived({
            req,
            res,
            isTelegram: true,
        }))
}

export default botRouter
