import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {getUser} from '../../redux/authReducer'
import {getCart} from '../../redux/cartReducer'
import './login.css'

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faInstagram} from '@fortawesome/free-brands-svg-icons'
import {faPinterest} from '@fortawesome/free-brands-svg-icons'

function Login(props){
    const [email, setEmail] = useState(''),
        [password, setPassword] = useState(''),
        [backFadeToggle, setBackFadeToggle] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => {
            setBackFadeToggle(true)
        }, 100)
        return () => clearTimeout(timer)
    }, [])

    const loginUser = () => {
        axios.post('/api/login', {email, password})
        .then((res) => {
            axios.get('/api/cart/all').then(res => props.getCart(res.data))
            .catch(err => console.log('Error...', err))

            props.getUser(res.data)
            props.history.push('/')
            setEmail('')
            setPassword('')
        }).catch((err) => alert(err.response.data))
    }

    return(
        <div className={backFadeToggle === true ? 'login-component' : 'no-login-component'}>
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

export default connect(null, {getUser, getCart})(Login)