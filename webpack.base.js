module.exports = {
        // Tell webpack to run babel on every file it runs through

        module: {
            rules: [
                {
                    test: /\.js?$/, //only applies babel on js files
                    loader: 'babel-loader', //webpack loader module that executed babel and transpiles our code
                    exclude: /node_modules/, // tells webpack to not run babel on files in certain dir
                    options: {
                        presets: [ //rules used by babel to transpile the code
                            'react', //jsx to es5
                            'stage-0', //async code
                            ['env', {targets: {browsers: ['last 2 versions']}}]
                            //run all preset rules needed to meet requirements of latest
                            // 2 versions of popular browsers
                        ]
                    }
                }
            ]
        }
}