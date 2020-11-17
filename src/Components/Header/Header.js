import React, { useEffect } from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getUser} from '../../redux/reducer'

function Header(props){

    useEffect(() => {
        if(Object.keys(props.user).length === 0){
            session()
        }
    }, [])
    return (
        <div className='header-component'>
            <button>Search</button>
            <Link to='/account/login'>Log In</Link>
            <Link to='/account/register' >Create Account</Link>
            <Link to='/cart'>Cart</Link>
        </div>
    )
}

const mapStateToProps = (reduxState) => reduxState

export default connect(mapStateToProps, {getUser})(Header)