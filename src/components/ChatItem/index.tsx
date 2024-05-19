import { ChatItemPropsType } from '@/utils/propData'
import React from 'react'

export const ChatItem: React.FC<ChatItemPropsType> = ({ sended, time, content }) => {
  return (
    <div className='flex text-white w-full'>
      <div className='w-[50px] h-[50px] text-[30px]'>
        {sended ? "S" : "R"}
      </div>
      <div className='flex flex-col w-full'>
        <p className='text-[20px]'>{content}</p>
        <div className='flex text-[15px] w-full'>
          <span className='justify-end'>{time}</span>
        </div>
      </div>
    </div>
  )
}
