const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');
const {
    IgnorePlugin,
    DefinePlugin,
} = require('webpack');
const {
    ModuleConcatenationPlugin,
} = require('webpack').optimize;
const extractStyles = require('./extractStyles');

const fontLoaders = [
    {
        test: /\.(svg)(\?.*$|$)/,
        use: 'url-loader?limit=65000&mimetype=image/svg+xml&name=fonts/[name].[ext]',
    },
    {
        test: /\.(woff)(\?.*$|$)/,
        use: 'url-loader?limit=65000&mimetype=application/font-woff&name=fonts/[name].[ext]',
    },
    {
        test: /\.(woff2)(\?.*$|$)/,
        use: 'url-loader?limit=65000&mimetype=application/font-woff2&name=fonts/[name].[ext]',
    },
    {
        test: /\.([ot]tf)(\?.*$|$)/,
        use: 'url-loader?limit=65000&mimetype=application/octet-stream&name=fonts/[name].[ext]',
    },
    {
        test: /\.(eot)(\?.*$|$)/,
        use: 'url-loader?limit=65000&mimetype=application/vnd.ms-fontobject&name=fonts/[name].[ext]',
    },
];

/**
 * @param options {Object}
 * @param options.isProduction {Boolean}
 * @param options.buildFolder {String}
 * @param options.appVersion {String}
 * @param options.extractStylesFile {Boolean}
 */
module.exports = (options) => {
    return {
        entry: {
            bundle: './source/index.jsx',
        },
        output: {
            path: `${process.cwd()}/${options.buildFolder}`,

            // @docs https://webpack.js.org/guides/caching/#deterministic-hashes
            filename: options.isProduction ?
                './js/[name]-[chunkhash].js' :
                './js/[name].js',
            chunkFilename: options.isProduction ?
                './js/[id].chunk-[chunkhash].js' :
                './js/[id].chunk.js',
            publicPath: '/',
        },
        resolve: {
            extensions: ['.js', '.jsx'],
            alias: {
                '@svelte-app': path.resolve(__dirname, '../../svelte-app/build/components'),
                '@test-ui': path.resolve(__dirname, '../../testUI/dist/lib'),
            },
        },
        module: {
            rules: [
                {
                    test: /\.(mjs|js|jsx)?$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader',
                    },
                },

                extractStyles.moduleRule(options.extractStylesFile),

                {test: /\.(png|gif|jpg)(\?.*$|$)/, use: 'url-loader?limit=100000&name=images/[hash].[ext]'},

                ...fontLoaders,
            ],
        },
        plugins: [
            // ModuleConcatenationPlugin
            // * faster build
            // * faster execution time in the browser
            // @link https://webpack.js.org/plugins/module-concatenation-plugin/
            new ModuleConcatenationPlugin(),

            // Ignoring warnings for following plugins, case they doesn't matter
            new IgnorePlugin(/regenerator|nodent|js-beautify/, /ajv/),

            // Defining global ENV variable
            // Useful for some age cases, when you need explicitly know whether you're in development or not
            // For example, when you want to log out something only in development mode
            // and don't want to delete this code in production, just want to deactivate it then.
            new DefinePlugin({
                ENV: {production: options.isProduction},
            }),

            new HtmlWebpackPlugin({
                template: './source/index.ejs',
                filename: './index.html',
                appVersion: options.appVersion,
            }),

            new CleanWebpackPlugin({
                verbose: true,
                dry: false,
                cleanOnceBeforeBuildPatterns: [
                    '**/*',
                    '!.gitignore',
                ],
            }),

            ...extractStyles.plugins(options.extractStylesFile, options.isProduction),
        ],
    };
};
