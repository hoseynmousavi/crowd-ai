import BOT_URLS from "constant/BOT_URLS"
import request from "request/request"

interface sendMessageProps {
    isTelegram: boolean,
    data: {
        chat_id: number,
        text: string,
    }
}

function sendChannelTextMessage({isTelegram, data: {chat_id, text}}: sendMessageProps) {
    return request.post({
        domain: isTelegram ? "telegram" : "bale",
        url: BOT_URLS.sendMessage,
        data: {
            chat_id,
            text,
            parse_mode: "HTML",
        },
    })
}

export default sendChannelTextMessage
