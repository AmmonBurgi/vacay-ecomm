import React, {useState} from 'react'
import {getUser} from '../../redux/authReducer'
import {connect} from 'react-redux'
import axios from 'axios'
import './register.css'

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faInstagram} from '@fortawesome/free-brands-svg-icons'
import {faPinterest} from '@fortawesome/free-brands-svg-icons'

function Register(props){
    const [firstName, setFirst] = useState(''),
        [lastName, setLast] = useState(''),
        [email, setEmail] = useState(''),
        [password, setPassword] = useState('')

    const registerUser = () => {
        const emailArray = email.split('').filter((element, index) => {
            return element === '@'
        })
        if(firstName.length === 0){
           return alert('First Name Required!')
        }
        if(lastName.length === 0){
            return alert('Last Name required!')
        }
        if(email.length === 0 || emailArray.length === 0){
            return alert('Invalid Email!')
        }
        if(password.length <= 5){
            return alert('Password needs to be at least 6 characters long!')
        }
        axios.post('/api/register', {firstName, lastName, email, password})
        .then(res => {
            axios.get('/api/cart/all').then(res => props.getCart(res.data))
            .catch(err => console.log('Error...', err))

            props.getUser(res.data)
            props.history.push('/')
        }).catch(err => {
            console.log(err)
            alert(err.response.data)
        })
    }

    return(
        <div className='register-component'>
            <div className='register-prev'>
                <nav className='register-prev-left'>
                    <p className='register-prev-home' onClick={() => props.history.push('/')}>Home </p>
                    <p className='register-prev-arrow'>&#62;</p>
                    <p className='register-prev-arrow'> register</p>
                </nav>
                <nav className='register-icons'>
                    <a href='https://www.instagram.com/livemoreworkless/' >
                        <FontAwesomeIcon icon={faInstagram}></FontAwesomeIcon>
                    </a>
                    <a href='https://www.pinterest.com/vacaysunglasses/' >
                        <FontAwesomeIcon icon={faPinterest}></FontAwesomeIcon>
                    </a>
                </nav>
            </div>
            <div className='register-tag'>
                <p>Register</p>
                <hr></hr>
            </div>
            <section className='register-main'>
                <nav className='register-input'>
                    <label>First Name</label>
                    <input onChange={(e) => setFirst(e.target.value) } />
                </nav>
                <nav className='register-input'>
                    <label>Last Name</label>
                    <input onChange={(e) => setLast(e.target.value)} />
                </nav>
                <nav className='register-input'>
                    <label>email</label>
                    <input type='email' onChange={(e) => setEmail(e.target.value)} />
                </nav>
                <nav className='register-input'>
                    <label>password</label>
                    <input type='password' onChange={(e) => setPassword(e.target.value)} />
                </nav>
                <button className='register-button' onClick={registerUser}>Register</button>
                <p className='register-return' onClick={() => props.history.push('/')} >Return to Store</p>
            </section>
        </div>
    )
}

export default connect(null, {getUser})(Register)