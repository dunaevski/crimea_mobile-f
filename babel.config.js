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
            globalStore: path.resolve(__dirname, 'src/globalStore/'),
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
      [
        "@babel/plugin-proposal-decorators",
        {
          legacy: true
        }
      ],
    ]
  };
};
