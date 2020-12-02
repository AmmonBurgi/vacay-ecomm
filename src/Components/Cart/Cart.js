import React, {useEffect} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {getCart} from '../../redux/cartReducer'

function Cart(props){

    // useEffect(() => {
    //     axios.get('/api/collections/cart')
    //         .then(res => {
    //             props.getCart(res.data)
    //         }).catch(err => console.log('Error...', err))
    // }, [])
    const cartMap = props.cart.map((element, index) => {
        return (
            <div key={index}>
                <p>{element.product_title}</p>
            </div>
        )
    })

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