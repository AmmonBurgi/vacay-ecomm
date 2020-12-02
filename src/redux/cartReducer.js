const initialState = {
    cart: []
}

const GET_CART = 'GET_CART'

export function getCart(cartObj){
    return {
        type: GET_CART,
        payload: cartObj
    }
}

export default function(state = initialState, action){
    const {payload, type} = action
    switch(type){
        case GET_CART:
            return {...state, cart: payload}
        default:
            return state
    }
}