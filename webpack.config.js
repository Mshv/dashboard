// var stylusLoader = require('stylus-loader');
// var nib = require('nib');
// let activeEnv = process.env.NODE_ENV;

// console.log(`Using environment config: '${activeEnv}'`);

// const path = require('path'),
//     webpack = require('webpack'),
//     HtmlWebpackPlugin = require('html-webpack-plugin'),
//     Dotenv = require('dotenv-webpack');

// module.exports = {
//     mode: 'development',
//     entry: ["babel-polyfill","./src/app/App.tsx"],
//     output: {
//         path: path.resolve(__dirname, 'dist'),
//         filename: 'js/[name].bundle.js'
//     },
//     devtool: 'source-map',
//     resolve: {
//         extensions: ['.js', '.jsx', '.json', '.ts', '.tsx', '.css', '.png', '.jpg']
//     },
//     module: {
//         rules: [
//             {
//                 test: /\.css$/,
//                 use: ['style-loader', 'css-loader'],
//             },
//             {
//                 test: /\.scss$/,
//                 use: [
//                     "style-loader",
//                     "css-loader",
//                     "sass-loader"
//                 ]
//             },
//             {
//                 test: /\.(ts|tsx)$/,
//                 loader: 'ts-loader'
//             },
            // {
            //     test: /\.(png|jp(e*)g|svg)$/,
            //     use: [{
            //         loader: 'url-loader',
            //         options: {
            //             limit: 8000, // Convert images < 8kb ---> to base64 strings
            //             name: 'images/[hash]-[name].[ext]',
            //             outputPath: 'assets/'
            //         }
            //     }]
            // },
//             {
//                 test: /\.html$/,
//                 loader: 'html-loader',
//                 include: path.join(__dirname, 'src')
//             },
//             { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
//         ]
//     },
//     plugins: [
//         new Dotenv({
//               path: `./.env.${activeEnv}`,               
//         }),
//         new HtmlWebpackPlugin({
//             template: path.resolve(__dirname, 'src/app', 'index.html'),
//             filename: 'index.html'
//         }),
//         new webpack.ProvidePlugin({
//             'React': 'react',
//             '$': 'jquery',
//             '_': 'lodash',
//             'ReactDOM': 'react-dom',
//             'cssModule': 'react-css-modules',
//             'Promise': 'bluebird'
//         }),
//         new webpack.HotModuleReplacementPlugin(),
//         new stylusLoader.OptionsPlugin({
//             default: {
//                 use: [nib()],
//                 import: ['~nib/lib/nib/index.styl']
//             }
//         })
//     ]
// }

const Dotenv = require('dotenv-webpack');

module.exports = {
    entry: "./src/app/App.tsx",
    output: {
      filename: "bundle.js",
      path: __dirname + "/dist"
    },
  
    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",
  
    resolve: {
      // Add '.ts' and '.tsx' as resolvable extensions.
      extensions: [".ts", ".tsx", ".js", ".json"]
    },
  
    module: {
      rules: [
        // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
        { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
  
        // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
        { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
        {
          test: /\.(png|jp(e*)g|svg)$/,
          use: [{
              loader: 'file-loader',
              options: {
                  // limit: 8000, // Convert images < 8kb ---> to base64 strings
                  name: '[name].[ext]',
                  outputPath: 'img/',
                  publicPath:"assets/img/"
              }
          }]
      },
      
      ]
    },
  
    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
      "react": "React",
      "react-dom": "ReactDOM"
    },
    plugins: [
      new Dotenv({
            path: `./.env`,               
      }),
      
  ]
  };