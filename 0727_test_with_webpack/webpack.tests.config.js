const path = require('path')

module.exports = {
    entry: ['./src/index.js', './src/index.test.js'],
    output: {
        filename: 'bundle.test.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/dist'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            },
            {
                test: /test\.js$/,
                use: 'mocha-loader',
                exclude: /node_modules/
            }
        ]
    }
}
