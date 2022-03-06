import React from 'react'
import { useHistory } from 'react-router-dom'
import { ChatEngine } from 'react-chat-engine'
import { auth } from '../firebase'

import { useAuth } from '../contexts/AuthContext'

const Chats = () => {

    const history = useHistory()
    const { user } = useAuth()
    console.log(user)

    const handleLogout = async () => {
        await auth.signOut()
        // navigate back to root so users can login if needed
        history.push('/')
    }

  return (
    <div className="chat-page">
          <div className="nav-bar">
              <div className="logo-tab">
                Smash Factory
              </div>
              <div className="logout-tab" onClick={handleLogout}>
                Logout
              </div>
          </div>

          <ChatEngine
              height="calc(100vh - 66px)"
            // TODO move project ID into environment variable before publishing  
              projectId="1b6986f9-22ca-4a51-8ee7-fff2f90832cd"
              userName="."
              userSecret="."
          />
    </div>
  )
}

export default Chats
