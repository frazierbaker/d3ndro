module.exports = {
    entry: './index.js',
    output: {
        filename: 'd3ndro.js',
        path: __dirname + '/dist',
        publicPath: __dirname +'/dist'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['minify']
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