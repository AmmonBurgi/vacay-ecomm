const initialState = {
    cart: []
}

const GET_CART = 'GET_CART'
const INCREASE_QUANTITY = 'INCREASE_QUANTITY'
const DECREASE_QUANTITY = 'DECREASE_QUANTITY'
const DELETE_PRODUCT = 'DELETE_PRODUCT'

export function getCart(cartObj){
    return {
        type: GET_CART,
        payload: cartObj
    }
}

export function increaseQuantity(productId){
    return {
        type: INCREASE_QUANTITY,
        payload: productId
    }
}

export function decreaseQuantity(productId){
    return {
        type: DECREASE_QUANTITY,
        payload: productId
    }
}

export function deleteProduct(productId){
    return {
        type: DELETE_PRODUCT,
        payload: productId
    }
}

export default function(state = initialState, action){
    const {payload, type} = action
    switch(type){
        case GET_CART:
            return {...state, cart: payload}
        case INCREASE_QUANTITY:
            return {...state, cart: state.cart.map((element, index) => {
                if(element.product_id === payload){
                    element.cart_quantity++
                }
                return element
            })}
        case DECREASE_QUANTITY:
            return {...state, cart: state.cart.map((element, index) => {
                if(element.product_id === payload){
                    element.cart_quantity--
                }
                return element
            })}
        case DELETE_PRODUCT:
            return {...state, cart: state.cart.filter(item => item.product_id !== payload)}
        default:
            return state
    }
}