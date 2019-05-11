const nodeExternals = require('webpack-node-externals');

const mode = process.env.NODE_ENV || 'development';
const prod = mode === 'production';

module.exports = {
    entry: {
        index: './src/lib/index.js',
    },
    resolve: {
        extensions: ['.mjs', '.js', '.svelte']
    },
    output: {
        path: `${process.cwd()}/dist/lib`,
        filename: '[name].js',
        library: '',
        libraryTarget: 'commonjs'
    },
    externals: [nodeExternals()],
    module: {
        rules: [
            {
                test: /\.(mjs|js)?$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    mode,
    plugins: [],
    devtool: prod ? false: 'source-map'
};
