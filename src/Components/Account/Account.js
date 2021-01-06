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

    const historyMap = history.map((element, index) => {
       const productMap = products.map((e, i) => {
            if(e.history_id === element.history_id){
                return (
                    <div className='history-products' index={i}>
                        <nav className='account-align-product-img'>
                            <div>{e.pro_quantity}</div>
                            <img src={e.product_img} alt={e.product_title} />
                            <p>{e.product_title}</p>
                        </nav>
                        <p>$ {e.product_price}</p>
                    </div>
                )
            }
        })
        const filter = element.date_purchased.split('').filter((element, index) => index < 10)
        return (
            <div className='history-element' key={index} >
                <div className='account-tag-columns'>
                    <p><b>Date Purchased:</b> {filter.join('')}</p>
                    {/* <p>Shipping Address: {`${element.first_address} ${element.last_address !== null ? `${element.last_address }` : ` `}, ${element.city}`}</p> */}
                    <p><b>Shipping Address:</b> {`${element.first_address}, ${element.city} ${element.state} ${element.zip}, ${element.country}`}</p>
                </div>
                <hr></hr>
                <div className='product-list'>
                    {productMap}
                </div>
            </div>
        )
    })

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
                <div className='my-account-tag'>
                    <p>My Account</p>
                    <hr></hr>
                </div>
                <p className='order-tag'>Order History</p>
                {historyMap}
            </div>
            )}
        </div>
    )
}

const mapStateToProps = (reduxState) => {
    return reduxState
}

export default connect(mapStateToProps)(Account)