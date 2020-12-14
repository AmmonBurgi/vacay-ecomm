import React from 'react'
import CheckoutCart from '../CheckoutCart/CheckoutCart'
import './payment.css'

function Payment(props){

    const handleConfirmPurchase = () => {
        props.history.push('/account')
    }

    return(
        <div className='pay-component'>
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
                <div className='pay-front-back-button'>
                        <p onClick={() => props.history.push('/checkout/info')}>&#60; Back To Shipping</p>
                        <button onClick={handleConfirmPurchase}>Confirm Purchase</button>
                    </div>
            </section>
            <section className='pay-right-section' >
                <CheckoutCart />
            </section>
        </div>
    )
}

export default Payment