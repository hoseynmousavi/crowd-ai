import BOT_URLS from "constant/BOT_URLS"
import request from "request/request"

interface sendChannelPhotoMessageProps {
    isTelegram: boolean,
    data: {
        chat_id: number,
        caption: string,
        photo: string,
    }
}

function sendChannelPhotoMessage({isTelegram, data: {chat_id, caption, photo}}: sendChannelPhotoMessageProps) {
    return request.post({
        domain: isTelegram ? "telegram" : "bale",
        url: BOT_URLS.sendPhoto,
        data: {
            chat_id,
            caption,
            photo,
            parse_mode: "HTML",
        },
    })
}

export default sendChannelPhotoMessage
