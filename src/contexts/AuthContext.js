import React, { useContext, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { auth } from '../firebase'

const AuthContext = React.createContext()

export const useAuth = () => useContext(AuthContext)

//  manage the user's data
export const AuthProvider = ({ children }) => {

    const[loading, setLoading] = useState(true)
    const[user, setUser] = useState({})
    const history = useHistory()    // to re-navigate

    useEffect(() => { 
        auth.onAuthStateChanged((user) => { // get user from firebase auth
            setUser(user)
            setLoading(false)
            history.push('/chats')  // router-dom navigate to chats
        })
        
    }, [user, history]) // whenever adding user or re-navigating

    const value = { user } 

    return (
        <AuthContext.Provider value={value}> 
            { !loading && children}
        </AuthContext.Provider>
    )
}