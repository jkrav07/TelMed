const path = require('path');

module.exports = {
  entry: path.join(__dirname, './client/src/index.jsx'),
  output: {
    path: path.join(__dirname, './client/dist'),
    filename: 'bundle.js', // <--- whatever you call this is what you should call the file in your .gitignore line 11
  },
  devtool: 'source-map', // <--- tells webpack the type of mapping we want for our source code
  resolve: {
    extensions: ['', '.js', '.jsx'], // <--- allows us to not need these extensions when we import files
  },
  plugins: [],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // <--- tests for files for js and jsx
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/, // <--- tests for css files in our project
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /.(jpe?g|png|gif|svg)$/i,
        type: 'asset/inline',
      },
    ],
  },
};
