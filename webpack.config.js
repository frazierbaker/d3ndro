module.exports = {
    entry: ['babel-polyfill', './index.js'],
    output: {
        filename: 'd3ndro.js',
        path: __dirname + '/dist',
        publicPath: __dirname +'/dist'
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            },
            {
                test: /\.css$/,
                use: [ 'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            minimize: true
                        }
                    }
                ]

            }
        ]
    }
}