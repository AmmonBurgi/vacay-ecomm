import { createStore, combineReducers} from 'redux'
import authReducer from './authReducer'
import searchReducer from './searchReducer'
import cartReducer from './cartReducer'
import purchaseReducer from './purchaseReducer'

const rootReducer = combineReducers({authState: authReducer, searchState: searchReducer, cartState: cartReducer, purchaseState: purchaseReducer})

export default createStore(rootReducer)