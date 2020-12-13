import React, { useState } from 'react'
import axios from 'axios'
import CheckoutCart from '../CheckoutCart/CheckoutCart'
import {connect} from 'react-redux'
import './information.css'

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faSortDown} from '@fortawesome/free-solid-svg-icons'

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
        [phoneInfo, setInfoPhone] = useState(props.authState.user.phone || ''),
        [unitedToggle, setUnited] = useState(true),
        [mexicoToggle, setMexico] = useState(false),
        [canadaToggle, setCanada] = useState(false)

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

    const handleCountry = (event) => {
        setInfoCountry(event.target.value)
        if(event.target.value === 'United States'){
                setUnited(true)
                setMexico(false)
                setCanada(false)
        }
        if(event.target.value === 'Canada'){
            setUnited(false)
            setMexico(false)
            setCanada(true)
        }
        if(event.target.value === 'Mexico'){
            setUnited(false)
            setMexico(true)
            setCanada(false)
        }
    }

    console.log(countryInfo)
    console.log(unitedToggle)
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
                            <select onChange={(e) => handleCountry(e)}>
                                <option id='no-value-option' value={''}>Country</option>
                                <option value='United States'>United States</option>
                                <option value='Canada'>Canada</option>
                                <option value='Mexico'>Mexico</option>
                            </select>
                        </div>
                        <div id='info-state-box' className={stateInfo.length === 0 ? 'info-input-box' : 'info-input-box-initial'}>
                            <p className={stateInfo.length === 0 ? 'info-none' : 'info-label'} >{canadaToggle === true ? 'Provinces' : 'States'}</p>
                            <select className={unitedToggle === true ? 'states-map' : 'states-none'} onChange={e => setInfoState(e.target.value)}>
                                <option value={''} id='no-value-option'>States</option>
                                {unitedMap}
                            </select>
                                <FontAwesomeIcon className='dropdown-arrow-box' icon={faSortDown}></FontAwesomeIcon>
                            <select className={canadaToggle === true ? 'states-map' : 'states-none'} onChange={e => setInfoState(e.target.value)}>
                                <option>Provinces</option>
                                {canadaMap}
                            </select>
                            <select className={mexicoToggle === true ? 'states-map' : 'states-none'} onChange={e => setInfoState(e.target.value)}>
                                <option>States</option>
                                {mexicoMap}
                            </select>
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
                        <p onClick={() => props.history.push('/cart')}>&#60; Back To Cart</p>
                        <button onClick={() => props.history.push('/checkout/info/shipping')}>Continue to Shipping</button>
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