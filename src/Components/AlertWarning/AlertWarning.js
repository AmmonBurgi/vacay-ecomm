import React from 'react'
import './alert.css'

function AlertWarning(props){
    return (
        <div className='alert-component'>
            <div className='message-wrapper'>
                <p>{props.warning}<b onClick={props.pushFunction}>here!</b></p>
            </div>
        </div>
    )
}

export default AlertWarning