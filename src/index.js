import { render } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { noteReducer } from './reducers/noteReducer'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const store = createStore(
  noteReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

store.dispatch({
  type: "new_note",
  payload: {
    content: "una nota cualquiera",
    important: true,
    id: 1

  }
})

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>
  , document.getElementById('root')
)




// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
