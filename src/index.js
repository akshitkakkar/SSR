// const express = require('express')
// const React = require('react')
// const { render } = require('react-dom')
// const renderToString = require('react-dom/server').renderToString
// const Home = require('./client/components/Home').default

import 'babel-polyfill'
import express from 'express'
// import React from 'react'
// import {renderToString} from 'react-dom/server'
// import Home from './client/components/Home'
import renderer from './helpers/renderer'
import createStore from './helpers/createStore'
import {matchRoutes} from 'react-router-config'
import Routes from './client/Routes'
import proxy from 'express-http-proxy'

const app = express()

//set up proxy above any other routes and middlewares
//proxy /api request to proxy server defined as second argument
app.use('/api', proxy('http://react-ssr-api.herokuapp.com', {
    proxyReqOptDecorator(opts) {  //this param is to help with security errors with googleoauth flow set up in this course
        opts.headers['x-forwarded-host'] = 'localhost:3000'
        return opts;
    }
}))

app.use(express.static('public')) //tells express it needs to treat public dir
                                    // as static/public dir available to the outside world

app.get('*', (req, res) => {

    const store = createStore(req); //passing req to strip cookie from req to help with auth

    const promises = matchRoutes(Routes, req.path).map(({route}) => {
        return route.loadData ? route.loadData(store) : null;
    })
    .map(promise => {
        if(promise) { //check for null loadData
            return new Promise((resolve, reject) => {
                promise.then(resolve).catch(resolve)
            })
        }
    })

    console.log(promises) //array of promises
    //wait for this promise to resolve and render app
    
    Promise.all(promises).then(() => {
        const context = {}
        const content = renderer(req, store, context)

        if(context.url) {
            return res.redirect(301, context.url)
        }

        if(context.notFound) {
            res.status(404)
        }
        res.send(content)
    })

    //routes array and path user is attempting to view
    //returns array of components that are about to be rendered
                                  
    
    //logic to initialize and load data into the store
})


app.listen(3000, () => {
    console.log('Listening 3000')
})