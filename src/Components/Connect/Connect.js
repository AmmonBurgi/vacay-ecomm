import React, {useState} from 'react'
import './connect.css'

function Connect(){
    const [name, setName] = useState(''),
        [email, setEmail] = useState(''),
        [phone, setPhone] = useState(''),
        [message, setMessage] = useState('')


    return(
        <div className='connect-comp'>
            <header className='connect-header'>
                <p>Connect</p>
                <hr></hr>
            </header>
            <span>
                <img className='connect-img' src={'https://cdn.shopify.com/s/files/1/0966/8778/files/Heber_green_office_copy_2048x2048.JPG?11444278074833745647'} />
                <p>PRESS AND PRODUCT REQUESTS? PLEASE DROP US A NOTE.<br></br>SALES INQUIRES - hello@vacaysunglasses.com</p>
            </span>

            <section className='connect-main'>
                <span>
                    <label htmlFor='name'>Name</label>
                    <input id='name' onChange={(e) => setName(e.target.value) } />
                </span>
                <span>
                    <label htmlFor='email'>Email</label>
                    <input id='email' onChange={(e) => setEmail(e.target.value) } />
                </span>
                <span>
                    <label htmlFor='phone'>phone number</label>
                    <input id='phone' onChange={(e) => setPhone(e.target.value) } />
                </span>
                <span>
                    <label htmlFor='message'>Message</label>
                    <textarea id='message' onChange={(e) => setMessage(e.target.value) } />
                </span>
                <button>Send</button>
            </section>
           
        </div>
    )
}

export default Connect