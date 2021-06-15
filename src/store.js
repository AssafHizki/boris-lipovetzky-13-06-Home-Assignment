import thunkMiddleware from 'react-thunk'
import {applyMiddleware, createStore} from 'redux'
import reducers from './reducers/weatherReducer'

const middleware = applyMiddleware(thunkMiddleware)

const store = createStore(reducers, middleware)

export default store