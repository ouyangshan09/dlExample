/**
 * Created by Ouyang on 2018/3/29.
 * webpack基础配置
 * @author Ouyang
 */
import Webpack, { Configuration } from 'webpack';
import Path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import Config from './config';

const defaultConfig: Configuration = {
    resolve: {
        extensions: ['.ts', '.js', '.json']
    },
    module: {
        rules: [{
            test: /\.(ts|tsx)$/,
            exclude: /(node_modules|lib)/,
            use: [{
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true,
                    'presets': ['env'],
                    'env': {
                        'test': {
                            'presets': ['env']
                        }
                    }
                }
            }, {
                loader: 'ts-loader'
            }]
        }, {
            test: /\.s?([ca])ss$/,
            exclude: [
                Path.join(Config.root, 'public'),
                Path.join(Config.root, 'node_modules'),
                Path.join(Config.root, 'lib')
            ],
            use: ExtractTextPlugin.extract({
                use: ['css-loader', 'postcss-loader', 'sass-loader'],
                fallback: 'style-loader'
            })
        }, {
            test: /\.(png|jpg|gif)$/,
            loader: 'url-loader',
            options: { limit: 8192 }
        }]
    },
    plugins: [
        new Webpack.DllReferencePlugin({
            context: Config.root,
            manifest: require(Path.join(Config.root, 'lib/vendor-manifest.json'))
        }),
        new HtmlWebpackPlugin({
            template: Path.join(Config.src, 'index.html'),
            title: 'ts-starter'
        }),
        new ExtractTextPlugin({
            filename: '[name].css',
            disable: false,
            allChunks: true
        })
    ]
};

export default defaultConfig;
