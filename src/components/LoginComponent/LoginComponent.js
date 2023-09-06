import React from 'react'
import './LoginComponent.css'
import logo from '../../images/logos/Spotify_Logo_RGB_White.png'
import { loginUrl } from '../../spotify'

function LoginComponent() {
    return (
        <div className='login'>
            <img src={logo} alt="" />
            <a href={loginUrl}>LOGIN WITH SPOTIFY</a>
        </div>
    )
}

export default LoginComponent