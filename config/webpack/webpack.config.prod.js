const merge = require('webpack-merge');
const commonConfig = require('./common');
const Dotenv = require('dotenv-webpack');
let activeEnv = 'production';

console.log(`Using environment config: '${activeEnv}'`);

module.exports = merge(commonConfig, {
    mode: 'production',
    entry: ["../src/app/App.tsx"],
    devtool: 'inline-source-map',
    plugins: [
        new Dotenv({
              path: `./.env.production`, 
        }),
    ]
});