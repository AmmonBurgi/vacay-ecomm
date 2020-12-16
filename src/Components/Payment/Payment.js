import React from 'react'
import CheckoutCart from '../CheckoutCart/CheckoutCart'
import {connect} from 'react-redux'
import './payment.css'

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faDotCircle} from '@fortawesome/free-solid-svg-icons'

function Payment(props){

    const handleConfirmPurchase = () => {
        props.history.push('/account')
    }

    const {email, address, city, country, zipCode, state} = props.purchaseState.purchaseInfo
    return(
        <div className='pay-component'>
            {Object.keys(props.purchaseState.purchaseInfo).length === 0 ? 
            <div className='ship-left-section-none'>
                 <div className='info-checkout-title'>
                    <p><b id='info-title-color'>Our Planet</b> Our Future</p>
                </div>
                <div className='checkout-purchase-nav'>
                    <p onClick={() => props.history.push('/cart')} className='checkout-nav-no'>Cart</p>
                    <p className='checkout-nav-icon'>&#62;</p>
                    <p onClick={() => props.history.push('/checkout/info')} className='checkout-nav-no'>Information</p>
                    <p className='checkout-nav-icon'>&#62;</p>
                    <p onClick={() => props.history.push('/checkout/info/shipping')} className='checkout-nav-no'>Shipping</p>
                    <p className='checkout-nav-icon'>&#62;</p>
                    <p className='checkout-nav-go'>Payment</p>
                </div>
                <p className='ship-left-none-text'>You're missing information that is needed to finish your purchase! Please finish filling out your information <b onClick={() => props.history.push('/checkout/info')}>here!</b></p>
            </div>    
            :
            <section className='pay-left-section' >
                <div className='info-checkout-title'>
                    <p><b id='info-title-color'>Our Planet</b> Our Future</p>
                </div>
                <div className='checkout-purchase-nav'>
                    <p onClick={() => props.history.push('/cart')} className='checkout-nav-no'>Cart</p>
                    <p className='checkout-nav-icon'>&#62;</p>
                    <p onClick={() => props.history.push('/checkout/info')} className='checkout-nav-no'>Information</p>
                    <p className='checkout-nav-icon'>&#62;</p>
                    <p onClick={() => props.history.push('/checkout/info/shipping')} className='checkout-nav-no'>Shipping</p>
                    <p className='checkout-nav-icon'>&#62;</p>
                    <p className='checkout-nav-go'>Payment</p>
                </div>
                <section className='payment-main'>
                    <div className='pay-shipping-section'>
                        <nav className='pay-ship-info'>
                            <p>Contact</p>
                            <p>{email}</p>
                        </nav>
                        <hr></hr>
                        <nav className='pay-ship-info'>
                            <p>Ship To</p>
                            <p>{`${address}, ${city} ${state} ${zipCode}, ${country}`}</p>
                        </nav>
                        <hr></hr>
                        <nav className='pay-ship-info'>
                            <p>Method</p>
                            <p>Standard Shipping - <b>Free</b></p>
                        </nav>
                    </div>
                    <div className='payment-section'>
                        <p>Payment</p>
                        <p>All transactions are secure and encrypted.</p>
                    </div>
                    <div className='billing-section'>
                        <p>Billing Address</p>
                        <p>Select the address that matches your payment method.</p>
                        <div>

                        </div>
                    </div>
                </section>
                <div className='pay-front-back-button'>
                    <p onClick={() => props.history.push('/checkout/info')}>&#60; Back To Shipping</p>
                    <button onClick={handleConfirmPurchase}>Confirm Purchase</button>
                </div>
            </section>
            }
            <section className='pay-right-section' >
                <CheckoutCart />
            </section>
        </div>
    )
}

const mapStateToProps = (reduxState) => reduxState

export default connect(mapStateToProps)(Payment)