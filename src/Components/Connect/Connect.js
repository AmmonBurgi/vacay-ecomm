import React, {useState} from 'react'
import './connect.css'
import emailjs from 'emailjs-com'

function Connect(){
    const [name, setName] = useState(''),
        [email, setEmail] = useState(''),
        [phone, setPhone] = useState(''),
        [message, setMessage] = useState('')

    const tempParams = {
        to_name: 'Ammon',
        from_name: name,
        from_email: email,
        from_phone: phone,
        message: message
    }

    const sendFeedback = () => {
        emailjs.send('service_4i13xqt', 'template_cjdfeyi', tempParams, 
        'user_TJ1zsDGcnKamDKqHqMJ4s')
        .then((res) => {
            console.log(res.text)
            setName('')
            setEmail('')
            setPhone('')
            setMessage('')
        }).catch(err => console.log('Failed...', err))
    }


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
                    <input id='name' value={name} onChange={(e) => setName(e.target.value) } />
                </span>
                <span>
                    <label htmlFor='email'>Email</label>
                    <input id='email' value={email} onChange={(e) => setEmail(e.target.value) } />
                </span>
                <span>
                    <label htmlFor='phone'>phone number</label>
                    <input id='phone' value={phone} onChange={(e) => setPhone(e.target.value) } />
                </span>
                <span>
                    <label htmlFor='message'>Message</label>
                    <textarea id='message' value={message} onChange={(e) => setMessage(e.target.value) } />
                </span>
                <button onClick={sendFeedback}>Send</button>
            </section>
           
        </div>
    )
}

export default Connect