const webpack = require('webpack');
const path = require('path');

const parentDir = path.join(__dirname, '../');
const BUILD_DIR = path.resolve(parentDir, 'client/src');
const APP_DIR = path.resolve(parentDir, 'client/dist');



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
                loaders: ["style-loader", "css-loader", "less-loader"]
            },{
                test: /\.css$/, 
                loader: "style-loader!css-loader"
            }
        ]
    },
    output: {
        path: APP_DIR,
        filename: 'bundle.js'
    }
}