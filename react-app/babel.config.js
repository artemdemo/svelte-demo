module.exports = {
    presets: [
        '@babel/preset-react',
        ['@babel/preset-env', {
            targets: {
                browsers: ['last 2 versions'],
            },
        }],
    ],
    // I was getting "Uncaught Reference Error: exports is not defined" in browser
    // """
    // Since you are compiling a CommonJS module you need to tell Babel that,
    // because otherwise it assumes that input files are ES modules.
    // The way to do that is with the sourceType options:
    // @link https://babeljs.io/docs/en/options#sourcetype
    // """
    // @link https://github.com/babel/babel/issues/9187#issuecomment-447704595
    sourceType: 'unambiguous',
    plugins: [
        '@babel/plugin-transform-react-jsx',
        '@babel/plugin-transform-object-assign',
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-proposal-object-rest-spread',
        '@babel/plugin-syntax-dynamic-import',
        ['@babel/plugin-transform-runtime', {
            regenerator: true,
        }],
    ],
};
