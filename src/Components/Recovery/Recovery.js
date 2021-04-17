import React, {useState} from 'react'
import axios from 'axios'

import './recovery.css'

function Recovery(props){
    const [email, setEmail] = useState('')

    const handlePasswordReset = () => {
        axios.post('/api/auth/recover', {email})
        .then(() => alert('Email Sent!'))
        .catch((err) => console.log(err))
    }

    return (
        <div className='recover-comp'>
            <div className='recover-header'>
                <p>Password Recovery</p>
                <hr></hr>
            </div>
            <div className='recover-form'>
                <p id='recover-form-title'>Reset Your Password</p>
                <p>We will send you an email to reset your password.</p>
                <nav id='recover-input-wrapper'>
                    <label>Email</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} />
                </nav>
                <button onClick={handlePasswordReset}>Submit</button>
                <p id='recover-cancel-btn' onClick={() => props.history.push('/account/login')}>Cancel</p>
            </div>
        </div>
    )
}

export default Recovery