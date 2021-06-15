import {combineReducers} from 'redux'
import {weatherReducer} from './weatherReducer'

const reducers = combineReducers({
    weatherReducer : weatherReducer
})

export default reducers