const path = require('path')
const fs = require('fs')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const postcssPresetEnv = require('postcss-preset-env')
const autoprefixer = require('autoprefixer')
const CopyWebpackPlugin= require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const getAllPages = (dir = '') => fs.readdirSync(path.resolve(__dirname, dir)).reduce((acc, file) => {
  const [name, ext] = file.split('.')
  if (ext !== undefined && ext === 'html') {
    acc.push(new HtmlWebpackPlugin({
      filename: `${name}.html`,
      template: path.resolve(__dirname, `src/pages/${name}.html`),
      inject: true
    }))
  }
  return acc
}, [])

const pages = getAllPages('src/pages')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: `bundle.js`,
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  plugins: [
    ...pages,
    new CopyWebpackPlugin(
      {
        patterns:[
          { from: 'src/images', to: './images' },
        ]
      }
    ),
    new CleanWebpackPlugin()
  ],
  devServer: {
    contentBase: path.join(__dirname, `dist`),
    open: false,
    port: 3000,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: `babel-loader`,
        },
      },
      {
        test: /\.((c|sa|sc)ss)$/i,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: { auto: true }
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                postcssPresetEnv({ stage: 0 }),
                autoprefixer({
                  overrideBrowserslist:['ie >= 8', 'last 4 version']
                })
              ]
            },
          },
        ],
      },
      {
        test: /\.(jpg|svg|png|gif)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'images/[name].[ext]'
          }
        }
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        include: [
          path.resolve(__dirname, "src/vendor/fonts")
        ],
        use: {
          loader: 'file-loader',
          options: {
            name: 'vendor/fonts/[name].[ext]'
          }
        },
      }
    ]
  },
  optimization: {
    minimizer: [new UglifyJsPlugin({
      sourceMap: false,
      uglifyOptions: {
        compress: {
          inline: true
        }
      }
    })]
  }
}
