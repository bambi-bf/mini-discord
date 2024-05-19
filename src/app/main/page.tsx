"use client"
import { TokenContext } from '@/contexts/TokenContext';
import axios from 'axios';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Servers } from './servers';
import { Users } from './users';
import { Profile } from '@/components/Profile';
import { Chats } from './chats';
import { LinkUsers } from './linkUsers';
import { ServerItemPropsType } from '@/utils/propData';
import io from 'socket.io-client';

export default function Main() {
  const [code, setCode] = useState("");
  const [user, setUser] = useState({ id: "", username: "", avatar: "", name: "" });
  const [selectId, setSelectId] = useState("");
  const [servers, setServers] = useState<ServerItemPropsType[]>([]);
  const [users, setUsers] = useState([]);
  const [fans, setFans] = useState([]);
  const [chats, setChats] = useState([]);
  const [linkUsers, setLinkUsers] = useState([]);
  const { access_token, accessTokenFunc } = useContext(TokenContext);
  const { token_type, tokenTypeFunc } = useContext(TokenContext);

  const getToken = (code: any) => {
    axios.post('http://localhost:5000/getToken', { code })
      .then(res => {
        const resultJson = res.data;
        accessTokenFunc(resultJson.access_token);
        tokenTypeFunc(resultJson.token_type);
        getMe(resultJson.token_type, resultJson.access_token);
        getGuilds(resultJson.token_type, resultJson.access_token);
        return resultJson;
      });
  }

  const getMe = async (tokenType: any, accessToken: any) => {
    axios.get('http://localhost:5000/p/getMe', {
      headers: {
        "authorization": `${tokenType} ${accessToken}`,
      }
    })
      .then(res => {
        setUser({
          id: res.data.id,
          username: res.data.username,
          avatar: res.data.avatar,
          name: res.data.global_name
        });
        getFans(res.data.id);
        getLinkUsers(res.data.id);
        const socket = io("http://localhost:5000", {
          query: {
            userId: res.data.id
          }
        });
        socket.on('chat message', (msg) => {
          if (msg.keys().includes("receiver") && msg.keys().includes("content"))
            setChats([...chats, { sender: msg.receiver, content: msg.content, receiver: user.id }]);
        });
        socket.emit('chat message', 'Hello, world!');
      })
      .catch(err => console.log(err));
  }

  const getGuilds = async (tokenType: any, accessToken: any) => {
    axios.get('http://localhost:5000/p/getMe/guilds', {
      headers: {
        "authorization": `${tokenType} ${accessToken}`,
      }
    })
      .then(res => {
        setServers(res.data);
      })
      .catch(err => console.log(err));
  }

  const selectServer = (server_id: number) => {
    axios.post(`http://localhost:5000/p/getMe/guilds/members`, { server_id },
      {
        headers: {
          "authorization": `${token_type} ${access_token}`,
        }
      })
      .then(res => {
        setLinkUsers(res.data);
      })
      .catch(err => {
        setLinkUsers([]);
      });
  }

  const getLinkUsers = (id: string) => {
    axios.get('http://localhost:5000/api/user/link_users', {
      params: {
        id: id
      }
    }).then(res => {
      if (res.data) setUsers(res.data);
    }).catch(err => console.log(err));
  }

  const getFans = (id: string) => {
    axios.get('http://localhost:5000/api/user/fans', {
      params: {
        id: id
      }
    }).then(res => {
      if (res.data) setFans(res.data);
    }).catch(err => console.log(err));
  }

  useEffect(() => {
    getLinkUsers(user.id);
    getFans(user.id);
  }, [linkUsers]);


  useEffect(() => {
    const fragment = new URLSearchParams(window.location.search);
    const ocode = fragment.get('code');
    if (ocode) {
      setCode(ocode);
      getToken(ocode);
    }
    else getToken(code);
  }, []);

  const selectUser = (id: string) => {
    setSelectId(id);
    axios.get("http://localhost:5000/api/user/select", {
      params: {
        sender_id: user.id,
        receiver_id: id
      }
    }).then(res => {
      if (res.data) setChats(res.data);
      else setChats([]);
    }).catch(err => console.log(err))
  }

  const addChat = (content: string) => {
    if (!selectId) {
      alert("Select receiver");
      return;
    }
    axios.post("http://localhost:5000/api/chat/add", {
      sender: user.id,
      receiver: selectId,
      content: content
    }).then(res => {
      if (res.data) setChats([...chats, res.data]);
    })
  }

  return (
    <div className="flex h-full">
      <div className='grow-0 w-30'>
        <Servers servers={servers} select={selectServer} />
      </div>
      <div className='flex relative flex-col content-between grow-0 w-60 bg-[rgb(46,43,49)]'>
        <div>
          <h3 className='text-white text-[20px] mt-5 ml-5'>Likes You</h3>
          <Users users={fans} select={selectUser} />
          <h3 className='text-white text-[20px] mt-5 ml-5'>Your Friends</h3>
          <Users users={users} select={selectUser} />
        </div>
        <div className='absolute bottom-1 left-2 right-2'>
          <Profile id={user.id} avatar={user.avatar} name={user.name} username={user.username} />
        </div>
      </div>
      <Chats chats={chats} add={addChat} sender={user.id} />
      <LinkUsers id={user.id.toString()} users={linkUsers} />
    </div>
  )
}
