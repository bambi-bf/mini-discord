import { PROFILE_HEIGHT, PROFILE_WIDTH } from '@/constants'
import { ProfilePropsType } from '@/utils/propData'
import React from 'react'

export const Profile: React.FC<ProfilePropsType> = ({ id, avatar, name, username }) => {
  return (
    <div className='flex bg-[rgb(0,0,0,90)] text-center'>
      <img src={`https://cdn.discordapp.com/avatars/${id}/${avatar}.png`} width={PROFILE_WIDTH} height={PROFILE_HEIGHT} alt={name} className='rounded-2xl' />
      <div className='flex flex-col m-auto'>
        <h2 className='text-white text-[20px]'>{name}</h2>
        <p className='text-[rgb(255,255,255,200)] text-[15px]'>{username}</p>
      </div>
    </div>
  )
}
