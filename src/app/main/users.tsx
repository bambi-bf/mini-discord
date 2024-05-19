import { UserItem } from '@/components/UserItem'
import { UsersPropsType } from '@/utils/propData'
import React from 'react'

export const Users: React.FC<UsersPropsType> = ({ users, select }) => {

    return (
        <div className='flex flex-col'>
            {
                Array.isArray(users) && users.map(user => (
                    <UserItem avatar={user.avatar} name={user.name} id={user.id} username={user.username} select={select} />
                ))
            }
        </div>
    )
}
