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
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          configFile: path.resolve(__dirname, './tsconfig.client.json')
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.TALK_URL': JSON.stringify(process.env.TALK_URL),
      'process.env.HOSTNAME': JSON.stringify(process.env.HOSTNAME)
    })
  ]
}

export default clientConfig
