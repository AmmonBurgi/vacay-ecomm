import { createStore, combineReducers} from 'redux'
import authReducer from './authReducer'
import searchReducer from './searchReducer'

const rootReducer = combineReducers({authState: authReducer, searchState: searchReducer})

export default createStore(rootReducer)