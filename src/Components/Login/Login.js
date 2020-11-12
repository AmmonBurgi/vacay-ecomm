import React, {useState} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {getUser} from '../../redux/reducer'

function Login(props){
    const [email, setEmail] = useState(''),
        [password, setPassword] = useState('')

    const loginUser = () => {
        axios.post('/api/login', {email, password})
        .then((res) => {
            props.getUser(res.data)
            props.history.push('/')
        })
    }

    return(
        <div>
            <section>
                <p>Login</p>
                <input placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
                <input placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
                <button>Login</button>
            </section>
        </div>
    )
}

export default connect(null, {getUser})(Login)