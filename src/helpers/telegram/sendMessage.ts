import BOT_URLS from "constant/BOT_URLS"
import request from "request/request"

interface sendMessageProps {
    isTelegram: boolean,
    data: {
        chat_id: number,
        text: string,
        reply_buttons?: Array<Array<{ text: string }>>,
        inline_keyboard?: Array<Array<{ text: string, callback_data?: string, url?: string }>>
        reply_to_message_id?: number,
    }
}

function sendMessage({isTelegram, data: {chat_id, text, reply_buttons, inline_keyboard, reply_to_message_id}}: sendMessageProps) {
    return request.post({
        domain: isTelegram ? "telegram" : "bale",
        url: BOT_URLS.sendMessage,
        data: {
            chat_id,
            text,
            reply_to_message_id,
            allow_sending_without_reply: true,
            reply_markup:
                inline_keyboard ?
                    {inline_keyboard}
                    :
                    reply_buttons ?
                        {
                            keyboard: reply_buttons,
                            one_time_keyboard: true,
                            resize_keyboard: true,
                        }
                        :
                        {remove_keyboard: true},
        },
    })
}

export default sendMessage
