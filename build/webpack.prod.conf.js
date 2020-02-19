'use strict'
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer')

const env = require('../config/prod.env')

const webpackConfig = merge(baseWebpackConfig, {
    module: {
        rules: utils.styleLoaders({
            sourceMap: config.build.productionSourceMap,
            extract: true,
            usePostCSS: true
        })
    },
    devtool: config.build.productionSourceMap ? config.build.devtool : false,
    output: {
        path: config.build.assetsRoot,
        filename: utils.assetsPath('js/[name].[chunkhash].js'),
        chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
    },
    externals:{
        // vue:'Vue',
        // 'element-ui':'element',
        // 'vue-router':'vueRouter',
        // vuex:'Vuex',
        // axios:'axios',
        // echarts:'echarts'
    },
    plugins: [
        // http://vuejs.github.io/vue-loader/en/workflow/production.html
        new webpack.DefinePlugin({
            'process.env': env
        }),
        // 去掉打包时的console
        new UglifyJsPlugin({
            uglifyOptions: {
                compress: {
                    warnings: false,
                    drop_console:true,
                    drop_debugger:true,
                    pure_funcs:['console.log'] // 移除console
                }
            },
            sourceMap: false,
            parallel: true
        }),
        // webpack4利用splitChunks提取公共代码 webpack3利用CommonsChunkPlugin抽取公共代码
        // new webpack.optimize.CommonsChunkPlugin('common.js',['common']),
        // new webpack.optimize.CommonsChunkPlugin({
        //     name:'vendor', // 抽取第三方依赖
        //     filename:'vendor.bundle.js',
        //     chunks:['common'],
        //     minChunks:Infinity,
        // }),
        // extract css into its own list
        new ExtractTextPlugin({
            filename: utils.assetsPath('css/[name].[contenthash].css'),
            // Setting the following option to `false` will not extract CSS from codesplit chunks.
            // Their CSS will instead be inserted dynamically with style-loader when the codesplit chunk has been loaded by webpack.
            // It's currently set to `true` because we are seeing that sourcemaps are included in the codesplit bundle as well when it's `false`,
            // increasing list size: https://github.com/vuejs-templates/webpack/issues/1110
            allChunks: true,
        }),
        // Compress extracted CSS. We are using this plugin so that possible
        // duplicated CSS from different components can be deduped.
        new OptimizeCSSPlugin({
            cssProcessorOptions: config.build.productionSourceMap
                ? {safe: true, map: {inline: false}}
                : {safe: true}
        }),
        // generate dist index.html with correct asset hash for caching.
        // you can customize output by editing /index.html
        // see https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
            filename: config.build.index,
            template: 'index.html',
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: false
                // more options:
                // https://github.com/kangax/html-minifier#options-quick-reference
            },
            // necessary to consistently work with multiple chunks via CommonsChunkPlugin
            chunksSortMode: 'dependency'
        }),
        // keep module.id stable when vendor modules does not change
        new webpack.HashedModuleIdsPlugin(),
        // enable scope hoisting
        new webpack.optimize.ModuleConcatenationPlugin(),
        // split vendor js into its own list
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks (module) {
                // any required modules inside node_modules are extracted to vendor
                return (
                    module.resource &&
                    /\.js$/.test(module.resource) &&
                    module.resource.indexOf(
                        path.join(__dirname, '../node_modules')
                    ) === 0
                )
            }
        }),
        // extract webpack runtime and module manifest to its own list in order to
        // prevent vendor hash from being updated whenever app bundle is updated
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            minChunks: Infinity
        }),
        // This instance extracts shared chunks from code splitted chunks and bundles them
        // in a separate chunk, similar to the vendor chunk
        // see: https://webpack.js.org/plugins/commons-chunk-plugin/#extra-async-commons-chunk
        new webpack.optimize.CommonsChunkPlugin({
            name: 'app',
            async: 'vendor-async',
            children: true,
            minChunks: 3
        }),

        // copy custom static assets
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, '../static'),
                to: config.build.assetsSubDirectory,
                ignore: ['.*']
            }
        ]),
        // delete moment besides zh-cn 删除moment语言包除中文外的其他语言
        new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn$/),

        // 增加打包后的体积分析
        new BundleAnalyzerPlugin({
            analyzerMode: 'server',
            analyzerHost: '127.0.0.1',
            analyzerPort: '5555',
            reportFilename: 'report.html',
            defaultSizes: 'parsed',
            openAnalyzer: true,
            generateStatsFile: false,
            statsFilename: 'stats.json',
            statsOptions: null,
            logLevel: 'info'
        }),
    ]
})

// gzip压缩
if (config.build.productionGzip) {
    const CompressionWebpackPlugin = require('compression-webpack-plugin')

    webpackConfig.plugins.push(
        new CompressionWebpackPlugin({
            filename: '[path].gz[query]',
            algorithm: 'gzip',
            test:config.build.productionGzipExtensions,
            threshold: 10240,
            minRatio: 0.8
        }),
    )
}

// 使用cdn
if (config.build.productionCdn){
    const cdn = {
        css:[
            'unpkg.com/element-ui@2.13.0/lib/theme-chalk/index.css'
        ],
        js:[
            'cdn.bootcss.com/vue/2.5.20/vue.min.js',
            'cdn.bootcss.com/vue-router/3.0.1/vue-router.min.js',
            'cdn.bootcss.com/vuex/3.1.0/vuex.min.js',
            'cdn.bootcss.com/axios/0.18.0/axios.min.js',
            'unpkg.com/element-ui@2.13.0/lib/index.js',
            'unpkg.com/echarts@4.5.0/dist/echarts.js'
        ]
    }

    // 向htmlWebpackPlugin中添加cdn
    webpackConfig.plugins[5].cdn = cdn

    /*webpack4*/
    // webpackConfig
    //     .plugin('html')
    //     .tag(args => {
    //         args[0].cdn = cdn
    //         return args
    //     })
}

if (config.build.bundleAnalyzerReport) {
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
    webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
