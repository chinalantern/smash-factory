import React from "react"

import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import { AuthProvider } from "../contexts/AuthContext"   // from react context api

import Chats from "./Chats"
import Login from "./Login"

function App() {
  return (
    <div style={{ fontFamily: 'Avenir' }}>
      <Router>
        <AuthProvider>

          <Switch>  
            {/* At /chats render Chats component */}
            <Route path="/chats" component={Chats} />
            {/* At root render Login component */}
            <Route path="/" component={Login} />
          </Switch>
          
        </AuthProvider>
      </Router>
    </div>
  )
}

export default App
