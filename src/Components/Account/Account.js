import React, {useEffect} from 'react'
import {connect} from 'react-redux' 
import axios from 'axios'

function Account(props){

    useEffect(() => {
        axios.get('/api/purchase/history').then(res => console.log(res.data))
        .catch(err => console.log(err))
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