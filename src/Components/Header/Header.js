import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getUser} from '../../redux/reducer'
import axios from 'axios'

function Header(props){

    const logoutUser = (t) => {
        axios.get('/api/logout')
        .then(() => {
            props.getUser({})
        }).catch(err => console.log(err))
    }

    useEffect(() => {
        if(Object.keys(props.user).length === 0){
            axios.get('/api/session')
            .then((res) => {
                props.getUser(res.data)
            }).catch(err => console.log(err))
        }
        console.log(props.user)
    }, [])

    return (
        <div className='header-component'>
            <button>Search</button>
            {Object.keys(props.user).length !== 0 ? <p>Logged In as {props.user.first_name}</p> : <Link to='/account/login'>Log In</Link>}
            {Object.keys(props.user).length !== 0 ? <Link to='/' onClick={logoutUser}>Log out</Link> :
            <Link to='/account/register' >Create Account</Link>}
            <Link to='/cart'>Cart</Link>
        </div>
    )
}

const mapStateToProps = (reduxState) => reduxState

export default connect(mapStateToProps, {getUser})(Header)