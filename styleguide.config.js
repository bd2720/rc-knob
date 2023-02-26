const path = require('path');

module.exports = {
  title: 'rc-knob',
  version: "1.2.0",
  /*
  template: {
    favicon: 'docs/assets/favicon.ico'
  },
  */
  styleguideDir: "dist",
  sections: [
    {
      name: 'Knob',
      content: 'docs/knob.md'
    },
    {
      name: 'Base components',
      content: 'docs/basecomponents.md'
    },
    {
      name: 'User interaction',
      content: 'docs/interaction.md'
    },
    {
      name: 'Examples',
      sections: [
        {
          name: 'Basic',
          content: 'docs/example_basic.md'
        },
        {
          name: 'Stylized',
          content: 'docs/example_stylized.md'
        },
        {
          name: 'Custom',
          content: 'docs/example_custom.md'
        },
        {
          name: 'Gradient',
          content: 'docs/example_gradient.md'
        },
        {
          name: 'Async',
          content: 'docs/example_async.md'
        },
      ]
    },
  ],
  skipComponentsWithoutExample: true,
  require: [
    path.join(__dirname, 'docs/assets/examples.css'),
    path.join(__dirname, 'docs/assets/rsg.css'),
  ],
  webpackConfig: {
    module: {
      rules: [
        // Babel loader will use your project’s babel.config.js
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
        // Other loaders that are needed for your components
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        }
      ]
    }
  },
  pagePerSection: true,
};
