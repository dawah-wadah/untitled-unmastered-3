var path = require('path');
var fs = require('fs');

var nodeModules = {};
fs.readdirSync('node_modules')

module.exports = {
  context: __dirname,
  entry: "./lib/main.js",
  target: 'node',
  node: {
   fs: "empty"
  },
  output: {
    path: path.resolve(__dirname, 'scripts'),
    filename: "server.js"
  },
  devtool: 'source-maps',
  externals: nodeModules,
  resolve: {
    extensions: [".js", "*"]
  }
};
