import React from 'react'
import {renderRoutes} from 'react-router-config'
import Header from './components/Header'
import {fetchCurrentUser} from './actions'

const App = ({route}) => { //any routes matched during the match routes process passed into the app component as a prop called route
//route prop contains a property called routes
//that is collection of components we need to render inside App

    return(
        <div>
            <h1><Header/></h1>
            {renderRoutes(route.routes)}
        </div>
    )
}

export default {
    component: App,
    loadData: ({dispatch}) => dispatch(fetchCurrentUser())
}