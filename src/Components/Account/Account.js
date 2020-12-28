import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux' 
import axios from 'axios'
import './account.css'

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faInstagram} from '@fortawesome/free-brands-svg-icons'
import {faPinterest} from '@fortawesome/free-brands-svg-icons'

function Account(props){
    const [products, setProducts] = useState([]),
        [history, setHistory] = useState([])

    useEffect(() => {
        axios.get('/api/purchase/history')
        .then(res => {
            setProducts(res.data.products)
            setHistory(res.data.historyArr)
        })
    }, [])

    const productMap = products.map((element, index) => {
        console.log(element)
        return (
            <div key={index} >
                <p>{element.product_title}</p>
            </div>
        )
    })
    const historyMap = history.map((element, index) => {
        console.log(element)
        return (
            <div key={index} >
                <p>{element.date_purchased}</p>
            </div>
        )
    })

    console.log(products)
    console.log(history)
    return (
        <div className='account-component'>
           <div className='account-prev'>
                <nav className='account-prev-left'>
                    <p className='account-prev-home' onClick={() => props.history.push('/')}>Home </p>
                    <p className='account-prev-arrow'>&#62;</p>
                    <p className='account-prev-arrow'>My account</p>
                </nav>
                <nav className='account-icons'>
                    <a href='https://www.instagram.com/livemoreworkless/' >
                        <FontAwesomeIcon icon={faInstagram}></FontAwesomeIcon>
                    </a>
                    <a href='https://www.pinterest.com/vacaysunglasses/' >
                        <FontAwesomeIcon icon={faPinterest}></FontAwesomeIcon>
                    </a>
                </nav>
            </div>
            {Object.keys(props.authState.user).length === 0 ? 
            (
            <div className='no-account-component'>
                <div className='my-account-tag'>
                    <p>My Account</p>
                    <hr></hr>
                </div>
                <p className='no-account-text'>Please Login <b onClick={() => props.history.push('/account/login')}>here</b> to access your account!</p>
            </div>
            )
            : 
            (
            <div className='account-main'>
                <p>Order History</p>
                {}
            </div>
            )}
        </div>
    )
}

const mapStateToProps = (reduxState) => {
    return reduxState
}

export default connect(mapStateToProps)(Account)