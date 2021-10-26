import React, { useState, useEffect } from "react"
import ReactDOM from "react-dom"
import "./firebase-config"
import App from "./App"
import LoginScreen from "./LoginScreen"
import Nav from "./Nav"
import './index.css'

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth"

const Index = () => {
  const [myUid, setMyUid] = useState()
  const [displayName, setDisplayName] = useState("")

  const provider = new GoogleAuthProvider()
  const auth = getAuth()

  const signIn = async () => {
    await signInWithPopup(auth, provider)
      .then((result) => {
        
      })
      .catch((error) => {
        console.log(error)
      })
  }

  auth.onAuthStateChanged((user) => {
    if (user) {
      setDisplayName(user.displayName)
      setMyUid(user.uid)
    } else {
      setMyUid(0)
    }
  })

  const signOutWithGoogle = async () => {
    auth.signOut()
  }

  useEffect(() => {
    console.clear()
  }, [])

  if (myUid) {
    return (
      <div>
        <Nav uid={myUid} displayName={displayName} signOutWithGoogle={signOutWithGoogle} signIn={signIn}/>
        <App
          uid={myUid}
        />
      </div>
    )
  } else {
    return (
      <div>
        <LoginScreen signOutWithGoogle={signOutWithGoogle} signIn={signIn} />
      </div>
    )
  }
}

ReactDOM.render(
  <React.StrictMode>
    <Index />
  </React.StrictMode>,
  document.getElementById("root")
)