import React from 'react'
import {Link} from 'react-router-dom'
import './navbar.css'

function NavBar(props){
    return (
        <div className='nav-component'>
            <Link to='/' className='main-link'>
                <p>Live More</p>
                <p>Work Less</p>
            </Link>
            <nav>
                <Link to='/collections'>Shop</Link>
                <Link to='/story'>Our Story</Link>
                <Link to='/connect'>Connect</Link>
            </nav>
        </div>
    )
}

export default NavBar