import { createStore, combineReducers} from 'redux'
import authReducer from './authReducer'
import searchReducer from './searchReducer'
import cartReducer from './cartReducer'

const rootReducer = combineReducers({authState: authReducer, searchState: searchReducer, cartState: cartReducer})

export default createStore(rootReducer)