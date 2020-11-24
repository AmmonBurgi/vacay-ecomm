import React, {useEffect} from 'react'
import {connect} from 'react-redux' 
import axios from 'axios'

function Account(props){

    useEffect(() => {
        axios.get('/api/collections/matte').then(() => console.log('hello')).catch(err => console.log(err))
    }, [])
    return (
        <div>
            Account component
        </div>
    )
}

const mapStateToProps = (reduxState) => {
    return reduxState
}

export default connect(mapStateToProps)(Account)