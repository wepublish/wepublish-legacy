import path from 'path'
import webpack from 'webpack'

export const clientConfig: webpack.Configuration = {
  entry: {
    client: './src/client.ts',
    worker: './src/worker.ts'
  },
  output: {
    path: path.resolve(__dirname, './dist')
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [{test: /\.tsx?$/, loader: 'ts-loader'}]
  }
}

export default clientConfig
