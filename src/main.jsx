import React from 'react'
import { createRoot } from 'react-dom/client'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import './index.css'
import App from './App.jsx'

const rootReducer = combineReducers({})
const store = createStore(rootReducer)

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
