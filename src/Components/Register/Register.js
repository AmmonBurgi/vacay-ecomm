import React, {useState} from 'react'
import {getUser} from '../../redux/reducer'
import {connect} from 'react-redux'
import axios from 'axios'

function Register(props){
    const [firstName, setFirst] = useState(''),
        [lastName, setLast] = useState(''),
        [email, setEmail] = useState(''),
        [password, setPassword] = useState('')

    const registerUser = () => {
        axios.post('/api/register', {firstName, lastName, email, password})
        .then(res => {
            props.getUser(res.data)
            props.history.push('/')
        }).catch(err => {
            console.log(err)
            alert(err.response.data)
        })
    }

    return(
        <div>
            <section>
                <p>Register</p>
                <input placeholder='First Name' onChange={(e) => setFirst(e.target.value) } />
                <input placeholder='Last Name' onChange={(e) => setLast(e.target.value)} />
                <input placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
                <input placeholder='Password' type='password' onChange={(e) => setPassword(e.target.value)} />
                <button onClick={registerUser}>Register</button>
            </section>
        </div>
    )
}

export default connect(null, {getUser})(Register)