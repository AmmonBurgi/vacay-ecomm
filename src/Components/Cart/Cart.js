import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {getCart, increaseQuantity, decreaseQuantity} from '../../redux/cartReducer'
import './cart.css'

function Cart(props){
    
    const handleDecAndInc = (value, cartQuantity, productId, originalQuantity) => {
        if(value === 'plus' && originalQuantity > cartQuantity){
           return props.increaseQuantity(productId)
        }
        if(value === 'minus' && cartQuantity > 1)
           return props.decreaseQuantity(productId)
    }
    
    let cartMap = null
    if(props.cartState.cart.length !== 0){
        cartMap = props.cartState.cart.map((element, index) => {
            return (
                <div className='cart-product-card' key={index}>
                    <nav className='cart-pro-title-section'>
                        <img src={element.product_img} alt={element.cart_title} />
                        <p>{element.cart_title}</p>
                    </nav>
                    <nav className='cart-pro-price-section'>
                        <p>${element.product_price}</p>
                    </nav>
                    <nav className='cart-pro-quantity-section'>
                        <button onClick={() => handleDecAndInc('minus', element.cart_quantity, element.product_id)}>-</button>
                        <button>{element.cart_quantity || 0}</button>
                        <button onClick={() => handleDecAndInc('plus', element.cart_quantity, element.product_id, element.pro_quantity)}>+</button>
                    </nav>
                    <nav className='cart-pro-total-section'>
                    <p>${element.product_price * element.cart_quantity}</p>
                    </nav>
                </div>
            )
        }) 
    }

    // console.log(props.cartState.cart)
    return(
        <div className='cart-component'>
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
                    Cart is Empty!
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
                </div>
                }
            </div>
            }
        </div>
    )
}

const mapStateToProps = (reduxState) => reduxState

export default connect(mapStateToProps, {getCart, increaseQuantity, decreaseQuantity})(Cart)