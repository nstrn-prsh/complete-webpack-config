const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const webpack = require('webpack')

/* ** config for all modes ** */
const config = {
    entry: {
        bundle: './src/script.js',
        dashboard: './src/admin.js',
    },
    output: {
        path: path.resolve(__dirname , 'build'),
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    stats: 'errors-warnings',
    module: {
        rules: [
            /* (file-loader)s such as image or font take place here */ 
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options:{
                    presets: ['@babel/preset-env']
                }
            }
        ]
    },
    plugins: [
        new webpack.ProgressPlugin(),
        new HtmlWebpackPlugin({
            title: 'bundle project',
            template: './index.html',
            filename: 'bundle.html',
            chunks: ['bundle', 'vendors~dashboard~bundle']
        }),
        new HtmlWebpackPlugin({
            title: 'dashboard project',
            template: './index.html',
            filename: 'dashboard.html',
            chunks: ['dashboard', 'vendors~dashboard~bundle']
        }),
        new CleanWebpackPlugin()
    ]
}

module.exports=( env, {mode})=>{
    let isDev = mode == 'development'

    /* ** config for development mode ** */
    if(isDev){
        config.devServer ={
            contentBase: path.resolve(__dirname , 'build'),
            publicPath: '/build/',
            index: 'index.html',
            port: 8888
        }
    }

    /* ** config for plugins which we use only for development ** */ 
    config.module.rules.push(...[
        {
            test: /\.css$/,
            use: [isDev ? 'style-loader' : MiniCssExtractPlugin.loader , 'css-loader']
        },
        {
            test: /\.s[ac]ss$/,
            use: [isDev ? 'style-loader' : MiniCssExtractPlugin.loader , 'css-loader' , 'sass-loader']
        }
    ])

    /* ** config for production mode ** */
    if(!isDev){
        config.output.filename= '[name].[contenthash].js'
        config.plugins.push(
            new MiniCssExtractPlugin({
                filename: '[name].[contenthash].css'
            })
        )
    }
  
    return config
}