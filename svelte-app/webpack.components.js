const CleanWebpackPlugin = require('clean-webpack-plugin');

const mode = process.env.NODE_ENV || 'development';
const prod = mode === 'production';

module.exports = {
    entry: {
        Button: './source/components/Button.svelte',
    },
    resolve: {
        extensions: ['.mjs', '.js', '.svelte']
    },
    output: {
        path: `${process.cwd()}/build/components`,
        filename: '[name].js',
        chunkFilename: '[name].[id].js',
        libraryTarget: 'umd',
        umdNamedDefine: true,
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
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    mode,
    plugins: [
		new CleanWebpackPlugin({
			verbose: true,
			dry: false,
			cleanOnceBeforeBuildPatterns: ['**/*', '!.gitignore'],
		}),
    ],
    devtool: prod ? false: 'source-map'
};
