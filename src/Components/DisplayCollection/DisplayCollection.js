import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import './displayCollection.css'

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faInstagram} from '@fortawesome/free-brands-svg-icons'
import {faPinterest} from '@fortawesome/free-brands-svg-icons'

function DisplayCollection(props){
    const [productObj, setProduct] = useState({}),
           [proDetails, setDetails] = useState([]),
            [mainImg, setMainImg] = useState(true),
            [secondImg, setSecondImg] = useState(false),
            [addQuantity, setQuantity] = useState(1)

    useEffect(() => {
        axios.get(`/api/collections/product/?productId=${props.match.params.id}`)
        .then(res => {
            setProduct(res.data.mainProduct[0])
            setDetails(res.data.productDetails)
        }).catch(err => console.log('Error...', err))
    }, [])

    const detailsMap = proDetails.map((element, index) => {
        return (
            <li className='list-row' key={index}>
                {element.detail}
            </li>
        )
    })

    const switchMainImg = () => {
        setMainImg(true)
        setSecondImg(false)
    }
    const switchSecondImg = () => {
        setSecondImg(true)
        setMainImg(false)
    }

    const handleQuantity = (value) => {
        let addSub = addQuantity
        if(value === 'plus' && productObj.pro_quantity > addQuantity){
            addSub++
           setQuantity(addSub)
        }
        if(value === 'minus' && addQuantity > 1){
            addSub--
           setQuantity(addSub)
        }
    }
    
    const {product_id, product_title, product_img, pro_quantity, product_price, type_title, type_id} = productObj

    const handleAddToCart = () => {
        axios.post('/api/cart/add-to-cart', {product_id, product_title, product_img, product_price, type_id, addQuantity})
        .then(() => {
            alert('Item added to cart!')
        }).catch(err => console.log(err))
    }

    return (
        <div className='display-component'>
            <div className='display-prev'>
                <nav className='display-prev-left'>
                    <p className='display-prev-home' onClick={() => props.history.push('/')}>Home </p>
                    <p className='display-prev-home'>&#62;</p>
                    <p onClick={() => props.history.push('/collections')} className='display-prev-home'>collection</p>
                    <p className='display-prev-home'>&#62;</p>
                    <p onClick={() => props.history.push(`/collections/${type_title}`)} className='display-prev-home'>{type_title}</p>
                    <p className='display-prev-arrow'>&#62;</p>
                    <p className='display-prev-arrow'>{type_title}: {product_title} </p>
                </nav>
                <nav className='display-icons'>
                    <a href='https://www.instagram.com/livemoreworkless/' >
                        <FontAwesomeIcon icon={faInstagram}></FontAwesomeIcon>
                    </a>
                    <a href='https://www.pinterest.com/vacaysunglasses/' >
                        <FontAwesomeIcon icon={faPinterest}></FontAwesomeIcon>
                    </a>
                </nav>
            </div>
            <hr></hr>
            <section className='display-main'>
                <div className='display-image-box'>
                    <img src={mainImg === true ? product_img : 'https://cdn.shopify.com/s/files/1/0966/8778/products/contents-photo_grande.jpg?v=1440184164'} alt={productObj.product_title} />
                    <nav className='display-img-choice'>
                        <img className={mainImg === true ? 'display-border' : 'none-border'} onClick={switchMainImg} src={product_img} />
                        <img className={secondImg === true ? 'display-border' : 'none-border'} onClick={switchSecondImg} src={'https://cdn.shopify.com/s/files/1/0966/8778/products/contents-photo_grande.jpg?v=1440184164'} />
                    </nav>
                </div>
                <div className='display-detail-box'>
                    <p className='display-pro-title'>{product_title}</p>
                    <p className='display-pro-price'>$ {product_price}</p>
                    <hr></hr>
                    <div className='display-add-to-cart'>
                        <nav className='display-align-label'>
                            <label htmlFor='quantity-amount'>quantity</label>
                            <nav id='quantity-amount' className='quantity-amount'>
                                <button disabled={pro_quantity === 0 ? 'disabled' : null} onClick={() => handleQuantity('minus')} className='quantity-amount-buttons'>-</button>
                                <button disabled='disabled' className={pro_quantity === 0 ? 'quantity-amount-value-disabled' : 'quantity-amount-value'}>{addQuantity}</button>
                                <button 
                                disabled={pro_quantity === 0 ? 'disabled' : null} 
                                onClick={() => handleQuantity('plus')} className='quantity-amount-buttons'>+</button>
                            </nav>
                        </nav>
                        <button onClick={!props.user.user_id ? () => alert('Please Login before adding items to cart!') : handleAddToCart} disabled={pro_quantity === 0 ? 'disabled' : null} className='add-to-cart'>add to cart</button>
                    </div>
                    <p className='detail-additional'>Handcrafted Custom VACAY Design</p>
                    <ul className='detail-list'>
                        {detailsMap}
                    </ul>
                    <nav className='align-additional-remaining'>
                        <p className='detail-additional'>free U.S shipping!</p>
                        <p className='product-remaining'><b>{pro_quantity} </b> product remaining!</p>
                    </nav>
                </div>
            </section>
        </div>
    )
}

const mapStateToProps = (reduxState) => reduxState.authState

export default connect(mapStateToProps)(DisplayCollection)