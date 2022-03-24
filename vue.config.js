const path = require('path')
const CompressionPlugin = require('compression-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
    // 部署应用包时的基本 URL,用法和 webpack 本身的 output.publicPath 一致
    publicPath: '/vue-ts/',
    // 输出文件目录
    outputDir: 'vue-ts',
    assetsDir: 'assets',
    // eslint-loader 是否在保存的时候检查
    lintOnSave: true,
    // 生产环境是否生成 sourceMap 文件
    productionSourceMap: false,
    // webpack相关配置
    chainWebpack: (config) => {
        config.resolve.alias
            .set('@', path.resolve(__dirname, './src'))

        config.optimization.splitChunks({
            chunks: 'all',
            cacheGroups: {
                // default: false,// default缓存组，它会将至少有两个chunk引入的模块进行拆分，false表示不拆分
                vendors: {
                    name: 'chunk-vendors',
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                },
                common: {
                    name: 'chunk-common',
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        })

        if (isProd) {
            config.plugin('compressionPlugin')
                .use(new CompressionPlugin({
                    algorithm: 'gzip',
                    test: /\.js$|\.html$|\.css$|\.less$|\.jpg$|\.jpeg$|\.png/,
                    // test: productionGzipExtensions,
                    threshold: 10240,
                    minRatio: 0.8,
                    deleteOriginalAssets: false
                }));
        }

        // 开启HMR热更新
        config.resolve.symlinks(true);

        //向index.html传递参数
        config.plugin('html').tap(args=>{
            //添加参数env
            args[0].env = process.env.NODE_ENV;
            args[0].BASE_URL = process.env.BASE_URL;
            return args
        })
    },
    configureWebpack: (config) => {
        if (process.env.NODE_ENV === 'production') {
            // 生产环境
            config.mode = 'production'
        } else {
            // 开发环境
            config.mode = 'development'
        }
    },
    // css相关配置
    css: {
        // 是否分离css（插件ExtractTextPlugin）
        extract: true,
        // 是否开启 CSS source maps
        sourceMap: false,
        // css预设器配置项
        loaderOptions: {
            less: {
                lessOptions: {
                    javascriptEnabled: true,
                },
            },
        },
        // 是否启用 CSS modules for all css / pre-processor files.
        modules: false
        // requireModuleExtension: false
    },
    // webpack-dev-server 相关配置
    devServer: {
        port: 80,
        open: false,
        disableHostCheck: true,
        // http 代理配置
        proxy: {
            '/vue-study': {
                target: 'http://127.0.0.1:8088/vue-study',
                changeOrigin: true,
                pathRewrite: {
                    '^/vue-study': ''
                }
            },
            '/cityjson': {
                target: 'http://pv.sohu.com/cityjson',
                changeOrigin: true,
            }
        }
    }
}
