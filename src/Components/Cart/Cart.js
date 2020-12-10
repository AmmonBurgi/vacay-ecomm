import React, {useState} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {getCart, increaseQuantity, decreaseQuantity, deleteProduct} from '../../redux/cartReducer'
import './cart.css'

function Cart(props){
    const [sellerMessage, setMessage] = useState('')
    
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
                    <section className='cart-checkout-section'>
                        <nav className='cart-message'>
                            <p>Special instructions for seller!</p>
                            <textarea onChange={(e) => setMessage(e.target.value)} value={sellerMessage}  />
                        </nav>
                        <div className='cart-checkout-sub'>
                            <p className='cart-subtotal'>Subtotal: ${getSum()}</p>
                            <p>Shipping & taxes calculated at checkout!</p>
                            <button>checkout</button>
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