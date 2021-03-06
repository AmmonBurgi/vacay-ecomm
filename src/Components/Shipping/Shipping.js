import React, {useState, useEffect} from 'react'
import './shipping.css'
import CheckoutCart from '../CheckoutCart/CheckoutCart'
import AlertWarning from '../AlertWarning/AlertWarning'
import {connect} from 'react-redux'

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faDotCircle} from '@fortawesome/free-solid-svg-icons'
import {faShoppingCart} from '@fortawesome/free-solid-svg-icons'
import {faChevronUp} from '@fortawesome/free-solid-svg-icons'
import {faChevronDown} from '@fortawesome/free-solid-svg-icons'

function Shipping(props){
    const [dotToggle, setDot] = useState(true),
            [purchaseInfoToggle, setInfoToggle] = useState(true),
            [totalToggle, setTotalToggle] = useState(false)

    useEffect(() => {
        if(Object.keys(props.purchaseState.purchaseInfo).length === 0){
            setInfoToggle(false)
        }
    }, [])

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

    const {email, address, city, state, zipCode, country} = props.purchaseState.purchaseInfo
    return(
        <div className='ship-component'>
            <section className='ship-left-section' >
                {purchaseInfoToggle === false ? <AlertWarning warning={`You're missing information that is needed to finish your purchase! Please finish filling out your information `} pushFunction={() => props.history.push('/checkout/info')} /> : null}
                <div className='info-checkout-title'>
                    <p><b id='info-title-color'>Our Planet</b> Our Future</p>
                </div>
                <div className='checkout-purchase-nav'>
                    <p onClick={() => props.history.push('/cart')} className='checkout-nav-no'>Cart</p>
                    <p className='checkout-nav-icon'>&#62;</p>
                    <p onClick={() => props.history.push('/checkout/info')} className='checkout-nav-no'>Information</p>
                    <p className='checkout-nav-icon'>&#62;</p>
                    <p className='checkout-nav-go'>Shipping</p>
                    <p className='checkout-nav-icon'>&#62;</p>
                    <p onClick={() => props.history.push('/checkout/info/shipping/payment')} className='checkout-nav-no'>Payment</p>
                </div>
                <div className='ship-align-change' >
                    <div className='ship-change-contact'>
                        <nav>
                            <p>Contact</p>
                            <p>{email || ''}</p>
                        </nav>
                        <p id='ship-change-nav' onClick={() => props.history.push('/checkout/info')} >Change</p>
                    </div>
                    <hr></hr>
                    <div className='ship-change-contact'>
                        <nav>
                            <p>Ship To</p>
                            <p>{`${address}, ${city} ${state} ${zipCode}, ${country}` || ''}</p>
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

            <section className='phone-checkout'>
                <div 
                onClick={() => setTotalToggle(!totalToggle)} 
                className='phone-checkout-toggle' >
                    <nav>
                        <FontAwesomeIcon className='toggle-shopping-cart' icon={faShoppingCart} ></FontAwesomeIcon>
                        {totalToggle === false ? <p>Show Order Summary <FontAwesomeIcon icon={faChevronDown}></FontAwesomeIcon></p> : <p>Hide Order Summary <FontAwesomeIcon icon={faChevronUp}></FontAwesomeIcon></p>}
                    </nav>
                    <p>${getSum()}</p>
                </div>
                <div className={totalToggle === false ? 'no-phone-checkout-wrapper' : 'phone-checkout-wrapper'}>
                    <CheckoutCart />
                </div>
            </section>
        </div>
    )
}

const mapStateToProps = (reduxState) => reduxState

export default connect(mapStateToProps)(Shipping)