import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {getCart} from '../../redux/cartReducer'
import axios from 'axios'
import './checkoutCart.css'

function CheckoutCart(props){

    useEffect(() => {
        if(props.cart.length === 0){
            axios.get('/api/cart/all').then(res => props.getCart(res.data))
            .catch(err => console.log('Error...', err))
        }
    }, [])

    const getSum = () => {
        let total = 0;
        if(props.cart.length !== 0){
            const map = props.cart.map((element) => parseFloat(element.product_price * element.cart_quantity))
            for(let i in map){
                total += map[i]
            }
        }
        return total.toFixed(2);
    }

    let cartMap = null
    if(props.cart.length !== 0){
         cartMap = props.cart.map((element, index) => {
            return (
                <div key={index} className='checkout-cart-card'>
                    <div className='checkout-cart-img-box'>
                        <div className='checkout-cart-img-align'>
                            <div>{element.cart_quantity}</div>
                            <img src={element.product_img} />
                        </div>
                        <p>{element.cart_title}</p>
                    </div>
                    <p className='checkout-cart-card-price'>$ {element.product_price * element.cart_quantity}</p>
                </div>
            )
        })
    }

    return (
        <div className='checkout-cart-component'>
            <div className='checkout-cart-map-display'>
                {cartMap}
            </div>
            <hr></hr>
            <div className='checkout-subtotal-result'>
                <nav className='checkout-align-subtotal'>
                    <p>Subtotal</p>
                    <p>$ {getSum()}</p>
                </nav>
                <nav className='checkout-align-shipping'>
                    <p>Shipping</p>
                    <p>Free</p>
                </nav>
            </div>
            <hr></hr>
            <div className='checkout-total-result'>
                <p>Total</p>
                <nav>
                    <p>USD</p>
                    <p>$ {getSum()}</p>
                </nav>
            </div>
        </div>
    )
}

const mapStateToProps = (reduxState) => reduxState.cartState

export default connect(mapStateToProps, {getCart})(CheckoutCart)