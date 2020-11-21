import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getUser} from '../../redux/reducer'
import axios from 'axios'

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faSearch} from '@fortawesome/free-solid-svg-icons'
import './header.css'

function Header(props){
    const [toggle, setToggle] = useState(true)

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
    }, [])

    return (
        <div className={toggle === true ? 'header-component' : 'header-search-comp'}>
            <input className={toggle === true ? 'none-header-search' : 'header-search-box'} />
            <nav className='align-main'>
                <div className='left-section' onClick={() => setToggle(!toggle)}>
                <FontAwesomeIcon className='search-icon' icon={faSearch}></FontAwesomeIcon>
                <button className='left-section-button'>Search</button> 
                </div>
                <nav className='right-section'>
                    {Object.keys(props.user).length !== 0 ? <p className='user'>Logged In as {props.user.first_name}</p> : <Link className='link' to='/account/login'>Log In</Link>}
                    <div className='login-border'></div>
                    {Object.keys(props.user).length !== 0 ? <Link className='link' to='/' onClick={logoutUser}>Log out</Link> :
                    <Link className='link' to='/account/register'>Create Account</Link>}
                    <Link className='link' to='/cart'>Cart</Link>
                </nav>
            </nav>
        </div>
    )
}

const mapStateToProps = (reduxState) => reduxState

export default connect(mapStateToProps, {getUser})(Header)