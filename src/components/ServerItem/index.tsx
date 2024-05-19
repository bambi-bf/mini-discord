import { SERVER_ITEM_HEIGHT, SERVER_ITEM_WIDTH } from '@/constants'
import { ServerItemPropsType } from '@/utils/propData'
import React from 'react'

export const ServerItem: React.FC<ServerItemPropsType> = ({id, icon,name,select }) => {
  return (
    <div className='flex mx-[20px] my-[10px] text-[14px] text-white bg-black rounded-xl hover:border-white hover:border-[1px]' onClick={() => select(id)} >
        <img src={icon} width={SERVER_ITEM_WIDTH} height={SERVER_ITEM_HEIGHT} alt={name} className='rounded-xl' />
    </div>
  )
}
