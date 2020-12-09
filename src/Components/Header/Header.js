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
import './header.css'

function Header(props){
    const [toggle, setToggle] = useState(true),
        [search, setSearch] = useState('')

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
                console.log(res.data)
            })
            .catch(err => console.log('Error...', err))
        }    
    }, [])

    const enterKeyPress = (event) => {
        if(event.key === 'Enter'){
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
            const map = props.cartState.cart.map((element) => parseFloat(element.cart_price))
            for(let i in map){
                total += map[i]
            }
        }
        return total;
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
                <nav className='right-section'>
                    {Object.keys(props.authState.user).length !== 0 ? <p className='link'>Logged In as {props.authState.user.first_name}</p> : <Link className='link' to='/account/login'>Log In</Link>}
                    <div className='login-border'></div>
                    {Object.keys(props.authState.user).length !== 0 ? <Link className='link' to='/' onClick={logoutUser}>Log out</Link> :
                    <Link 
                    className='link' 
                    to='/account/register'>Create Account</Link>}
                    <div 
                    onClick={Object.keys(props.authState.user).length !== 0 ? () => history.push('/cart') : () => alert('Please login before accessing cart!')}  
                    className='cart-box' >
                        <FontAwesomeIcon className='cart-icon' icon={faShoppingCart}></FontAwesomeIcon>
                        <p>{props.cartState.cart.length} Cart {getSum() === 0 ? null : `$${getSum()}`}</p>
                    </div>
                </nav>
            </nav>
        </div>
    )
}

const mapStateToProps = (reduxState) => reduxState

export default connect(mapStateToProps, { getUser, setSearchArray, getCart })(Header)