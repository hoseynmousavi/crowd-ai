import BOT_URLS from "constant/BOT_URLS"
import request from "request/request"

interface editInlineMessage {
    isTelegram: boolean,
    data: {
        text: string,
        chat_id: number,
        message_id: number,
        inline_keyboard: Array<Array<{ text: string, callback_data: string }>>
    }
}

function editInlineMessage({isTelegram, data: {text, chat_id, message_id, inline_keyboard}}: editInlineMessage) {
    return request.post({
        domain: isTelegram ? "telegram" : "bale",
        url: isTelegram ? BOT_URLS.telegramEditInlineMessage : BOT_URLS.baleEditInlineMessage,
        data: {
            text,
            chat_id,
            message_id,
            reply_markup: {inline_keyboard},
        },
    })
}

export default editInlineMessage
