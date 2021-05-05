const path = require('path')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.js')

const config = {
    // Tell webpack the root file of server application
    // entry point
    entry: './src/client/client.js',
    // Tell webpack where to put the output file that is generated
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public') //dirname == current working directory
        //publicially available to anyone who asks for client side file
    }
}

module.exports = merge(baseConfig, config)