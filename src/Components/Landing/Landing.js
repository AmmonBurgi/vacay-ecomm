import React from 'react'
import MyCarousel from '../MyCarousel/MyCarousel'
import './landing.css'

function Landing(props){


    return (
        <div className='landing-component'>
            <MyCarousel />
            <div className='landing-main'>
                <div className='landing-type'>
                    <nav onClick={() => props.history.push('/collections/matte')} className='landing-main-type'>
                        <div className='landing-shade-box'></div>
                        <img src={'https://cdn.shopify.com/s/files/1/0966/8778/t/3/assets/homepage_featured_box_2_image.jpg?v=7528980631596753729'} alt='polarized glasses'/>
                        <p>CLASSIC Matte</p>
                    </nav>
                    <nav onClick={() => props.history.push('/collections/polarized')} className='landing-main-type'>
                        <div className='landing-shade-box' ></div>
                        <img src={'https://cdn.shopify.com/s/files/1/0966/8778/t/3/assets/homepage_featured_box_1_image.jpg?v=12104791585993755325'} />
                        <p>Classic polarized</p>
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default Landing