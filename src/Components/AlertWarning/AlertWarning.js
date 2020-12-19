import React, {useEffect, useState} from 'react'
import './alert.css'

function AlertWarning(props){
   const [toggle, setToggle] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => {
            setToggle(true)
        }, 100);
        return () => clearTimeout(timer)
    }, [])

    return (
        <div className='alert-component'>
            <div className={toggle === true ? 'message-wrapper' : 'no-wrapper'}>
                <p>{props.warning}<b onClick={props.pushFunction}>here!</b></p>
            </div>
        </div>
    )
}

export default AlertWarning