// Note: You do not need to import this file anywhere. This is automatically registered when you start the development server.
// See https://create-react-app.dev/docs/proxying-api-requests-in-development/#configuring-the-proxy-manually
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/v1beta1/relay",
    createProxyMiddleware({
      target: "ws://localhost:8080",
      ws: true,
    })
  );
};
