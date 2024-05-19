import { ServerItem } from '@/components/ServerItem'
import { ServerPropsType } from '@/utils/propData'
import React, { useContext } from 'react'

export const Servers: React.FC<ServerPropsType> = ({ servers,select }) => {
  
  return (
    <div className='flex flex-col'>
      {
        servers.map((server) => (
          <ServerItem id={server.id} icon={`https://cdn.discordapp.com/icons/${server.id}/${server.icon}.png`} name={server.name} select={select} />
        ))
      }
    </div>
  )
}
