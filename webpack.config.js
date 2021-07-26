const path = require('path');

module.exports = {
    entry: './app.js',
    output: {
        filename: 'js/[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    watch: true,
    resolve: {
        extensions: [
            '.js'
        ]
    }
}