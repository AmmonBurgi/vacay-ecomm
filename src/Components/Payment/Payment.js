import React, {useState} from 'react'
import CheckoutCart from '../CheckoutCart/CheckoutCart'
import axios from 'axios'
import {connect} from 'react-redux'
import {CardCvcElement, CardNumberElement, CardExpiryElement, useElements, useStripe} from '@stripe/react-stripe-js'
import AlertWarning from '../AlertWarning/AlertWarning'
import './payment.css'

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faDotCircle} from '@fortawesome/free-solid-svg-icons'

function Payment(props){
    const [total, setTotal] = useState(0),
        [newBillingToggle, setNewBillingToggle] = useState(false),
        [billingToggle, setBillingToggle] = useState(true),
        [firstBill, setFirstBill] = useState(''),
        [lastBill, setLastBill] = useState(''),
        [companyBill, setCompanyBill] = useState(''),
        [addressBill, setAddressBill] = useState(''),
        [apartmentBill, setApartmentBill] = useState(''),
        [cityBill, setCityBill] = useState(''),
        [countryBill, setCountryBill] = useState(''),
        [stateBill, setStateBill] = useState(''),
        [zipBill, setZipBill] = useState(''),
        [phoneBill, setPhoneBill] = useState(''),
        [firstAlert, setFirstAlert] = useState(false),
        [lastAlert, setLastAlert] = useState(false),
        [addressAlert, setAddressAlert] = useState(false),
        [cityAlert, setCityAlert] = useState(false),
        [countryAlert, setCountryAlert] = useState(false),
        [stateAlert, setStateAlert] = useState(false),
        [zipAlert, setZipAlert] = useState(false),
        [mexicoToggle, setMexico] = useState(false),
        [canadaToggle, setCanada] = useState(false),
        [unitedToggle, setUnited] = useState(true)

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
                    card: elements.getElement(CardCvcElement, CardNumberElement, CardExpiryElement),
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

    const handleBillingToggle = () => {
        setBillingToggle(!billingToggle)
        setNewBillingToggle(!newBillingToggle)
    }
    const handleFirstInput = (e) => {
        setFirstAlert(false)
        setFirstBill(e.target.value)
    }
    const handleLastInput = (e) => {
        setLastAlert(false)
        setLastBill(e.target.value)
    }
    const handleAddressInput = (e) => {
        setAddressAlert(false)
        setAddressBill(e.target.value)
    }
    const handleCityInput = (e) => {
        setCityAlert(false)
        setCityBill(e.target.value)
    }
    const handleCountryInput = (event) => {
        setCountryAlert(false)
        setCountryBill(event.target.value)
        if(event.target.value === 'US'){
                setUnited(true)
                setMexico(false)
                setCanada(false)
        }
        if(event.target.value === 'CA'){
            setUnited(false)
            setMexico(false)
            setCanada(true)
        }
        if(event.target.value === 'MX'){
            setUnited(false)
            setMexico(true)
            setCanada(false)
        }
    }
    const handleStateInput = (e) => {
        setStateAlert(false)
        setStateBill(e.target.value)
    }
    const handleZipInput = (e) => {
        setZipAlert(false)
        setZipBill(e.target.value)
    }


    return(
        <div className='pay-component'>
            {Object.keys(props.purchaseState.purchaseInfo).length === 0 ? <AlertWarning warning={`You're missing information that is needed to finish your purchase! Please finish filling out your information `} pushFunction={() => props.history.push('/checkout/info')} /> : null}
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
                        <p id='payment-card-title'>Payment</p>
                        <p>All transactions are secure and encrypted.</p>
                        <div className='stripe-pay-form'>
                            <div>

                            </div>
                            <div className='card-element-wrapper'>
                                <div className='card-list'>
                                    <nav>
                                        <FontAwesomeIcon icon={faDotCircle} className='billing-choice-icon' ></FontAwesomeIcon>
                                        <b>Card</b>
                                    </nav>
                                </div>
                                <CardNumberElement
                                className='number-element'
                                options={{
                                    style: {
                                      base: {
                                        backgroundColor: 'white',
                                        color: 'black',
                                        '::placeholder': {
                                          color: 'grey',
                                        },
                                      },
                                      invalid: {
                                        color: 'salmon'
                                      },
                                    },
                                  }}  
                              />
                                <CardExpiryElement 
                                className='number-element'
                                options={{
                                    style: {
                                      base: {
                                        backgroundColor: 'white',
                                        color: 'black',
                                        '::placeholder': {
                                          color: 'grey',
                                        },
                                      },
                                      invalid: {
                                        color: 'salmon',
                                      },
                                    },
                                  }}  
                                />
                                <CardCvcElement 
                                className='number-element'
                                options={{
                                    style: {
                                      base: {
                                        backgroundColor: 'white',
                                        color: 'black',
                                        '::placeholder': {
                                          color: 'grey',
                                        },
                                      },
                                      invalid: {
                                        color: 'salmon',
                                      },
                                    },
                                  }}  
                                />
                            </div>
                        </div>
                    </div>
                    <div className='billing-section'>
                        <p id='payment-card-title'>Billing Address</p>
                        <p>Select the address that matches your payment method.</p>
                        <div className='billing-choice-wrapper'>
                            <nav className='billing-choice-align'>
                                <FontAwesomeIcon onClick={billingToggle === false ? handleBillingToggle : null} className={billingToggle === true ? 'billing-choice-icon' : 'no-billing-choice-icon'} icon={faDotCircle} ></FontAwesomeIcon>
                                <p>Same as shipping address</p>
                            </nav>
                            <hr></hr>
                            <nav className='billing-choice-align'>
                                <FontAwesomeIcon onClick={newBillingToggle === false ? handleBillingToggle : null} className={newBillingToggle === true ? 'billing-choice-icon' : 'no-billing-choice-icon'} icon={faDotCircle} ></FontAwesomeIcon>
                                <p>Use a different billing address</p>
                            </nav>
                            <div className={newBillingToggle === true ? 'billing-input-wrapper' : 'none'}>
                                  <nav className='pay-align-first-last'>
                                    <div
                                    className={firstBill.length === 0 ? (firstAlert === false ? 'pay-box-input' : 'alert-pay-box') : (firstAlert === false ? 'pay-box-input-init' : 'alert-pay-box-input-init')}
                                    >
                                        <p>First Name</p>
                                        <input 
                                        onChange={(e) => handleFirstInput(e)} placeholder='First Name' />
                                    </div>
                                    <div>
                                        <p>Last Name</p>
                                        <input 
                                        onChange={(e) => handleLastInput(e)}
                                        placeholder='Last Name' />
                                    </div>
                                  </nav>
                                  <div>
                                      <p>Company (optional)</p>
                                      <input
                                      onChange={(e) => setCompanyBill(e.target.value)}
                                      placeholder='Company (optional)' />
                                  </div>
                                  <div>
                                      <p>Address</p>
                                      <input 
                                      onChange={(e) => handleAddressInput(e)}
                                      placeholder='Address' />
                                  </div>
                                  <div>
                                      <p>Apartment, suite, etc. (optional)</p>
                                      <input
                                      onChange={(e) => setApartmentBill(e.target.value)}
                                      placeholder='Apartment, suite, etc.' />
                                  </div>
                                  <div>
                                      <p>City</p>
                                      <input
                                      onChange={(e) => handleCityInput(e)}
                                      placeholder='City' />
                                  </div>
                                  <nav>
                                      <div>
                                          <p>Country/Region</p>
                                          <select onChange={(e) => handleCountryInput(e)}>

                                          </select>
                                      </div>
                                      <div>
                                          <p>State</p>
                                          <select onChange={(e) => handleCityInput(e)}>

                                          </select>
                                      </div>
                                      <div>
                                          <p>Zip Code</p>
                                          <input
                                          onChange={(e) => handleZipInput(e)}
                                          placeholder='Zip Code' />
                                      </div>
                                  </nav>
                                  <div>
                                      <p>Phone (optional)</p>
                                      <input placeholder='Phone (optional)' />
                                  </div>
                            </div>
                        </div>
                    </div>
                </section>
                <div className='pay-front-back-button'>
                    <p onClick={() => props.history.push('/checkout/info')}>&#60; Back To Shipping</p>
                    <button onClick={handleConfirmPurchase}>Confirm Purchase</button>
                </div>
            </section>
            <section className='pay-right-section' >
                <CheckoutCart getTotalFunction={getTotal} />
            </section>
        </div>
    )
}

const mapStateToProps = (reduxState) => reduxState

export default connect(mapStateToProps)(Payment)