const initialState = {
    purchaseInfo: {}
}

const SET_PURCHASE = 'SET_PURCHASE'

export function setPurchase(infoObj){
    return {
        type: SET_PURCHASE,
        payload: infoObj
    }
}

export default function(state = initialState, action){
    const {payload, type} = action
    switch(type){
        case SET_PURCHASE:
            return {...state, purchaseInfo: payload}
        default:
            return state
    }
}