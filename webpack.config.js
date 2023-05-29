const path = require('path');
const glob = require('glob');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');

const options = {
    fileName: 'manifest.json',
    map: (file) => {
        if (file.name.endsWith('.js')) {
            let nm = file.name;
            file.name = `js/${nm}`;
        } else if (file.name.endsWith('.css')) {
            let nm = file.name;
            file.name = `css/${nm}`;
        } else if (file.isAsset) {
            console.log("ImageFILE");
            let nm = file.name;
            file.name = `${nm}`;
        }
        return file;
    },
};

const jsEntries = {};
glob.sync(path.join(__dirname, 'assets/js/**/*.js')).forEach((file) => {
    const name = path.basename(file, '.js');
    jsEntries[name] = file;
});

const cssEntries = {};
glob.sync(path.join(__dirname, 'assets/scss/**/*.scss')).forEach((file) => {
    const name = path.basename(file, '.scss');
    cssEntries[name] = file;
});

module.exports = {
    mode: 'production',
    entry: {
        ...cssEntries,
        ...jsEntries,
        joinus: './assets/scss/joinus.scss',
        dashboard: './assets/scss/dashboard.scss',
        activereq: './assets/scss/activereq.scss',
    },
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'js/[name].min.js',
        publicPath: '',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.scss$/,
                exclude: /\/assets\/scss\/(modules|partials|variables)\//,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.scss$/,
                include: /\/assets\/scss\/(modules|partials|variables)\//,
                use: [
                    'null-loader'
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                use: [
                    {
                        loader: "responsive-loader",
                        options: {
                            name: '[name].[ext]',
                            adapter: require('responsive-loader/sharp'),
                            placeholder: true,
                            placeholderSize: 20,
                            quality: 90,
                            format: 'webp',
                            outputPath: 'images/',
                        }
                    }
                ],
                type: 'javascript/auto',
                parser: {
                    dataUrlCondition: {
                        maxSize: 1024,
                    },
                },
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[name][ext]',
                },
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].min.css',
        }),
        new WebpackManifestPlugin(options),
        new CleanWebpackPlugin(),
        new FixStyleOnlyEntriesPlugin({ extensions: ['scss'] }),
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    format: {
                        comments: false,
                    },
                },
                extractComments: false,
            }),
            new CssMinimizerPlugin(),
            new ImageMinimizerPlugin({
                minimizer: {
                    implementation: ImageMinimizerPlugin.sharpMinify,
                },
            }),
        ]
    },
};
