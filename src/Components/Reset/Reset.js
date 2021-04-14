import React, {useEffect, useState} from 'react'
import axios from 'axios'

function Reset(props){
    const [passOne, setPassOne] = useState(''),
        [passTwo, setPassTwo] = useState(''),
        [tokenConfirmed, setTokenConfirmed] = useState(false)

    useEffect(() => {
        const email = props.match.params.token.split('---')[1]
        const token = props.match.params.token.split('---')[0]
        axios.post(`/api/auth/check`, {email, token})
        .then(res => {
            console.log(res.data)
        }).catch(err => console.log(err))
    }, [])

    return (
        <div>
            {props.match.params.token}
        </div>
    )
}

export default Reset