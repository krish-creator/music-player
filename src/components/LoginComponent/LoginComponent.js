import React from 'react'
import './LoginComponent.scss'
import { loginUrl } from '../../spotify'


function LoginComponent() {
    return (
        <div className='login'>
            <span>Music - Player</span>
            <a href={loginUrl}>Login</a>
        </div>
    )
}

export default LoginComponent