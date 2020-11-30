const path = require('path')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
//   .BundleAnalyzerPlugin

module.exports = {
  outputDir: path.resolve(__dirname, '../backend/server_view/public'),
  indexPath: path.resolve(
    __dirname,
    '../backend/server_view/public/index.html'
  ),
  pages: {
    index: {
      entry: 'src/main.js',
      title: 'Kapliff'
    }
  },
  devServer: {
    disableHostCheck: true,
    port: 3000
  },
  transpileDependencies: ['vuetify'],
  configureWebpack: {
    // plugins: [new BundleAnalyzerPlugin()],
    resolve: {
      alias: {
        '@': path.join(__dirname, 'src/')
      }
    }
  }
}
