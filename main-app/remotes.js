const isProd = process.env.NODE_ENV === "production";

const domains = {
  dashboard: isProd ? "https://dashboard.vercel.app" : "http://localhost:3001",
};

module.exports = {
  dashboard: `dashboard@${domains.dashboard}/remoteEntry.js`,
};
