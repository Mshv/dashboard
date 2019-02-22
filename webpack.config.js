var stylusLoader = require('stylus-loader');
var nib = require('nib');
const path = require('path'),
    webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        app: ['./src/app/App.tsx', 'webpack-hot-middleware/client'],
        vendor: ['react', 'react-dom']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].bundle.js'
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.ts', '.tsx', '.css', '.png', '.jpg']
    },
    module: {
        rules: [
            //   {
            //     test: /\.(jpg|png|gif|svg|pdf|ico)$/,
            //     use: [
            //         {
            //             loader: 'file-loader',
            //            // loader: "file-loader?name=./../../img/[name].[ext]",
            //             options: {
            //                 emitFile: false,
            //                 name:'[name].[ext]',
            //                 outputPath:'img/',
            //                 publicPath: 'img/'
            //              },
            //         },
            //     ]
            // },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.(ts|tsx)$/,
                loader: 'ts-loader'
            },
            {
                test: /\.(png|jp(e*)g|svg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8000, // Convert images < 8kb ---> to base64 strings
                        name: 'images/[hash]-[name].[ext]',
                        outputPath: 'assets/'
                    }
                }]
            },
            {
                test: /\.html$/,
                loader: 'html-loader',
                include: path.join(__dirname, 'src')
            },
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            // template: path.resolve(__dirname, 'src', 'app', 'index.html') 
            //template: 'src/app/index.html'
            template: path.resolve(__dirname, 'src/app', 'index.html'),
            filename: 'index.html'
        }),
        new webpack.ProvidePlugin({
            'React': 'react',
            '$': 'jquery',
            '_': 'lodash',
            'ReactDOM': 'react-dom',
            'cssModule': 'react-css-modules',
            'Promise': 'bluebird'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new stylusLoader.OptionsPlugin({
            default: {
                // nib - CSS3 extensions for Stylus
                use: [nib()],
                // no need to have a '@import "nib"' in the stylesheet
                import: ['~nib/lib/nib/index.styl']
            }
        })
    ]
}