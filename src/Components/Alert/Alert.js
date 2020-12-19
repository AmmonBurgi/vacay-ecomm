import React from 'react'
import './alert.css'

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faTimes} from '@fortawesome/free-solid-svg-icons'

function Alert({warning, setAlertToggle}){
    return (
        <div className='alert-component'>
            <p>{warning}</p>
            <FontAwesomeIcon icon={faTimes} onClick={() => setAlertToggle(false)} ></FontAwesomeIcon>
        </div>
    )
}

export default Alert