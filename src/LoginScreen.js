import React from "react"
import "./css/login-screen.css"

const LoginScreen = ({ signIn, signOutWithGoogle }) => {
  return (
    <div className="login-screen">
      <div className="login-items">
        <div style={{fontWeight: "bold", fontSize: '20pt'}}>Welcome to your own personal library!</div>
        <button className='login-screen-sign-in-btn' onClick={signIn}>Login with Google</button>
        {/* <button onClick={signOutWithGoogle}>Log out</button> */}
      </div>
    </div>
  )
}

export default LoginScreen
