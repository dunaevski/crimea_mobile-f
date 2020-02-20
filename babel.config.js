const path = require( 'path' );
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            components: path.resolve(__dirname, 'src/components/'),
            navigator: path.resolve(__dirname, 'src/navigator/'),
            screens: path.resolve(__dirname, 'src/screens/'),
          },
          extensions: [
            '.js',
            '.jsx',
            '.ts',
            '.tsx',
            '.json',
          ],
        },
      ],
    ]
  };
};
