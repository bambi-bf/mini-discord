import { SERVER_ITEM_HEIGHT, SERVER_ITEM_WIDTH } from '@/constants'
import { UserItemPropsType } from '@/utils/propData'
import React from 'react'

export const UserItem: React.FC<UserItemPropsType> = ({ avatar, name, id, username, select }) => {
  return (
    <div className='flex p-3 grow-1 w-[155px]' onClick={() => select(id)}>
      <img src={`https://cdn.discordapp.com/avatars/${id}/${avatar}.png`} width={SERVER_ITEM_WIDTH} height={SERVER_ITEM_HEIGHT} alt={name} className='rounded-lg' />
      <div className='flex flex-col items-center m-auto mx-2'>
        <h2 className='text-[15px] text-center text-white'>{name ? name : username}</h2>
      </div>
    </div>
  )
}
