import * as webpack from 'webpack';
import * as path from 'path';
declare var __dirname: any;

const config: webpack.Configuration = {
  entry: './example/app.tsx',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'react-clone.bundle.js'
  },
  resolve: {
    extensions: ['.tsx', '.ts', 'js', 'jsx']
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'awesome-typescript-loader' },
    ]
  },
};

export default config;