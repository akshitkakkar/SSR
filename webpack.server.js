const path = require('path')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.js')
const webpackNodeExternals = require('webpack-node-externals')

const config = {
    // Inform webpack that we're building a bundle for nodejs rather than for
    // the browser
    target: 'node',
    // Tell webpack the root file of server application
    // entry point
    entry: './src/index.js',
    // Tell webpack where to put the output file that is generated
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build') //dirname == current working directory
        //inside this dir place output bundle into new folder called build which is automatically created by webpack
    },

    externals: [webpackNodeExternals()] //not bundle any libraries into our output bundle if that library exists inside nodemodules folder
}

module.exports = merge(baseConfig, config)