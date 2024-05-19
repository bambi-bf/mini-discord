"use client"
import React, { useState } from 'react'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { DISCORD_URI } from '@/constants';

export default function Login() {
  const [isAuth, setAuth] = useState(false);
  const router = useRouter();

  const login = () => {
    // axios.get("https://discord.com/oauth2/authorize?client_id=1240016706542370909&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fmain&scope=identify")
    //   .then(res => {
    //     console.log(res)
    //   })
    //   .catch(err => console.log(err));
    router.push(DISCORD_URI);
  }

  return (
    <div className="flex flex-col bg-[rgba(62,77,238,255)] h-full">
      <div className='flex justify-end'>
        <button className='bg-white text-black rounded-full py-2 px-5 text-2xl mt-10 mr-5 hover:bg-[rgb(164,71,225)] hover:text-white' onClick={login}>{isAuth ? "Go to Chat" : "Join Discord"}</button>
      </div>
      <div className='flex flex-col mt-[300px] text-white text-center'>
        <div>
          <h1 className='text-[100px]'>
            IMAGIN A PLACE
          </h1>
        </div>
        <div>
          <p className='text-2xl m-56 mt-5'>
            ...where you can belong to a school club, a gmaing group, or a worldwide art community.
            Where just you and a handful of friends can spend time together. A place that makes it easy to talk every day and hang out more often.
          </p>
        </div>
      </div>
    </div>
  )
}
