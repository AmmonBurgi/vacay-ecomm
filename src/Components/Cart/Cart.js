import React, {useEffect} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {getCart} from '../../redux/cartReducer'
import './cart.css'

function Cart(props){


    const cartMap = props.cart.map((element, index) => {
        return (
            <div key={index}>
                <p>{element.product_title}</p>
            </div>
        )
    })

    console.log(props.cart)

    return(
        <div className='cart-component'>
            <nav>
                <p>Shopping Cart</p>
                <hr></hr>
            </nav>
            <section className='cart-display-items'>
                {cartMap}
            </section>
        </div>
    )
}

const mapStateToProps = (reduxState) => reduxState.cartState

export default connect(mapStateToProps, {getCart})(Cart)