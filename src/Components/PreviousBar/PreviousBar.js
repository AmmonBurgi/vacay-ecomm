import React, {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'

function PreviousBar(){
    const [toggleAllCollect, setAllCollect] = useState(false),
        [toggleCollect, setCollect] = useState(false)
        
    const history = useHistory()
    const {pathname} = history.location

    useEffect(() => {
        if(pathname === '/collection'){
            return setCollect(true)
        }
        if(pathname === '/collections/all' || pathname === '/collections/matte' || pathname === '/collections/polarized' || pathname === '/collections/prescription'){
            return setAllCollect(true)
        }
        setAllCollect(false)
        setCollect(false)
    }, [history])

    return (
        <div>
            {toggleAllCollect === true ? <p>Home-Collection-All</p> : null}
            {toggleCollect === true ? <p>Home-Collection</p> : null}
        </div>
    )
}

export default PreviousBar