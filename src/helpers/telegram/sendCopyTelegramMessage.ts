import BOT_URLS from "constant/BOT_URLS"
import request from "request/request"

interface sendCopyTelegramMessageProps {
    isTelegram: boolean,
    data: {
        chat_id: number,
        from_chat_id: number,
        message_id: number
    }
}

function sendCopyTelegramMessage({isTelegram, data: {chat_id, from_chat_id, message_id}}: sendCopyTelegramMessageProps) {
    return request.post({
        domain: isTelegram ? "telegram" : "bale",
        url: BOT_URLS.copyMessage,
        data: {chat_id, from_chat_id, message_id},
    })
}

export default sendCopyTelegramMessage
