const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const packageFile = require('./package.json');

const mode = process.env.NODE_ENV || 'development';
const prod = mode === 'production';

module.exports = {
    entry: {
        bundle: './source/index.js',
    },
    resolve: {
        extensions: ['.mjs', '.js', '.svelte']
    },
    output: {
        path: `${process.cwd()}/build`,
        filename: '[name].js',
        chunkFilename: '[name].[id].js'
    },
    module: {
        rules: [
            {
                test: /\.svelte$/,
                exclude: /node_modules/,
                use: {
                    loader: 'svelte-loader',
                    options: {
                        emitCss: true,
                        hotReload: true
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    /**
                     * MiniCssExtractPlugin doesn't support HMR.
                     * For developing, use 'style-loader' instead.
                     * */
                    prod ? MiniCssExtractPlugin.loader : 'style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    mode,
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css'
		}),
		
		new HtmlWebpackPlugin({
			template: './source/index.ejs',
			filename: './index.html',
			appVersion: packageFile.version,
		}),

		new CleanWebpackPlugin({
			verbose: true,
			dry: false,
			cleanOnceBeforeBuildPatterns: [
                '**/*',
                '!components',
                '!components/*',
                '!.gitignore',
            ],
		}),
    ],
    devtool: prod ? false: 'source-map'
};
