import React, { useState } from 'react'
import axios from 'axios'
import CheckoutCart from '../CheckoutCart/CheckoutCart'
import {connect} from 'react-redux'
import './information.css'

function Information(props){
    const [emailInfo, setEmailInfo] = useState(props.authState.user.email || ''),
        [firstNameInfo, setInfoFirst] = useState(props.authState.user.first_name || ''),
        [lastNameInfo, setInfoLast] = useState(props.authState.user.last_name || ''),
        [companyInfo, setInfoCompany] = useState(''),
        [addressInfo, setInfoAddress] = useState(''),
        [apartmentInfo, setInfoApartment] = useState(''),
        [cityInfo, setInfoCity] = useState(''),
        [countryInfo, setInfoCountry] = useState(''),
        [stateInfo, setInfoState] = useState(''),
        [zipInfo, setInfoZip] = useState(''),
        [phoneInfo, setInfoPhone] = useState(props.authState.user.phone || '')

        console.log(emailInfo)
    return (
        <div className='information-component'>
            <section className='info-left-section'>
                <div className='info-checkout-title'>
                    <p><b id='info-title-color'>Our Planet</b> Our Future</p>
                </div>
                <div className='checkout-purchase-nav'>
                    <p onClick={() => props.history.push('/cart')} className='checkout-nav-no'>Cart</p>
                    <p className='checkout-nav-icon'>&#62;</p>
                    <p className='checkout-nav-go'>Information</p>
                    <p className='checkout-nav-icon'>&#62;</p>
                    <p onClick={() => props.history.push('/checkout/info/shipping')} className='checkout-nav-no'>Shipping</p>
                    <p className='checkout-nav-icon'>&#62;</p>
                    <p onClick={() => props.history.push('/checkout/info/shipping/payment')} className='checkout-nav-no'>Payment</p>
                </div>
                <div className='info-contact-align'>
                    <p className='info-title-tag'>Contact Information</p>
                    <div id='info-input-box' className={emailInfo.length === 0 ? 'info-input-box' : 'info-input-box-initial'}>
                        <p className={emailInfo.length === 0 ? 'info-none' : 'info-label'} >Email</p>
                        <input 
                        placeholder='Email'
                        className={emailInfo.length === 0 ? 'info-none-input' : 'info-label-input'} 
                        value={emailInfo} 
                        onChange={(e) => setEmailInfo(e.target.value)} />
                    </div>
                </div>
                <section className='info-shipping-section'>
                    <p className='info-title-tag'>Shipping Address</p>
                    <nav className='info-align-first-last'>
                        <div id='info-first-box' className={firstNameInfo.length === 0 ? 'info-input-box' : 'info-input-box-initial'}>
                            <p className={firstNameInfo.length === 0 ? 'info-none' : 'info-label'} >First Name</p>
                            <input 
                            placeholder='First Name'
                            className={firstNameInfo.length === 0 ? 'info-none-input' : 'info-label-input'} 
                            value={firstNameInfo} 
                            onChange={(e) => setInfoFirst(e.target.value)} />
                        </div>
                        <div id='info-last-box' className={lastNameInfo.length === 0 ? 'info-input-box' : 'info-input-box-initial'}>
                            <p className={lastNameInfo.length === 0 ? 'info-none' : 'info-label'} >Last Name</p>
                            <input 
                            placeholder='Last Name'
                            className={lastNameInfo.length === 0 ? 'info-none-input' : 'info-label-input'} value={lastNameInfo} 
                            onChange={(e) => setInfoLast(e.target.value)} />
                        </div>
                    </nav>
                    <div id='info-company-box' className={companyInfo.length === 0 ? 'info-input-box' : 'info-input-box-initial'}>
                        <p className={companyInfo.length === 0 ? 'info-none' : 'info-label'} >Company (optional)</p>
                        <input 
                        value={companyInfo}
                        placeholder='Company (optional)'
                        className={companyInfo.length === 0 ? 'info-none-input' : 'info-label-input'} 
                        onChange={(e) => setInfoCompany(e.target.value)} />
                    </div>
                    <div id='info-address-box' className={addressInfo.length === 0 ? 'info-input-box' : 'info-input-box-initial'}>
                        <p className={addressInfo.length === 0 ? 'info-none' : 'info-label'} >Address</p>
                        <input 
                        value={addressInfo}
                        placeholder='Address'
                        className={addressInfo.length === 0 ? 'info-none-input' : 'info-label-input'}onChange={(e) => setInfoAddress(e.target.value)} />
                    </div>
                    <div id='info-apartment-box' className={apartmentInfo.length === 0 ? 'info-input-box' : 'info-input-box-initial'}>
                        <p className={apartmentInfo.length === 0 ? 'info-none' : 'info-label' }>Apartment, suite, etc.(optional)</p>
                        <input 
                        value={apartmentInfo}
                        placeholder='Apartment, suite, etc.(optional)'
                        className={apartmentInfo.length === 0 ? 'info-none-input' : 'info-label-input'} onChange={(e) => setInfoApartment(e.target.value)} />
                    </div>
                    <div id='info-city-box' className={cityInfo.length === 0 ? 'info-input-box' : 'info-input-box-initial'}>
                        <p className={cityInfo.length === 0 ? 'info-none' : 'info-label'}>City</p>
                        <input 
                        value={cityInfo}
                        placeholder='City'
                        className={cityInfo.length === 0 ? 'info-none-input' : 'info-label-input'} 
                        onChange={(e) => setInfoCity(e.target.value)} />
                    </div>
                    <nav className='info-align-location'>
                        <div id='info-country-box' className={countryInfo.length === 0 ? 'info-input-box' : 'info-input-box-initial'}>
                            <p className={countryInfo.length === 0 ? 'info-none' : 'info-label'} >Country/Region</p>
                            <input
                             value={countryInfo}
                             placeholder='Country/Region'
                             className={countryInfo.length === 0 ? 'info-none-input' : 'info-label-input'}
                             onChange={(e) => setInfoCountry(e.target.value)} />
                        </div>
                        <div id='info-state-box' className={stateInfo.length === 0 ? 'info-input-box' : 'info-input-box-initial'}>
                            <p className={stateInfo.length === 0 ? 'info-none' : 'info-label'} >State</p>
                            <input 
                            value={stateInfo}
                            placeholder='State'
                            className={stateInfo.length === 0 ? 'info-none-input' : 'info-label-input'}
                            onChange={(e) => setInfoState(e.target.value)} />
                        </div>
                        <div id='info-zip-box' className={zipInfo.length === 0 ? 'info-input-box' : 'info-input-box-initial'}>
                            <p className={zipInfo.length === 0 ? 'info-none' : 'info-label'} >Zip Code</p>
                            <input 
                            value={zipInfo}
                            placeholder='Zip Code'
                            className={zipInfo.length === 0 ? 'info-none-input' : 'info-label-input'}
                            onChange={(e) => setInfoZip(e.target.value)} />
                        </div>
                    </nav>
                    <div id='info-phone-box' className={phoneInfo.length === 0 ? 'info-input-box' : 'info-input-box-initial'}>
                        <p className={phoneInfo.length === 0 ? 'info-none' : 'info-label'}>Phone (optional)</p>
                        <input 
                        placeholder='Phone (optional)'
                        className={phoneInfo.length === 0 ? 'info-none-input' : 'info-label-input'} 
                        value={phoneInfo} 
                        onChange={(e) => setInfoPhone(e.target.value)} />
                    </div>
                    <div className='info-front-back-button'>
                        <p>&#60; Back To Cart</p>
                        <button>Continue to Shipping</button>
                    </div>
                </section>
            </section>
            <section className='info-right-section'>
                <CheckoutCart cartState={props.cartState.cart} />
            </section>
        </div>
    )
}

const mapStateToProps = (reduxState) => reduxState

export default connect(mapStateToProps)(Information)