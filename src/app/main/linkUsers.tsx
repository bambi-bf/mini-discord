import { UserItem } from '@/components/UserItem'
import { LinkedUsersPropsType } from '@/utils/propData'
import axios from 'axios'
import React from 'react'

export const LinkUsers: React.FC<LinkedUsersPropsType> = ({ id, users, setLinkUser }) => {
    const addUser = (user: string) => {
        axios.post('http://localhost:5000/api/user/add', { user })
            .then(res => {
                alert("Add to database is success");
            })
            .catch(err => {
                alert(err.response.data.content)
            });
    }

    const linkUser = (user_id: string) => {
        if (user_id == id) return;
        axios.post("http://localhost:5000/api/user/link", {
            id: id,
            link_id: user_id
        })
            .then(res => {
                alert("Add friend is success!");
            })
            .catch(err => {
                alert(err.response.data.content)
            });
    }
    return (
        <div className='flex flex-col grow-0 w-60'>
            {
                Array.isArray(users) && users.map((userItem, index) => {
                    const user = userItem?.user;
                    return (
                        <div className='flex items-stretch bg-[rgb(80,80,80)] m-2' key={index}>
                            <UserItem avatar={user.avatar} name={user.global_name} id={user.id} username={user.username} />
                            <button className='bg-black text-white w-8 h-8 m-auto text-[21px] grow-0 self-end' onClick={() => linkUser(user.id)}>+</button>
                            <button className='bg-[rgb(25,90,25)] text-white w-8 h-8 m-auto text-[18px] grow-0 self-end' onClick={() => addUser(user)}>D</button>
                        </div>
                    )
                })
            }
        </div>
    )
}
