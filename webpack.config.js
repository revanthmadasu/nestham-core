const path = require('path');

module.exports = {
    entry: './app.js',
    output: {
        filename: 'js/main.bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        static: './dist',
        hot: true,
    },
    watch: true,
    resolve: {
        extensions: [
            '.js'
        ]
    },
    target: 'node'
}