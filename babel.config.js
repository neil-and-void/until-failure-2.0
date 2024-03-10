module.exports = function(api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      ["@morrowdigital/watermelondb-expo-plugin"],
      "nativewind/babel",
      "react-native-reanimated/plugin",
      ["@babel/plugin-proposal-decorators", { legacy: true }],
      ["@babel/plugin-transform-flow-strip-types"],
      ["@babel/plugin-proposal-class-properties", { loose: true }],
      [
        "expo-build-properties",
        {
          android: {
            kotlinVersion: "1.6.10",
            packagingOptions: {
              pickFirst: ["**/libc++_shared.so"],
            },
          },
        },
      ],
    ],
  };
};
