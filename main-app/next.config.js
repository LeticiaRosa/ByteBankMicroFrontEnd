const { NextFederationPlugin } = require("@module-federation/nextjs-mf");
const remotes = require("./remotes");

const nextConfig = {
  reactStrictMode: true,
  webpack: (config, options) => {
    const { isServer } = options;
    config.experiments = { topLevelAwait: true, layers: true };

    config.plugins.push(
      new NextFederationPlugin({
        name: "main",
        remotes: {
          dashboard: remotes.dashboard,
        },
        filename: "static/chunks/remoteEntry.js",
        extraOptions: {
          exposePages: true,
          automaticAsyncBoundary: true,
        },
        // exposes: {
        //   './footer': './components/Footer.js',
        //   './nav': './components/Nav.js'
        // }
      })
    );
    return config;
  },
};

module.exports = nextConfig;
