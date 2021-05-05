import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import { create } from 'lodash'
import reducers from '../client/reducers'
import axios from 'axios'
//no import for Provider as the purpose here is just to create
//redux store and not immediately use it
//also, not tying it with Provider tag because of point 3 in docs

export default (req) => {
    //this axiosInstance tricks the api server that req is coming from real user
    const axiosInstance = axios.create({
        baseURL: 'http://react-ssr-api.herokuapp.com',
        headers: {cookie: req.get('cookie') || ""} //undefined value for header crashes the req hence empty string incase of no cookie sent by client
    })

    const store = createStore(reducers, {}, applyMiddleware(thunk.withExtraArgument(axiosInstance)))

    return store;
}