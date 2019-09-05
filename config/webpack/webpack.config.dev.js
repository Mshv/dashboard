const merge = require('webpack-merge');
const commonConfig = require('./common');
const Dotenv = require('dotenv-webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
let activeEnv = 'development';

console.log(`Using environment config: '${activeEnv}'`);

module.exports = merge(commonConfig, {
    mode: 'development',
    entry: ["../src/app/App.tsx"],
    devtool: 'inline-source-map',
    plugins: [
        new Dotenv({
              path: `./.env.development`,               
        }),
        new CleanWebpackPlugin(),
    ]
});