import React, {useEffect, useState} from 'react'
import axios from 'axios'

function Reset(props){
    const [passOne, setPassOne] = useState(''),
        [passTwo, setPassTwo] = useState(''),
        [tokenConfirmed, setTokenConfirmed] = useState(true)

    useEffect(() => {
        const email = props.match.params.token.split('---')[1]
        const token = props.match.params.token.split('---')[0]
        axios.post(`/api/auth/check`, {email, token})
        .then(res => {
            if(res.data.expired === true){
                setTokenConfirmed(false)
            }
            console.log(res.data.response)
        }).catch(err => console.log(err))
    }, [])

    const handlePasswordChange = () => {
        if(passOne.length < 6){
            return alert('Password Invalid! Please try a different password!')
        }
        if(passOne !== passTwo){
            return alert('Passwords need to match!')
        }
    }

    return (
        <div>
            <div>
                <p>Password Reset</p>
                <hr></hr>
            </div>
            {tokenConfirmed === false ? 
            <p>This Page has expired!</p>
            :
            <div>
                <nav>
                    <label>New Password</label>
                    <input 
                    type='password'
                    value={passOne}
                    onChange={(e) => setPassOne(e.target.value)} />
                </nav>
                <nav>
                    <label>Confirm New Password</label>
                    <input
                    type='password'
                    value={passTwo}
                    onChange={(e) => setPassTwo(e.target.value)} />
                </nav>
                <button onClick={handlePasswordChange}>Confirm</button>
            </div>
            }
        </div>
    )
}

export default Reset