const { ModuleFederationPlugin } = require("webpack").container;
const remotes = require("./remotes");

const nextConfig = {
  reactStrictMode: false, // Desabilitar para evitar problemas com Module Federation
  experimental: {
    esmExternals: false, // Importante para Module Federation
  },
  webpack: (config, options) => {
    const { isServer } = options;

    // Configurações específicas para cliente
    if (!isServer) {
      config.experiments = { topLevelAwait: true, layers: true };
      config.plugins.push(
        new ModuleFederationPlugin({
          name: "main",
          remotes: {
            dashboard: remotes.dashboard,
          },
          filename: "static/chunks/remoteEntry.js",
          shared: {
            react: {
              singleton: true,
              requiredVersion: "^18.3.1",
              strictVersion: true,
            },
            "react-dom": {
              singleton: true,
              requiredVersion: "^18.3.1",
              strictVersion: true,
            },
            recharts: {
              singleton: true,
              requiredVersion: "^3.1.0",
            },
          },
        })
      );
    }

    return config;
  },
};

module.exports = nextConfig;
