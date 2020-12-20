import React, { useState, useEffect} from 'react'
import CheckoutCart from '../CheckoutCart/CheckoutCart'
import {connect} from 'react-redux'
import {setPurchase} from '../../redux/purchaseReducer'
import {getUser} from '../../redux/authReducer'
import AlertWarning from '../AlertWarning/AlertWarning'
import axios from 'axios'
import './information.css'

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faSortDown} from '@fortawesome/free-solid-svg-icons'

function Information(props){
    const {purchaseInfo} = props.purchaseState
    const {user} = props.authState

    const [emailInfo, setEmailInfo] = useState((Object.keys(props.purchaseState.purchaseInfo).length !== 0 ? purchaseInfo.email : user.email) || ''),
        [firstNameInfo, setInfoFirst] = useState((Object.keys(props.purchaseState.purchaseInfo).length !== 0 ? purchaseInfo.firstName : user.first_name) || ''),
        [lastNameInfo, setInfoLast] = useState((Object.keys(props.purchaseState.purchaseInfo).length !== 0 ? purchaseInfo.lastName : user.last_name) || ''),
        [companyInfo, setInfoCompany] = useState(purchaseInfo.company || ''),
        [addressInfo, setInfoAddress] = useState(purchaseInfo.address || ''),
        [apartmentInfo, setInfoApartment] = useState(purchaseInfo.apartment || ''),
        [cityInfo, setInfoCity] = useState(purchaseInfo.city || ''),
        [countryInfo, setInfoCountry] = useState(purchaseInfo.country || ''),
        [stateInfo, setInfoState] = useState(purchaseInfo.state || ''),
        [zipInfo, setInfoZip] = useState(purchaseInfo.zipCode || ''),
        [phoneInfo, setInfoPhone] = useState((Object.keys(props.purchaseState.purchaseInfo).length !== 0 ? purchaseInfo.phone : user.phone) || ''),
        [unitedToggle, setUnited] = useState(true),
        [mexicoToggle, setMexico] = useState(false),
        [canadaToggle, setCanada] = useState(false),
        [emailAlert, setEmailAlert] = useState(false),
        [firstAlert, setFirstAlert] = useState(false),
        [lastAlert, setLastAlert] = useState(false),
        [zipAlert, setZipAlert] = useState(false),
        [countryAlert, setCountryAlert] = useState(false),
        [cityAlert, setCityAlert] = useState(false),
        [stateAlert, setStateAlert] = useState(false),
        [addressAlert, setAddressAlert] = useState(false)

    useEffect(() => {
        if(Object.keys(props.authState.user).length === 0){
            axios.get('/api/session').then(res => props.getUser(res.data))
            .catch(err => console.log('Error...', err))
        }
    }, [])

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
        setCountryAlert(false)
        setInfoCountry(event.target.value)
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

    //Purchase Info
    const handlePurchaseInfo = () => {
        const emailArray = emailInfo.split('').filter(element => element === '@')
        if(emailInfo.length === 0 || emailArray.length === 0){
            return setEmailAlert(true)
        }
        if(firstNameInfo.length === 0){
            return setFirstAlert(true)
        }
        if(lastNameInfo.length === 0){
            return setLastAlert(true)
        }
        if(addressInfo.length === 0){
            return setAddressAlert(true)
        }
        if(cityInfo.length === 0){
            return setCityAlert(true)
        }
        if(countryInfo.length === 0){
            return setCountryAlert(true)
        }
        if(stateInfo.length === 0){
            return setStateAlert(true)
        }
        if(countryInfo === 'US' || countryInfo === 'MX'){
            if(zipInfo.length !== 5){
                return setZipAlert(true)
            }
        }
        if(countryInfo === 'CA'){
            if(zipInfo.length !== 6){
                return setZipAlert(true)
            }
        }
        props.setPurchase({
            email: emailInfo,
            firstName: firstNameInfo,
            lastName: lastNameInfo,
            company: companyInfo,
            address: addressInfo,
            apartment: apartmentInfo,
            city: cityInfo,
            country: countryInfo,
            state: stateInfo,
            zipCode: zipInfo,
            phone: phoneInfo
        })
        props.history.push('/checkout/info/shipping')
    }

    const handleEmail = (event) => {
        setEmailAlert(false)
        setEmailInfo(event.target.value)
    }
    const handleFirst = (event) => {
        setFirstAlert(false)
        setInfoFirst(event.target.value)
    }
    const handleLast = (event) => {
        setLastAlert(false)
        setInfoLast(event.target.value)
    }
    const handleAddress = (event) => {
        setAddressAlert(false)
        setInfoAddress(event.target.value)
    }
    const handleCity = (event) => {
        setCityAlert(false)
        setInfoCity(event.target.value)
    }
    const handleZip = (event) => {
        setZipAlert(false)
        setInfoZip(event.target.value)
    }
    const handleState = (event) => {
        setStateAlert(false)
        setInfoState(event.target.value)
    }

    return (
        <div className='information-component'>
            {Object.keys(props.authState.user).length === 0 ? (<AlertWarning warning={'You must login and add an item to your cart before continuing on to this page! Please Login '} pushFunction={() => props.history.push('/account/login')}/>) : null}
            <section className='info-left-section'>
                <div className='info-checkout-title'>
                    <p><b id='info-title-color'>Our Planet</b> Our Future</p>
                </div>
                <div className='checkout-purchase-nav'>
                    <p onClick={() => props.history.push('/cart')} className='checkout-nav-no'>Cart</p>
                    <p className='checkout-nav-icon'>&#62;</p>
                    <p className='checkout-nav-go'>Information</p>
                    <p className='checkout-nav-icon'>&#62;</p>
                    <p onClick={handlePurchaseInfo} className='checkout-nav-no'>Shipping</p>
                    <p className='checkout-nav-icon'>&#62;</p>
                    <p onClick={() => props.history.push('/checkout/info/shipping/payment')} className='checkout-nav-no'>Payment</p>
                </div>
                <div className='info-contact-align'>
                    <p className='info-title-tag'>Contact Information</p>
                    <div id='info-input-box' 
                    className={emailInfo.length === 0 ? (emailAlert === false ? 'info-input-box' : 'alert-info-input-box') : (emailAlert === false ? 'info-input-box-initial' : 'alert-info-input-box-initial')}>
                        <p className={emailInfo.length === 0 ? 'info-none' : 'info-label'} >Email</p>
                        <input 
                        placeholder='Email'
                        name='email'
                        className={emailInfo.length === 0 ? 'info-none-input' : 'info-label-input'} 
                        value={emailInfo} 
                        onChange={(e) => handleEmail(e)} 
                        />
                    </div>
                    <p className={emailAlert === true ? 'alert-message' : 'no-alert-message'}>Invalid Email!</p>
                </div>
                <section className='info-shipping-section'>
                    <p className='info-title-tag'>Shipping Address</p>
                    <nav className='info-align-first-last'>
                        <div id='info-first-box' className={firstNameInfo.length === 0 ? (firstAlert === false ? 'info-input-box' : 'alert-info-input-box') : (firstAlert === false ? 'info-input-box-initial' : 'alert-info-input-box-initial')}>
                            <p className={firstNameInfo.length === 0 ? 'info-none' : 'info-label'} >First Name</p>
                            <input 
                            placeholder='First Name'
                            className={firstNameInfo.length === 0 ? 'info-none-input' : 'info-label-input'} 
                            value={firstNameInfo} 
                            onChange={(e) => handleFirst(e)} />
                        </div>
                        <div id='info-last-box' className={lastNameInfo.length === 0 ? (lastAlert === false ? 'info-input-box' : 'alert-info-input-box') : (lastAlert === false ? 'info-input-box-initial' : 'alert-info-input-box-initial')}>
                            <p className={lastNameInfo.length === 0 ? 'info-none' : 'info-label'} >Last Name</p>
                            <input 
                            placeholder='Last Name'
                            className={lastNameInfo.length === 0 ? 'info-none-input' : 'info-label-input'} value={lastNameInfo} 
                            onChange={(e) => handleLast(e)} />
                        </div>
                    </nav>
                    <p className={firstAlert === true ? 'alert-message' : 'no-alert-message'} >First Name invalid!</p>
                    <p className={lastAlert === true ? 'alert-message' : 'no-alert-message'} >Last Name Invalid!</p>
                    <div id='info-company-box' className={companyInfo.length === 0 ? 'info-input-box' : 'info-input-box-initial'}>
                        <p className={companyInfo.length === 0 ? 'info-none' : 'info-label'} >Company (optional)</p>
                        <input 
                        value={companyInfo}
                        placeholder='Company (optional)'
                        className={companyInfo.length === 0 ? 'info-none-input' : 'info-label-input'} 
                        onChange={(e) => setInfoCompany(e.target.value)} />
                    </div>
                    <div id='info-address-box' className={addressInfo.length === 0 ? (addressAlert === false ? 'info-input-box' : 'alert-info-input-box') : (addressAlert === false ? 'info-input-box-initial' : 'info-input-box-initial')}>
                        <p className={addressInfo.length === 0 ? 'info-none' : 'info-label'} >Address</p>
                        <input 
                        value={addressInfo}
                        placeholder='Address'
                        className={addressInfo.length === 0 ? 'info-none-input' : 'info-label-input'}onChange={(e) => handleAddress(e)} />
                    </div>
                    <p className={addressAlert === true ? 'alert-message' : 'no-alert-message'} >Invalid Address!</p>
                    <div id='info-apartment-box' className={apartmentInfo.length === 0 ? 'info-input-box' : 'info-input-box-initial'}>
                        <p className={apartmentInfo.length === 0 ? 'info-none' : 'info-label' }>Apartment, suite, etc.(optional)</p>
                        <input 
                        value={apartmentInfo}
                        placeholder='Apartment, suite, etc.(optional)'
                        className={apartmentInfo.length === 0 ? 'info-none-input' : 'info-label-input'} onChange={(e) => setInfoApartment(e.target.value)} />
                    </div>
                    <div id='info-city-box' className={cityInfo.length === 0 ? (cityAlert === false ? 'info-input-box' : 'alert-info-input-box') : (cityAlert === false ? 'info-input-box-initial' : 'alert-info-input-box-initial')}>
                        <p className={cityInfo.length === 0 ? 'info-none' : 'info-label'}>City</p>
                        <input 
                        value={cityInfo}
                        placeholder='City'
                        className={cityInfo.length === 0 ? 'info-none-input' : 'info-label-input'} 
                        onChange={(e) => handleCity(e)} />
                    </div>
                    <p className={cityAlert === true ? 'alert-message' : 'no-alert-message'} >Invalid City!</p>
                    <nav className='info-align-location'>
                        <div id='info-country-box' className={countryInfo.length === 0 ? (countryAlert === false ? 'info-input-box' : 'alert-info-input-box') : (countryAlert === false ? 'info-input-box-initial' : 'alert-input-info-box-initial')}>
                            <p className={countryInfo.length === 0 ? 'info-none' : 'info-label'} >Country/Region</p>
                            <select className='states-map' onChange={(e) => handleCountry(e)}>
                                <option id='no-value-option' value={''}>Country</option>
                                <option value='US'>United States</option>
                                <option value='CA'>Canada</option>
                                <option value='MX'>Mexico</option>
                            </select>
                            <FontAwesomeIcon className='dropdown-arrow-box' icon={faSortDown}></FontAwesomeIcon>
                        </div>
                        <div id='info-state-box' className={stateInfo.length === 0 ? (stateAlert === false ? 'info-input-box' : 'alert-info-input-box') : (stateAlert === false ? 'info-input-box-initial' : 'alert-info-input-box-initial')}>
                            <p className={stateInfo.length === 0 ? 'info-none' : 'info-label'} >{canadaToggle === true ? 'Provinces' : 'States'}</p>
                            <select className={unitedToggle === true ? 'states-map' : 'states-none'} onChange={e => handleState(e)}>
                                <option value={''} id='no-value-option'>States</option>
                                {unitedMap}
                            </select>
                                <FontAwesomeIcon className='dropdown-arrow-box' icon={faSortDown}></FontAwesomeIcon>
                            <select className={canadaToggle === true ? 'states-map' : 'states-none'} onChange={e => handleState(e)}>
                                <option value={''}>Provinces</option>
                                {canadaMap}
                            </select>
                            <select className={mexicoToggle === true ? 'states-map' : 'states-none'} onChange={e => handleState(e)}>
                                <option value=''>States</option>
                                {mexicoMap}
                            </select>
                        </div>
                        <div id='info-zip-box' className={zipInfo.length === 0 ? (zipAlert === false ? 'info-input-box' : 'alert-info-input-box') : (zipAlert === false ? 'info-input-box-initial' : 'alert-info-input-box-initial')}>
                            <p className={zipInfo.length === 0 ? 'info-none' : 'info-label'} >{unitedToggle === true ? 'Zip Code' : 'Postal Code'}</p>
                            <input 
                            value={zipInfo}
                            placeholder={unitedToggle === true ? 'Zip Code' : 'Postal Code'}
                            className={zipInfo.length === 0 ? 'info-none-input' : 'info-label-input'}
                            onChange={(e) => handleZip(e)} />
                        </div>
                    </nav>
                    <p className={countryAlert === true ? 'alert-message' : 'no-alert-message'}>Invalid Country!</p>
                    <p className={stateAlert === true ? 'alert-message' : 'no-alert-message'}>Invalid State/Province!</p>
                    <p className={zipAlert === true ? 'alert-message' : 'no-alert-message'}>Invalid Zip/Postal Code!</p>
                    <div id='info-phone-box' className={phoneInfo.length === 0 ? 'info-input-box' : 'info-input-box-initial'}>
                        <p className={phoneInfo.length === 0 ? 'info-none' : 'info-label'}>Phone (optional)</p>
                        <input 
                        type='number'
                        placeholder='Phone (optional)'
                        className={phoneInfo.length === 0 ? 'info-none-input' : 'info-label-input'} 
                        value={phoneInfo} 
                        onChange={(e) => setInfoPhone(e.target.value)} />
                    </div>
                    <div className='info-front-back-button'>
                        <p onClick={() => props.history.push('/cart')}>&#60; Back To Cart</p>
                        <button onClick={handlePurchaseInfo}>Continue to Shipping</button>
                    </div>
                </section>
            </section>
            <section className='info-right-section'>
                <CheckoutCart />
            </section>
        </div>
    )
}

const mapStateToProps = (reduxState) => reduxState

export default connect(mapStateToProps, {getUser, setPurchase})(Information)