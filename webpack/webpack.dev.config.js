const webpack = require('webpack');
const path = require('path');

const PARENT_DIR = path.join(__dirname, '../');
const BUILD_DIR = path.resolve(PARENT_DIR, 'client/src');
const APP_DIR = path.resolve(PARENT_DIR, 'client/dist');



module.exports = {
    entry: [
        path.join(BUILD_DIR, 'index.jsx')
    ],
    module: {
        loaders: [{
            test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },{
                test: /\.less$/,
                loaders: ["style-loader", "css-loder", "less-loader"]
            },{
                test: /\.css$/, 
                loader: "style-loader!css-loader"
            }
        ]
    },
    output: {
        path: APP_DIR,
        filename: 'bundle.js'
    },
    devtool: 'source-map',
    devServer: {
        contentBase: PARENT_DIR,
        historyApiFallback: true
    }
}