const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const path = require("path");

module.exports = {
  entry: "./src/index.ts",
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-react", "@babel/preset-typescript"],
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
        include: [path.resolve(__dirname, "src")],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "dashboard",
      filename: "remoteEntry.js",

      exposes: {
        "./Dashboard": "./src/bootstrap.tsx",
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: "^18.3.1",
          eager: false,
          strictVersion: true, // Força versão exata
        },
        "react-dom": {
          singleton: true,
          requiredVersion: "^18.3.1",
          eager: false,
          strictVersion: true, // Força versão exata
        },
        recharts: {
          singleton: true,
          requiredVersion: "^3.1.0",
          eager: false,
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
