const initialState = {
    searchArray: []
}

const SET_SEARCH_ARRAY = 'SET_SEARCH_ARRAY'

export function setSearchArray(searchVal){
    console.log(searchVal)
    return {
        type: SET_SEARCH_ARRAY,
        payload: searchVal
    }
}

export default function(state = initialState, action){
    const {payload, type} = action
    switch(type){
        case SET_SEARCH_ARRAY:
            return {...state, searchArray: payload}
        default:
            return state
    }
}