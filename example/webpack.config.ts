import webpack from 'webpack'

export const clientConfig: webpack.Configuration = {
  entry: ['./src/client.ts', './src/worker.ts'],
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [{test: /\.tsx?$/, loader: 'ts-loader'}]
  }
}

export default clientConfig
