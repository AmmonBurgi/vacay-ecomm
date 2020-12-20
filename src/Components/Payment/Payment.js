import React, {useState} from 'react'
import CheckoutCart from '../CheckoutCart/CheckoutCart'
import axios from 'axios'
import {connect} from 'react-redux'
import {CardCvcElement, CardNumberElement, CardExpiryElement, useElements, useStripe} from '@stripe/react-stripe-js'
import AlertWarning from '../AlertWarning/AlertWarning'
import './payment.css'

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faDotCircle} from '@fortawesome/free-solid-svg-icons'
import {faSortDown} from '@fortawesome/free-solid-svg-icons'

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
        const cart = props.cartState.cart
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
                // console.log(result.paymentIntent.status)
                axios.post('/api/purchase/history', {address, apartment, city, country, zipCode, state, cart})
                .then((response) => {
                    props.history.push('/account')
                }).catch(err => console.log('Error...', err))
            )
            
        }).catch(err => console.log(err))
    }

    const unitedStates = 
    ['Alabama','Alaska','American Samoa','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Federated States of Micronesia','Florida','Georgia','Guam','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Marshall Islands','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Northern Mariana Islands','Ohio','Oklahoma','Oregon','Palau','Pennsylvania','Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virgin Island','Virginia','Washington','West Virginia','Wisconsin','Wyoming']

    const canadianProvinces = ['Alberta', 'British Columbia', 'Manitoba', 'New Brunswick', 'Newfoundland and Labrador', 'Northwest Territories', 'Nova Scotia', 'Nunavut', 'Ontario', 'Prince Edward Island', 'Quebec', 'Saskatchewan', 'Yukon Territory']

    const mexicoStates = ['mexico']

    const unitedMap = unitedStates.map((element, index) => {
        return(
            <option key={index} value={element}>{element}</option>
        )
    })
    const canadaMap = canadianProvinces.map((element, index) => {
        return(
            <option key={index} value={element}>{element}</option>
        )
    })
    const mexicoMap = mexicoStates.map((element, index) => {
        return(
            <option key={index} value={element}>{element}</option>
        )
    })


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
                                        <p className={firstBill.length === 0 ? 'bill-label-none' : 'bill-label'}>First Name</p>
                                        <input 
                                        className={firstBill.length === 0 ? 'bill-none-input' : 'bill-input'}
                                        onChange={(e) => handleFirstInput(e)} placeholder='First Name' />
                                    </div>

                                    <div className={lastBill.length === 0 ? (lastAlert === false ? 'pay-box-input' : 'alert-pay-box') : (lastAlert === false ? 'pay-box-input-init' : 'alert-pay-box-input-init')}
                                    >
                                        <p className={lastBill.length === 0 ? 'bill-label-none' : 'bill-label'}>Last Name</p>
                                        <input 
                                        className={lastBill.length === 0 ? 'bill-none-input' : 'bill-input'}
                                        onChange={(e) => handleLastInput(e)}
                                        placeholder='Last Name' />
                                    </div>

                                  </nav>
                                  <p id={firstAlert === false ? 'none' : 'bill-warning'} >Invalid First Name!</p>
                                  <p id={lastAlert === false ? 'none' : 'bill-warning'} >Invalid Last Name!</p>

                                  <div className={companyBill.length === 0 ? 'pay-box-input' : 'pay-box-input-init'}>
                                      <p className={companyBill.length === 0 ? 'bill-label-none' : 'bill-label'}>Company (optional)</p>
                                      <input
                                      className={companyBill.length === 0 ? 'bill-none-input' : 'bill-input'}
                                      onChange={(e) => setCompanyBill(e.target.value)}
                                      placeholder='Company (optional)' />
                                  </div>

                                  <div className={addressBill.length === 0 ? (addressAlert === false ? 'pay-box-input' : 'alert-pay-box') : (addressAlert === false ? 'pay-box-input-init' : 'alert-pay-box-input-init')}
                                  >
                                      <p className={addressBill.length === 0 ? 'bill-label-none' : 'bill-label'}>Address</p>
                                      <input 
                                      className={addressBill.length === 0 ? 'bill-none-input' : 'bill-input'}
                                      onChange={(e) => handleAddressInput(e)}
                                      placeholder='Address' />
                                  </div>

                                  <p id={addressAlert === false ? 'none' : 'bill-warning'} >Invalid Address!</p>

                                  <div className={apartmentBill.length === 0 ? 'pay-box-input' : 'pay-box-input-init'}>
                                      <p className={apartmentBill.length === 0 ? 'bill-label-none' : 'bill-label'}>Apartment, suite, etc. (optional)</p>
                                      <input
                                      className={apartmentBill.length === 0 ? 'bill-none-input' : 'bill-input'}
                                      onChange={(e) => setApartmentBill(e.target.value)}
                                      placeholder='Apartment, suite, etc.' />
                                  </div>

                                  <div className={cityBill.length === 0 ? (cityAlert === false ? 'pay-box-input' : 'alert-pay-box') : (cityAlert === false ? 'pay-box-input-init' : 'alert-pay-box-input-init')}
                                  >
                                      <p className={cityBill.length === 0 ? 'bill-label-none' : 'bill-label'}>City</p>
                                      <input
                                      className={cityBill.length === 0 ? 'bill-none-input' : 'bill-input'}
                                      onChange={(e) => handleCityInput(e)}
                                      placeholder='City' />
                                  </div>

                                  <p id={cityAlert === false ? 'none' : 'bill-warning'} >Invalid City!</p>

                                  <nav className='bill-location-wrapper'>
                                      <div className={countryBill.length === 0 ? (countryAlert === false ? 'pay-box-input' : 'alert-pay-box') : (countryAlert === false ? 'pay-box-input-init' : 'alert-pay-box-input-init')}
                                      >
                                          <p className={countryBill.length === 0 ? 'bill-label-none' : 'bill-label'}>Country/Region</p>
                                          <select className='bill-states' onChange={(e) => handleCountryInput(e)}>
                                            <option value={'US'} >United States</option>
                                            <option value={'CA'} >Canada</option>
                                            <option value={'MX'} >Mexico</option>
                                          </select>
                                          <FontAwesomeIcon className='dropdown-arrow-bill' icon={faSortDown}></FontAwesomeIcon>
                                      </div>
                                      <div className={stateBill.length === 0 ? (stateAlert === false ? 'pay-box-input' : 'alert-pay-box') : (stateAlert === false ? 'pay-box-input-init' : 'alert-pay-box-input-init')}
                                      >
                                          <p className={stateBill.length === 0 ? 'info-none' : 'info-label'} >{canadaToggle === true ? 'Provinces' : 'States'}</p>
                                          <select value={stateBill} className={unitedToggle === true ? 'bill-states' : 'bill-none'} onChange={(e) => handleCityInput(e)}>
                                              <option value={''}>State</option>
                                            {unitedMap}
                                          </select>
                                          <FontAwesomeIcon className='dropdown-arrow-bill' icon={faSortDown}></FontAwesomeIcon>
                                          <select value={stateBill}  className={canadaToggle === true ? 'bill-states' : 'bill-none'} onChange={(e) => handleCityInput(e)}>
                                            <option value={''} >Province</option>
                                            {canadaMap}
                                          </select>
                                          <select value={stateBill} className={mexicoToggle === true ? 'bill-states' : 'bill-none'} onChange={(e) => handleCityInput(e)}>
                                              <option value={''} >State</option>
                                            {mexicoMap}
                                          </select>
                                      </div>
                                      <div className={zipBill.length === 0 ? (zipAlert === false ? 'pay-box-input' : 'alert-pay-box') : (zipAlert === false ? 'pay-box-input-init' : 'alert-pay-box-input-init')}>
                                          <p className={zipBill.length === 0 ? 'bill-label-none' : 'bill-label'} >Zip Code</p>
                                          <input
                                          value={zipBill}
                                          className={zipBill.length === 0 ? 'bill-none-input' : 'bill-input'}
                                          onChange={(e) => handleZipInput(e)}
                                          placeholder='Zip Code' />
                                      </div>
                                  </nav>

                                  <p id={countryAlert === false ? 'none' : 'bill-warning'} >Invalid Country/Region!</p>
                                  <p id={stateAlert === false ? 'none' : 'bill-warning'} >Invalid State/Province!</p>
                                  <p id={zipAlert === false ? 'none' : 'bill-warning'} >Invalid Zip/Postal Code!</p>

                                  <div className={phoneBill.length === 0 ? 'pay-box-input' : 'pay-box-input-init'}>
                                      <p className={phoneBill.length === 0 ? 'bill-label-none' : 'bill-label'} >Phone (optional)</p>
                                      <input
                                      value={phoneBill}
                                      className={phoneBill.length === 0 ? 'bill-none-input' : 'bill-input'}
                                      onChange={(e) => setPhoneBill(e.target.value)}
                                      placeholder='Phone (optional)' />
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