import React, { useState } from 'react'
import axios from 'axios'
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
                <div className='info-contact-align'>
                    <p>Contact Information</p>
                    <div id='info-input-box' className='info-email-box'>
                        <p className={emailInfo.length === 0 ? 'info-none' : 'info-label'} >Email</p>
                        <input value={emailInfo} onChange={(e) => setEmailInfo(e.target.value)} />
                    </div>
                </div>
                <section className='info-shipping-section'>
                    <p>Shipping address</p>
                    <nav className='info-align-first-last'>
                        <div id='info-input-box' className='info-first-box'>
                            <p className={firstNameInfo.length === 0 ? 'info-none' : 'info-label'} >First Name</p>
                            <input value={firstNameInfo} onChange={(e) => setInfoFirst(e.target.value)} />
                        </div>
                        <div id='info-input-box' className='info-last-box'>
                            <p className={lastNameInfo.length === 0 ? 'info-none' : 'info-label'} >Last Name</p>
                            <input value={lastNameInfo} onChange={(e) => setInfoLast(e.target.value)} />
                        </div>
                    </nav>
                    <div id='info-input-box' className='info-company-box'>
                        <p className={companyInfo.length === 0 ? 'info-none' : 'info-label'} >Company (optional)</p>
                        <input onChange={(e) => setInfoCompany(e.target.value)} />
                    </div>
                    <div id='info-input-box' className='info-address-box'>
                        <p className={addressInfo.length === 0 ? 'info-none' : 'info-label'} >Address</p>
                        <input onChange={(e) => setInfoAddress(e.target.value)} />
                    </div>
                    <div id='info-input-box' className='info-apartment-box'>
                        <p className={apartmentInfo.length === 0 ? 'info-none' : 'info-label' }>Apartment, suite, etc.(optional)</p>
                        <input onChange={(e) => setInfoApartment(e.target.value)} />
                    </div>
                    <div id='info-input-box' className='info-city-box'>
                        <p className={cityInfo.length === 0 ? 'info-none' : 'info-label'}>City</p>
                        <input onChange={(e) => setInfoCity(e.target.value)} />
                    </div>
                    <nav className='info-align-location'>
                        <div id='info-input-box' className='info-country-box'>
                            <p className={countryInfo.length === 0 ? 'info-none' : 'info-label'} >Country/Region</p>
                            <input onChange={(e) => setInfoCountry(e.target.value)} />
                        </div>
                        <div id='info-input-box' className='info-state-box'>
                            <p className={stateInfo.length === 0 ? 'info-none' : 'info-label'} >State</p>
                            <input onChange={(e) => setInfoState(e.target.value)} />
                        </div>
                        <div id='info-input-box' className='info-zip-box'>
                            <p className={zipInfo.length === 0 ? 'info-none' : 'info-label'} >Zip Code</p>
                            <input onChange={(e) => setInfoZip(e.target.value)} />
                        </div>
                    </nav>
                    <div id='info-input-box' className='info-phone-box'>
                        <p className={phoneInfo.length === 0 ? 'info-none' : 'info-label'}>Phone (optional)</p>
                        <input value={phoneInfo} onChange={(e) => setInfoPhone(e.target.value)} />
                    </div>
                </section>
            </section>
            <section className='info-right-section'>

            </section>
        </div>
    )
}

const mapStateToProps = (reduxState) => reduxState

export default connect(mapStateToProps)(Information)