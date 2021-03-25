import React, {useState, useEffect} from 'react'
import axios from 'axios'
import './collections.css'

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faInstagram} from '@fortawesome/free-brands-svg-icons'
import {faPinterest} from '@fortawesome/free-brands-svg-icons'

function Collections(props){
    const [matteArr, setMatte] = useState([]),
        [polarizedArr, setPolarized] = useState([]),
        [prescriptionArr, setPres] = useState([]),
        [backFadeToggle, setBackFadeToggle] = useState(false)

    const matteReq = axios.get('/api/collections/matte')
    const polarizedReq = axios.get('/api/collections/polarized')
    const prescriptionReq = axios.get('/api/collections/prescription')

    useEffect(() => {
        axios.all([ matteReq, polarizedReq, prescriptionReq ]).then(axios.spread((...res) => {
            setMatte(res[0].data)
            setPolarized(res[1].data)
            setPres(res[2].data)
        })).catch(err => console.log('Error...', err))
        const timer = setTimeout(() => {
            setBackFadeToggle(true)
          }, 100);
          return () => clearTimeout(timer)
    }, [])

    const matteMap = matteArr.map((element, index) => {
        if(index > 3){
            matteArr.splice(index, 1)
        }
        return (
            <div onClick={() => props.history.push(`/collections/all/product/${element.product_id}`)} className='product-card' key={index}>
            <img src={element.product_img} alt={element.product_title} />
            <span className='collections-align-title'>
                {element.pro_quantity === 0 ? <p className='collections-sold-out'>Sold Out</p> : null}
                <p>{element.product_title}</p>
                <p className='align-price'>$ {element.product_price}</p>
            </span>
        </div>
        )
    }, [])

    const polarizedMap = polarizedArr.map((element, index) => {
        if(index > 3){
            polarizedArr.splice(index, 1)
        }
        return (
            <div onClick={() => props.history.push(`/collections/all/product/${element.product_id}`)} className='product-card' key={index}>
                <img src={element.product_img} alt={element.product_title} />
                <span className='collections-align-title'>
                    {element.pro_quantity === 0 ? <p className='collections-sold-out'>Sold Out</p> : null}
                    <p>{element.product_title}</p>
                    <p className='align-price'>$ {element.product_price}</p>
                </span>
            </div>
        )
    })

    const prescriptionMap = prescriptionArr.map((element, index) => {
        if(index > 3){
            prescriptionArr.splice(index, 1)
        }
        return (
            <div onClick={() => props.history.push(`/collections/all/product/${element.product_id}`)} className='product-card' key={index}>
                <img src={element.product_img} alt={element.product_title} />
                <span className='collections-align-title'>
                    {element.pro_quantity === 0 ? <p className='collections-sold-out'>Sold Out</p> : null}
                    <p>{element.product_title}</p>
                    <p className='align-price'>$ {element.product_price}</p>
                </span>
            </div>
        )
    })


    return(
        <div className={backFadeToggle === true ? 'collections-component' : 'no-collections-component'}>
            <div className='collections-prev'>
                <nav className='collections-prev-left'>
                    <p className='collections-prev-home' onClick={() => props.history.push('/')}>Home </p>
                    <p className='collections-prev-arrow'>&#62;</p>
                    <p className='collections-prev-arrow'> Collections</p>
                </nav>
                <nav className='collections-icons'>
                    <a href='https://www.instagram.com/livemoreworkless/' >
                        <FontAwesomeIcon icon={faInstagram}></FontAwesomeIcon>
                    </a>
                    <a href='https://www.pinterest.com/vacaysunglasses/' >
                        <FontAwesomeIcon icon={faPinterest}></FontAwesomeIcon>
                    </a>
                </nav>
            </div>
            <nav className='collections-tag'>
                <nav className='all-collections-tag'> 
                   <p>COLLECTIONS</p> 
                   <button onClick={() => props.history.push('/collections/all')} >All Collections</button>
                </nav>
                <hr></hr>
            </nav>
            <nav className='type-tag'>
                <p>CLASSIC MATTE</p>
                <button onClick={() => props.history.push('/collections/matte')}>ALL CLASSIC MATTE</button>
            </nav>
            <section className='matte-section'>
                {matteMap}
            </section>
            <nav className='type-tag'>
                <p>CLASSIC POLARIZED</p>
                <button onClick={() => props.history.push('/collections/polarized')}>ALL CLASSIC POLARIZED</button>
            </nav>
            <section className='polarized-section'>
                {polarizedMap}
            </section>
            <nav className='type-tag'>
                <p>CLASSIC PRESCRIPTION</p>
                <button onClick={() => props.history.push('/collections/prescription')} >ALL CLASSIC PRESCRIPTION</button>
            </nav>
            <section className='prescription-section'>
                {prescriptionMap}
            </section>
        </div>
    )
}

export default Collections