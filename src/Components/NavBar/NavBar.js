import React from 'react'
import {Link} from 'react-router-dom'
import './navbar.css'

function NavBar(props){
    return (
        <div className='nav-component'>
            <Link to='/' className='main-link'>
                <p className='planet'>OUR PLANET</p>
                <p className='future'>OUR FUTURE</p>
            </Link>
            <nav className='nav-links'>
                <Link to='/collections'>SHOP</Link>
                <Link to='/story'>OUR STORY</Link>
                <Link to='/connect'>CONNECT</Link>
            </nav>
        </div>
    )
}

export default NavBar