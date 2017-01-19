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
       test: /\.worker\.js$/,
       loader: "worker!babel",
       presets: ['es2015'],
     }, 
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
  },
  
  worker: {
        output: {
            filename: "generated/hash.worker.js",
            chunkFilename: "[id].hash.worker.js"
        }
    }

}