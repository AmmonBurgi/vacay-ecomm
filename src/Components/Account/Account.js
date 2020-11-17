import React from 'react'
import {connect} from 'react-redux' 

function Account(props){

    console.log(props.user)
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