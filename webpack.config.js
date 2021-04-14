const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {VueLoaderPlugin} = require('vue-loader')

module.exports = {
    // entry: './src/index.js',
    // entry: './src/assistant-widget/RegionSelection.js',
    entry: './src/capture/main.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: [
                            '@babel/plugin-proposal-class-properties',
                        ]
                    }
                }
            },
            {test: /\.vue$/, loader: 'vue-loader'},
            {test: /\.css$/, use: ['style-loader', 'css-loader']},
            {test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader']},
            {test: /\.(png|jpe?g|gif|svg)$/i, use: ['file-loader']},
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            // template: './src/index.html'
            template: './src/assistant-widget/index.html'
        }),
        new VueLoaderPlugin()
    ]
};
