import React from "react";
import './css/nav.css'

const Nav = ({signIn, signOutWithGoogle, displayName, uid}) => {
return (
  <div>
    <div className="nav">
      <div className="nav-name">{displayName ? displayName: null}</div>
        {/* <button className="nav-login" onClick={signIn}>Login with Google</button> */}
        <button className="nav-logout" onClick={signOutWithGoogle}>Log out</button>
      </div>
  </div>
)
}

export default Nav