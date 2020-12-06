import React, {useState} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {getUser} from '../../redux/authReducer'
import './login.css'

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faInstagram} from '@fortawesome/free-brands-svg-icons'
import {faPinterest} from '@fortawesome/free-brands-svg-icons'

function Login(props){
    const [email, setEmail] = useState(''),
        [password, setPassword] = useState('')

    const loginUser = () => {
        axios.post('/api/login', {email, password})
        .then((res) => {
            props.getUser(res.data)
            props.history.push('/')
            setEmail('')
            setPassword('')
        }).catch((err) => alert(err.response.data))
    }

    return(
        <div className='login-component'>
            <div className='login-prev'>
                <nav className='login-prev-left'>
                    <p className='login-prev-home' onClick={() => props.history.push('/')}>Home </p>
                    <p className='login-prev-arrow'>&#62;</p>
                    <p className='login-prev-arrow'> login</p>
                </nav>
                <nav className='login-icons'>
                    <a href='https://www.instagram.com/livemoreworkless/' >
                        <FontAwesomeIcon icon={faInstagram}></FontAwesomeIcon>
                    </a>
                    <a href='https://www.pinterest.com/vacaysunglasses/' >
                        <FontAwesomeIcon icon={faPinterest}></FontAwesomeIcon>
                    </a>
                </nav>
            </div>
            <div className='login-tag'>
                <p>Login</p>
                <hr></hr>
            </div>
            <section className='login-main'>
                <span className='login-input'>
                    <label>Email</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} />
                </span>
                <span className='login-input'>
                    <label>Password</label>
                    <input value={password} type='password' onChange={(e) => setPassword(e.target.value)} />
                </span>
                <p className='login-forgot'>Forgot your password?</p>
                <button onClick={loginUser}>Login</button>
                <p onClick={() => props.history.push('/')} className='login-return'>Return to Store</p>
            </section>
        </div>
    )
}

export default connect(null, {getUser})(Login)