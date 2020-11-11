import React, {useState} from 'react'
import axios from 'axios'

function Landing(){
    const [message, setMessage] = useState('')

    const getMessage = () => {
        axios.get(`/api/stuff/?hello=${'hello'}`)
        .then(res => {
            console.log(res)
            setMessage(res.data)
        })
        .catch(err => console.log(err))
    }

    return (
        <div>
            Landing Component
            <button onClick={getMessage}>Get</button>
            <p>{message}</p>
        </div>
    )
}

export default Landing