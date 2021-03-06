import React, { useRef, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { ChatEngine } from 'react-chat-engine'
import { auth } from '../firebase'
import { useAuth } from '../contexts/AuthContext'
import axios from 'axios'

const Chats = () => {
  const didMountRef = useRef(false)
  const history = useHistory()
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)

  const handleLogout = async () => {
    await auth.signOut()
    // navigate back to root so users can login if needed
    history.push('/')
  }

  const getFile = async (url) => {
    let response = await fetch(url)
    let data = await response.blob()
    return new File([data], 'userPhoto.jpg', { type: 'image/jpeg' })
  }

  useEffect(() => {
    // TODO remove didMountRef if not needed
    if (!didMountRef.current) {
      didMountRef.current = true
    }

    if (!user || user === null) {
      history.push('/')
      return
    }

    axios
      .get(
        // check has user been created
        'https://api.chatengine.io/users/me/',
        {
          headers: {
            'project-id': process.env.REACT_APP_CHAT_ENGINE_ID,
            'user-name': user.email,
            'user-secret': user.uid,
          }
        }
      )
      .then(() => {
        setLoading(false)
        console.log('email ', user.email)
        console.log('uid ', user.uid)
        console.log('Chat engine ID ', process.env.REACT_APP_CHAT_ENGINE_ID)
      })

      .catch((e) => {
        console.log(user.email)
        console.log(user.uid)
        console.log(process.env.REACT_APP_CHAT_ENGINE_ID)
        // if axios comes back without user profile make new one
        let formdata = new FormData()
        formdata.append('email', user.email)
        formdata.append('username', user.email)
        formdata.append('secret', user.uid)

        getFile(user.photoURL).then((avatar) => {
          formdata.append('avatar', avatar, avatar.name)

          axios
            .post('https://api.chatengine.io/users/', formdata, {
              headers: { 'private-key': process.env.REACT_APP_CHAT_ENGINE_KEY },
            })
            .then(() => setLoading(false)) // if successful
            .catch((e) => console.log('e', e.response)) // if unsuccessful
        })
      })
  }, [user, history])

  if (!user || loading) return 'Loading...'

  return (
    <div className="chat-page">
      <div className="nav-bar">
        <div className="logo-tab">Smash Factory</div>
        <div className="logout-tab" onClick={handleLogout}>
          Logout
        </div>
      </div>

      <ChatEngine
        height="calc(100vh - 66px)"
        projectID={process.env.REACT_APP_CHAT_ENGINE_ID}
        userName={user.email}
        userSecret={user.uid}
      />
    </div>
  )
}

export default Chats
