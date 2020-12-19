import React, {useState} from 'react'
import CheckoutCart from '../CheckoutCart/CheckoutCart'
import axios from 'axios'
import {connect} from 'react-redux'
import {CardElement, useElements, useStripe} from '@stripe/react-stripe-js'
import './payment.css'

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faDotCircle} from '@fortawesome/free-solid-svg-icons'

function Payment(props){
    const [total, setTotal] = useState(0)

    const stripe = useStripe(),
        elements = useElements()

    const {firstName, lastName, company, apartment, phone, email, address, city, country, zipCode, state} = props.purchaseState.purchaseInfo

    const getTotal = (sum) => {
        setTotal(sum)
    }
        
    const handleConfirmPurchase = () => {
        axios.post('/api/payment/intent', {email, total})
        .then(async (res) => {
            console.log(res.data)
            const result = await stripe.confirmCardPayment((res.data), {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: {
                        address: {
                            city: city,
                            country: country,
                            postal_code: zipCode,
                            state: state,
                            line1: address,
                            line2: apartment !== null || apartment !== undefined ? apartment : null
                        },
                        email: email,
                        name: `${firstName} ${lastName}`,
                        phone: phone !== null || phone !== undefined ? phone : null 
                    }
                }
            })
            if(result.error){
                console.log(result.error)
            } else (
                console.log(result.paymentIntent.status)
            )
            props.history.push('/account')
        }).catch(err => console.log(err))
    }

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
                        <div className='stripe-pay-form'>
                            <div>

                            </div>
                            <div className='card-element-wrapper'>
                                <CardElement />
                            </div>
                        </div>
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
                <CheckoutCart getTotalFunction={getTotal} />
            </section>
        </div>
    )
}

const mapStateToProps = (reduxState) => reduxState

export default connect(mapStateToProps)(Payment)