module.exports = {
  entry: ["./app.js"],
  output: {
    filename: "generated/bundle.js"
  },
  watch: true,
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'jshint-loader'

      }
   ],      
    loaders: [
     {
       test: /\.js$/,
       exclude: /node_modules/,
       loader: 'babel-loader',
       query: {
         presets: ['es2015']
       }
     }
    ]
  },
  resolve: {
    extensions: ['', '.js']
  },

  jshint: {
        esversion: 6
  }

}