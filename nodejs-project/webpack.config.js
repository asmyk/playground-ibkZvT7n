const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    entry: [ './app.js'],

    output: {
        path: path.join(__dirname, '/dist'),
        filename: '[name].js'
    },

    devServer: {
        inline: true,
        port: 8080
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', {
                    loader: 'css-loader',
                    options: {
                        modules: true
                    }
                }]
            }, {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            }, {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            }
        ],
    },

    plugins: [
       
        new HtmlWebpackPlugin({
            title: "Your App's Title",
            template: "./index.html"
        })
    ]

};