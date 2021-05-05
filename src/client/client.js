// Startup point for the client side application
// boot up location of our app in browser

import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
//import Home from './components/Home' - comes from Routes
import Routes from './Routes'
import {BrowserRouter} from 'react-router-dom'
import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import reducers from './reducers'
import {renderRoutes} from 'react-router-config'

import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: '/api' //when we use this instance of axios it automatically prepends /api to url we try to make request to
    //then this request will be automatically proxied as we have set up /api in index.js

})

const store = createStore(reducers, window.INITIAL_STATE, applyMiddleware(thunk.withExtraArgument(axiosInstance))) //instead of passing just thunk

ReactDOM.hydrate(
    <Provider store={store}>
        <BrowserRouter>
            <div>{renderRoutes(Routes)}</div>
        </BrowserRouter>
    </Provider>, 
    document.getElementById("root"))
