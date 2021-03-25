const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");

const htmlWebpackPlugin = new HtmlWebpackPlugin({
    template: path.resolve(__dirname, "examples/public/index.html"),
    filename: "index.html"
});

module.exports = (env, argv) => {
    const PUBLIC_URL = argv.mode === 'development'
        ? '/'
        : '/react-trail'; //because of gh-pages

    return {
        entry: "./examples/src/app/index.js",
        output: {
            filename: "bundle.js",
            path: path.resolve(__dirname, "examples/dist"),
            publicPath: PUBLIC_URL
        },
        devServer: {
            historyApiFallback: true,
            port: 3200,
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    use: "babel-loader",
                    exclude: /node_modules/
                },
                {
                    test: /\.css$/,
                    use: ["style-loader", "css-loader"]
                }
            ]
        },
        plugins: [
            htmlWebpackPlugin,
            new webpack.DefinePlugin({
                'process.env.PUBLIC_URL': JSON.stringify(PUBLIC_URL)
            })
        ],
        resolve: {
            extensions: [".js", ".jsx"]
        }
    }
};