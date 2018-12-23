module.exports = {
    entry: {
        twigjs: "./src/index.ts"
    },
    output: {
        path: `${__dirname}/dist`,
        filename: '[name].js'
    },
    resolve: {
        extensions: ['ts', 'js']
    },
    module: {
        rules: {
            {
                test: /\.ts$/,
                loader: 'ts-loader'
            }
        }
    }
};