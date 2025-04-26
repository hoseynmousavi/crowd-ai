export interface MessageType {
    chat: { id: number },
    from: MessageFromType
    message_id: number,
    text: string,
}

export interface MessageFromType {
    id: number,
    first_name: string | null,
    last_name: string | null,
    username: string | null
}

export interface ChatMemberType {
    chat: { id: number },
    from: MessageFromType,
    new_chat_member: {
        status: "member" | "left",
    },
}
