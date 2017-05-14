module.exports = {
    entry:{ main : './main.ts', sw : './sw.ts'},
    context : __dirname + '/src',
    output: {
        filename: './dist/[name].js'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js','.html']
    },
    module: {
        loaders: [
            { test: /\.tsx?$/, loader: 'ts-loader' },
        ]
    },
    devtool: 'inline-source-map'
}