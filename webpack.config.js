module.exports = {
    entry: {
        wand: "./src/wand.js"
    },
    output: {
        path: `${__dirname}/dist`,
        filename: '[name].js'
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader'
            }
        ]
    }
};