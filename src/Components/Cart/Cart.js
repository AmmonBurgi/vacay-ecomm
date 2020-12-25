import React, {useState} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import emailjs from 'emailjs-com'
import {getCart, increaseQuantity, decreaseQuantity, deleteProduct} from '../../redux/cartReducer'
import './cart.css'

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faInstagram} from '@fortawesome/free-brands-svg-icons'
import {faPinterest} from '@fortawesome/free-brands-svg-icons'

function Cart(props){
    const [sellerMessage, setMessage] = useState('')

    const tempParams = {
        to_name: 'Ammon',
        from_name: `${props.authState.user.first_name} ${props.authState.user.last_name}`,
        from_email: props.authState.user.email,
        from_phone: props.authState.user.phone,
        message: sellerMessage
    }

    const sendFeedback = () => {
        emailjs.send('service_4i13xqt', 'template_cjdfeyi', tempParams, 
        'user_TJ1zsDGcnKamDKqHqMJ4s')
        .then(() => {
            setMessage('')
        }).catch(err => console.log('Failed...', err))
    }

    const handleCheckout = () => {
        // sendFeedback()
        props.history.push('/checkout/info')
    }

    const handleDecAndInc = (value, cartQuantity, productId, originalQuantity) => {
        if(value === 'plus' && originalQuantity > cartQuantity){
           return props.increaseQuantity(productId)
        }
        if(value === 'minus' && cartQuantity > 1)
           return props.decreaseQuantity(productId)
    }

    const deleteProduct = (productId) => {
        props.deleteProduct(productId)
        axios.delete(`/api/cart/?productId=${productId}`)
        .then(() => {
            alert('Product removed from cart!')
        }).catch(err => console.log('Error...', err))
    }

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
    
    let cartMap = null
    if(props.cartState.cart.length !== 0){
        cartMap = props.cartState.cart.map((element, index) => {
            return (
                <div className='cart-product-card' key={index}>
                    {index > 0 ? <hr className='cart-product-bar'></hr> : null}
                    <nav className='cart-pro-title-section'>
                        <img src={element.product_img} alt={element.cart_title} />
                        <p>{element.cart_title}</p>
                    </nav>
                    <nav className='cart-pro-price-section'>
                        <p>${element.product_price}</p>
                    </nav>
                    <nav className='align-buttons-total'>
                        <div className='cart-pro-quantity-section'>
                            <nav className='cart-pro-quantity-align'>
                                <button onClick={() => handleDecAndInc('minus', element.cart_quantity, element.product_id)}>-</button>
                                <button disabled='disabled' id='cart-pro-quantity-value'>{element.cart_quantity || 0}</button>
                                <button onClick={() => handleDecAndInc('plus', element.cart_quantity, element.product_id, element.pro_quantity)}>+</button>
                                <nav className='align-remove'>
                                    <p onClick={() => deleteProduct(element.product_id)}>remove</p>
                                </nav>
                            </nav>
                        </div>
                        <nav className='cart-pro-total-section'>
                            <p>${element.product_price * element.cart_quantity}</p>
                        </nav>
                    </nav>
                </div>
            )
        }) 
    }

    return(
        <div className='cart-component'>
            <div className='cart-prev'>
                <nav className='cart-prev-left'>
                    <p className='cart-prev-home' onClick={() => props.history.push('/')}>Home </p>
                    <p className='cart-prev-arrow'>&#62;</p>
                    <p className='cart-prev-arrow'> cart</p>
                </nav>
                <nav className='cart-icons'>
                    <a href='https://www.instagram.com/livemoreworkless/' >
                        <FontAwesomeIcon icon={faInstagram}></FontAwesomeIcon>
                    </a>
                    <a href='https://www.pinterest.com/vacaysunglasses/' >
                        <FontAwesomeIcon icon={faPinterest}></FontAwesomeIcon>
                    </a>
                </nav>
            </div>
            {Object.keys(props.authState.user).length === 0 ? 
            <div>
                Please Login before accessing cart!
            </div>    
            :
            <div className='cart-main-component'>
                <nav className='shopping-cart-tag'>
                    <p>Shopping Cart</p>
                     <hr></hr>
                </nav>
                {props.cartState.cart.length === 0 ? 
                <div>
                    <p>Your cart is currently empty!</p>
                    <p className='cart-align-browsing'>
                        Continue browsing <a id='cart-continue-browsing' onClick={() => props.history.push('/collections/all')}>here!</a>
                    </p>
                </div>    
                :
                <div className='cart-main'>
                    <section className='cart-category-box'>
                        <div className='cart-categories'>
                            <nav className='cart-align-product-cat'>
                                <p>product</p>
                            </nav>
                            <nav className='cart-align-price-cat'>
                                <p>price</p>
                            </nav>
                            <nav className='cart-align-quantity-cat'>
                                <p>quantity</p>
                            </nav>
                            <nav className='cart-align-total-cat'>   
                                <p>total</p>
                            </nav>
                        </div>
                        <hr></hr>
                    </section>
                    <section className='cart-product-section'>
                        {cartMap}
                    </section>
                    <section className='cart-checkout-section'>
                        <nav className='cart-message'>
                            <p>Special instructions for seller!</p>
                            <textarea onChange={(e) => setMessage(e.target.value)} value={sellerMessage}  />
                        </nav>
                        <div className='cart-checkout-sub'>
                            <p className='cart-subtotal'>Subtotal: ${getSum()}</p>
                            <p>Shipping & taxes calculated at checkout!</p>
                            <button onClick={handleCheckout}>checkout</button>
                        </div>
                    </section>
                </div>
                }
            </div>
            }
        </div>
    )
}

const mapStateToProps = (reduxState) => reduxState

export default connect(mapStateToProps, {getCart, increaseQuantity, decreaseQuantity, deleteProduct})(Cart)