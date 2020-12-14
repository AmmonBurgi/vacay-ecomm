import React, {useState} from 'react'
import './shipping.css'
import CheckoutCart from '../CheckoutCart/CheckoutCart'

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faDotCircle} from '@fortawesome/free-solid-svg-icons'

function Shipping(props){
    const [dotToggle, setDot] = useState(true)

    return(
        <div className='ship-component'>
            <section className='ship-left-section' >
                <div className='info-checkout-title'>
                    <p><b id='info-title-color'>Our Planet</b> Our Future</p>
                </div>
                <div className='checkout-purchase-nav'>
                    <p onClick={() => props.history.push('/cart')} className='checkout-nav-no'>Cart</p>
                    <p className='checkout-nav-icon'>&#62;</p>
                    <p onClick={() => props.history.push('/checkout/info/')} className='checkout-nav-no'>Information</p>
                    <p className='checkout-nav-icon'>&#62;</p>
                    <p className='checkout-nav-go'>Shipping</p>
                    <p className='checkout-nav-icon'>&#62;</p>
                    <p onClick={() => props.history.push('/checkout/info/shipping/payment')} className='checkout-nav-no'>Payment</p>
                </div>
                <div className='ship-align-change' >
                    <div className='ship-change-contact'>
                        <nav>
                            <p>Contact</p>
                            <p>{'Email'}</p>
                        </nav>
                        <p id='ship-change-nav' onClick={() => props.history.push('/checkout/info')} >Change</p>
                    </div>
                    <hr></hr>
                    <div className='ship-change-contact'>
                        <nav>
                            <p>Ship To</p>
                            <p>{'Address'}</p>
                        </nav>
                        <p id='ship-change-nav' onClick={() => props.history.push('/checkout/info')}>Change</p>
                    </div>
                </div>
                <div className='ship-method-section'>
                    <p className='ship-method-title'>Shipping Method</p>
                    <div className='ship-method'>
                        <nav>
                            <FontAwesomeIcon icon={faDotCircle} className={dotToggle === true ? 'ship-dot-circle' : 'ship-dot-none'} ></FontAwesomeIcon>
                            <p>Standard Shipping</p>
                        </nav>
                        <p>Free</p>
                    </div>
                </div>
                <div className='ship-front-back-button'>
                        <p onClick={() => props.history.push('/checkout/info')}>&#60; Back To Information</p>
                        <button onClick={() => props.history.push('/checkout/info/shipping/payment')}>Continue to Payment</button>
                </div>
            </section>
            <section className='ship-right-section' >
                <CheckoutCart />
            </section>
        </div>
    )
}

export default Shipping