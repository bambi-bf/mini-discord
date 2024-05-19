export interface ServerItemPropsType {
    id: number,
    icon: string,
    name: string,
    select: Function
}

export interface ServerPropsType {
    servers: ServerItemPropsType[],
    select: Function
}

export interface UserItemPropsType {
    avatar: string,
    name: string,
    id: number,
    username: string,
    select: Function
}

export interface UsersPropsType {
    users: UserItemPropsType[],
    select: Function
}

export interface LinkedUsersPropsType {
    id: string,
    setLinkUser: Function,
    users: UserItemPropsType[]
}

export interface ProfilePropsType {
    id: number,
    avatar: string,
    name: string,
    username: string
}

export interface ChatItemPropsType {
    sended: boolean,
    time: string,
    content: string,
}

export interface ChatPropsType {
    chats: ChatItemPropsType[],
    add: Function,
    sender: string
}