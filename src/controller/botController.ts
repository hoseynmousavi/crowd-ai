import API_URLS from "constant/API_URLS"
import BOT_COMMANDS from "constant/BOT_COMMANDS"
import BOT_URLS from "constant/BOT_URLS"
import FA_TEXT from "constant/FA_TEXT"
import numberCorrection from "helpers/input/numberCorrection"
import sendMessage from "helpers/telegram/sendMessage"
import request from "request/request"
import {ExpressRequestType} from "types/ExpressRequestType"
import {ExpressResponseType} from "types/ExpressResponseType"
import {MessageType} from "types/MessengerType"

function updateReceived({req, res, isTelegram}: { req: ExpressRequestType, res: ExpressResponseType, isTelegram: boolean }) {
    res.send({message: "OK"})
    console.log({isTelegram, body: req.body})

    const {message, chat_member, callback_query} = req.body || {}
    if (callback_query) {

    }
    else if (message) {
        const {chat} = message || {}
        const {type} = chat || {}
        if (type === "private") {
            _handlePvChat({message, isTelegram})
        }
        else if (type === "group" || type === "supergroup") {

        }
    }
    else if (chat_member) {
    }
}

async function _handlePvChat({message, isTelegram}: { message: MessageType, isTelegram: boolean }) {
    const {from, chat, text} = message
    if (from && chat && text) {
        const {first_name, last_name, username, id: social_id} = from
        const {id: chat_id} = chat

        let user = await _createOrUpdateUser({social_id, isTelegram, data: {chat_id, first_name, last_name, username}})
        let userPreferences = await _createOrUpdateUserPreferences({user_id: user.id})

        // commands start
        if (text === BOT_COMMANDS.start) {
            if (isTelegram) {
                const has_joined_channel = await _checkHadTelegramUserJoinedChannel({social_id, chat_id: CHAT_CONST.telegramChannelId})
                await _createOrUpdateUser({social_id, isTelegram, data: {has_joined_channel}})
            }
            else {
                // todo check subscribe with bale
                await _createOrUpdateUser({social_id, isTelegram, data: {has_joined_channel: true}})
            }
            await sendMessage({isTelegram, data: {chat_id, text: FA_TEXT.welcome}})

            await _onStartOrEdit({isTelegram, chat_id, social_id})
        }
            // commands end

        // last topic check start
        else if (user.last_chat_topic === CHAT_TOPICS.wizardProfitRange) {
            if (Object.keys(PROFIT_RANGES).includes(text)) {
                const profit_range_start = PROFIT_RANGES[text as keyof typeof PROFIT_RANGES]
                userPreferences = await _createOrUpdateUserPreferences({user_id: user.id, data: {profit_range_start}})
                let warrantiesWithSubmit = await _generateWarrantyItems({userPreferences})
                await sendMessage({
                    isTelegram,
                    data: {
                        chat_id,
                        text: FA_TEXT.setWarrantyPreference,
                        inline_keyboard: warrantiesWithSubmit,
                    },
                })
                await _createOrUpdateUser({social_id, isTelegram, data: {last_chat_topic: CHAT_TOPICS.wizardWarrantyTypes}})
            }
        }
        else if (user.last_chat_topic === CHAT_TOPICS.getUserPhone) {
            const fixedStr = numberCorrection(text.replaceAll(" ", ""))
            if (fixedStr.length === 11 && fixedStr.startsWith("09") && !isNaN(+fixedStr)) {
                await _createOrUpdateUser({social_id, isTelegram, data: {phone_number: fixedStr, last_chat_topic: null}})
                await sendMessage({isTelegram, data: {chat_id, text: FA_TEXT.phoneSaved}})
            }
            else {
                await sendMessage({isTelegram, data: {chat_id, text: FA_TEXT.messageIsNotParsable}})
            }
        }
        // last topic check end
    }
}

async function _checkHadTelegramUserJoinedChannel({chat_id, social_id}: { chat_id: number, social_id: number }) {
    const res: { ok: boolean, result: { status: "member" | "left" | "administrator" } } = await request.post({domain: "telegram", url: BOT_URLS.getChatMember, data: {chat_id, user_id: social_id}})
    return res?.result?.status === "member" || res?.result?.status === "administrator"
}

async function _createOrUpdateUser({social_id, isTelegram, data}: { social_id: number, isTelegram: boolean, data: Partial<UserType> }) {
    const res: { data: UserType } = await request.post({domain: "api", url: API_URLS.user, data: {user_type: isTelegram ? "telegram" : "bale", social_id, ...data}})
    return res.data
}

async function _createOrUpdateUserPreferences({user_id, data}: { user_id: string, data?: Partial<UserPreferencesType> }) {
    const res: { data: UserPreferencesType } = await request.post({domain: "api", url: API_URLS.userPreference, data: {user: user_id, ...data}})
    return res.data
}

async function _onStartOrEdit({isTelegram, chat_id, social_id}: { isTelegram: boolean, chat_id: number, social_id: number }) {
    let profits: Array<Array<{ text: string }>> = []
    Object.keys(PROFIT_RANGES)
        .forEach(text => {
            const lastChild = profits[profits.length - 1]
            if (lastChild && lastChild.length === 1) {
                lastChild.push({text})
            }
            else {
                profits.push([{text}])
            }
        })

    await sendMessage({isTelegram, data: {chat_id, text: FA_TEXT.setProfitPreference, reply_buttons: profits}})
    await _createOrUpdateUser({social_id, isTelegram, data: {last_chat_topic: CHAT_TOPICS.wizardProfitRange}})
}

const botController = {
    updateReceived,
}

export default botController
