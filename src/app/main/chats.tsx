import { ChatItem } from '@/components/ChatItem'
import { ChatPropsType } from '@/utils/propData'
import React, { useState } from 'react'

export const Chats: React.FC<ChatPropsType> = ({ chats, add, sender }) => {
    const [content, setContent] = useState("");
    return (
        <div className='flex flex-col grow justify-between bg-[rgb(65,56,71)]'>
            <div className='flex flex-col self-start w-full'>
                {
                    chats.map(chat => (
                        <ChatItem sended={chat.sender == sender ? true : false} time={chat.time} content={chat.content} />
                    ))
                }
            </div>
            <div className='flex w-full self-end mb-2 px-2'>
                <input className='border-2 border-solid border-white grow' value={content} onChange={(e) => setContent(e.target.value)} />
                <button className='bg-[rgb(50,50,50)] text-white text-[21px] w-8 h-8' onClick={() => add(content)}>+</button>
            </div>

        </div>
    )
}
