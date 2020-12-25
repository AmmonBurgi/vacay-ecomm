import React, { useEffect, useState } from 'react'
import {Link, useHistory} from 'react-router-dom'
import {connect} from 'react-redux'
import {getUser} from '../../redux/authReducer'
import {setSearchArray} from '../../redux/searchReducer'
import {getCart} from '../../redux/cartReducer'
import axios from 'axios'

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faSearch} from '@fortawesome/free-solid-svg-icons'
import {faShoppingCart} from '@fortawesome/free-solid-svg-icons'
import {faBars} from '@fortawesome/free-solid-svg-icons'
import {faTimes} from '@fortawesome/free-solid-svg-icons'
import './header.css'

function Header(props){
    const [toggle, setToggle] = useState(true),
        [search, setSearch] = useState(''),
        [phoneToggle, setPhoneToggle] = useState(false)

    const history = useHistory()

    const logoutUser = () => {
        axios.get('/api/logout')
        .then(() => {
            props.getUser({})
            props.getCart([])
        }).catch(err => console.log(err))
    }

    useEffect(() => {
        if(Object.keys(props.authState.user).length === 0){
            axios.get('/api/session')
            .then((res) => {
                props.getUser(res.data)
            }).catch(err => console.log(err))
        }
        if(props.cartState.cart.length === 0){
            axios.get('/api/cart/all').then(res => {
                props.getCart(res.data)
            })
            .catch(err => console.log('Error...', err))
        }    
    }, [])

    const enterKeyPress = (event) => {
        if(event.key === 'Enter' || !event.key ){
            axios.get(`/api/collections/searched/?searchVal=${search}`)
            .then(res => {
                    props.setSearchArray(res.data)
                    setToggle(!toggle)
                    history.push({
                        pathname: '/search',
                        state: {searchResult: search}
                    })
                    setSearch('')
                }).catch(err => console.log('Error...', err))
            }
    }

    const getSum = () => {
        let total = 0;
        if(props.cartState.cart.length !== 0){
            const map = props.cartState.cart.map((element) => parseFloat(element.product_price * element.cart_quantity))
            for(let i in map){
                total += map[i]
            }
        }
        return total.toFixed(2);
    }

    return (
        <div className={toggle === true ? 'header-component' : 'header-search-comp'}>
            <input value={search} onChange={(e) => setSearch(e.target.value)} onKeyPress={enterKeyPress} placeholder='Search our store' className={toggle === true ? 'none-header-search' : 'header-search-box'} />
            <nav className='align-main'>
                <div 
                className='left-section' 
                onClick={() => setToggle(!toggle)}>
                    <FontAwesomeIcon className='search-icon' icon={faSearch}></FontAwesomeIcon>
                    <p className='left-section-button'>Search</p> 
                </div>
                <div className='left-section-phone'>
                    <nav 
                    onClick={() => setPhoneToggle(!phoneToggle)} className='phone-toggle-menu'>
                        {phoneToggle === false ? <FontAwesomeIcon icon={faBars}></FontAwesomeIcon> : <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>}
                        {phoneToggle === false ? <p>Menu</p> : <p>Close Menu</p>}
                    </nav>
                    <hr></hr>
                    <div className={phoneToggle === false ? 'nav-bar-menu-none' : 'nav-bar-menu'}>
                        <nav className='drop-menu-search-box'>
                            <FontAwesomeIcon onClick={enterKeyPress} icon={faSearch}></FontAwesomeIcon>
                            <input value={search} onChange={(e) => setSearch(e.target.value)} onKeyPress={enterKeyPress} placeholder='Search our store' />
                        </nav>
                        <section className='drop-menu-nav-box'>
                            <div className='drop-nav-border'>
                                <Link onClick={() => setPhoneToggle(false)} to='/collections'>SHOP</Link>
                            </div>
                            <div className='drop-nav-border'>
                                <Link onClick={() => setPhoneToggle(false)} to='/story'>OUR STORY</Link>
                            </div>
                            <div className='drop-nav-border'>
                                <Link onClick={() => setPhoneToggle(false)} to='/connect'>CONNECT</Link>
                            </div>
                        </section>
                        <div className='phone-login-align'>
                            {Object.keys(props.authState.user).length !== 0 ? 
                            <p className='link-phone'>Logged In as {props.authState.user.first_name}</p> 
                            : 
                            <Link className='link-phone' onClick={() => setPhoneToggle(false)} to='/account/login'>Login</Link>}
                        </div>
                        <div className='phone-login-align'>
                            {Object.keys(props.authState.user).length !== 0 ? 
                            <Link className='link-phone' to='/' onClick={logoutUser}>Log out</Link>
                            :
                            <Link className='link-phone' onClick={() => setPhoneToggle(false)} to='/account/register'>Create Account</Link>}
                        </div>
                    </div>
                </div>
                <div className='right-section'>
                    {Object.keys(props.authState.user).length !== 0 ? <Link className='link' to='/account'>Logged In as {props.authState.user.first_name}</Link> : <Link className='link' to='/account/login'>Login</Link>}
                    <div className='login-border'></div>
                    {Object.keys(props.authState.user).length !== 0 ? <Link className='link' to='/' onClick={logoutUser}>Log out</Link> :
                    <Link 
                    className='link' 
                    to='/account/register'>Create Account</Link>}
                    <div 
                    onClick={Object.keys(props.authState.user).length !== 0 ? () => history.push('/cart') : () => alert('Please login before accessing cart!')}  
                    id='cart-box' >
                        <FontAwesomeIcon className='cart-icon' icon={faShoppingCart}></FontAwesomeIcon>
                        <p>{props.cartState.cart.length} Cart {getSum() === 0 ? null : `$${getSum()}`}</p>
                    </div>
                </div>
            </nav>
        </div>
    )
}

const mapStateToProps = (reduxState) => reduxState

export default connect(mapStateToProps, { getUser, setSearchArray, getCart })(Header)