import 'dotenv-safe/config'

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
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.TALK_URL': JSON.stringify(process.env.TALK_URL)
    })
  ]
}

export default clientConfig
