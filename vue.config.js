const path = require('path')
const webpack = require('webpack')
const exists = function(name) {
    try {
        require(name)
        return true
    } catch (e) {
        return false
    }
}

const opts = {
    HLS_AVAILABLE: JSON.stringify(process.env.HLS_DISABLED ? false : exists('hls.js')),
    DASH_AVAILABLE: JSON.stringify(process.env.DASH_DISABLED ? false : exists('dashjs'))
}

module.exports = {
    chainWebpack: (config) => {
        config.module
            .rule('vue')
            .use('global-vue-loader')
            .loader(path.resolve(__dirname, 'scripts/global-vue-loader'))
            .before('vue-loader')
        config
            .entry('app')
            .clear()
            .add('./demo/main.js')
    },
    configureWebpack: {
        plugins: [
            new webpack.DefinePlugin({
                'process.env': opts
            })
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, 'demo/static')
    }
}
