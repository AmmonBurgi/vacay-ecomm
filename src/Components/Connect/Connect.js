import React, {useState, useEffect} from 'react'
import './connect.css'
import axios from 'axios'
import {connect} from 'react-redux'

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faInstagram} from '@fortawesome/free-brands-svg-icons'
import {faPinterest} from '@fortawesome/free-brands-svg-icons'

function Connect(props){
    const [name, setName] = useState(''),
        [email, setEmail] = useState(''),
        [phone, setPhone] = useState(''),
        [message, setMessage] = useState(''),
        [backFadeToggle, setBackFadeToggle] = useState(false)   

    const sendFeedback = () => {
        axios.post('/api/mail/feedback', {name, message, email, phone})
        .then(res => {
            setName('')
            setEmail('')
            setPhone('')
            setMessage('')
            alert(res.data[0].message)
        })
        .catch(err => console.log('Error...', err))
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setBackFadeToggle(true)
        }, 100)
        return () => clearTimeout(timer)
    }, [])

    return(
        <div className={backFadeToggle === true ? 'connect-comp' : 'no-connect-comp'}>
            <div className='connect-prev'>
                <nav className='connect-prev-left'>
                    <p className='connect-prev-home' onClick={() => props.history.push('/')}>Home </p>
                    <p className='connect-prev-arrow'>&#62;</p>
                    <p className='connect-prev-arrow'> connect</p>
                </nav>
                <nav className='connect-icons'>
                    <a href='https://www.instagram.com/livemoreworkless/' >
                        <FontAwesomeIcon icon={faInstagram}></FontAwesomeIcon>
                    </a>
                    <a href='https://www.pinterest.com/vacaysunglasses/' >
                        <FontAwesomeIcon icon={faPinterest}></FontAwesomeIcon>
                    </a>
                </nav>
            </div>
            <header className='connect-header'>
                <p>Connect</p>
                <hr></hr>
            </header>
            <span>
                <img alt={'Outdoor office'} className='connect-img' src={'https://cdn.shopify.com/s/files/1/0966/8778/files/Heber_green_office_copy_2048x2048.JPG?11444278074833745647'} />
                <p>PRESS AND PRODUCT REQUESTS? PLEASE DROP US A NOTE.<br></br>SALES INQUIRES - hello@vacaysunglasses.com</p>
            </span>
            <section className='connect-main'>
                <span className='connect-data'>
                    <label htmlFor='name'>Name</label>
                    <input id='name' value={name} onChange={(e) => setName(e.target.value) } />
                </span>
                <span className='connect-data'>
                    <label htmlFor='email'>Email</label>
                    <input id='email' value={email} onChange={(e) => setEmail(e.target.value) } />
                </span>
                <span className='connect-data'>
                    <label htmlFor='phone'>phone number</label>
                    <input id='phone' value={phone} onChange={(e) => setPhone(e.target.value) } />
                </span>
                <span className='connect-text'>
                    <label htmlFor='message'>Message</label>
                    <textarea id='message' value={message} onChange={(e) => setMessage(e.target.value) } />
                </span>
                <span className='connect-button-box'>
                    <button className='connect-button' onClick={sendFeedback}>Send</button>
                </span>
            </section>
           
        </div>
    )
}

const mapStateToProps = (reduxState) => reduxState.authState

export default connect(mapStateToProps)(Connect)