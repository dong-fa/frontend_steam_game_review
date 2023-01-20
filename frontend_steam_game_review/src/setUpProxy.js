const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://54.180.94.206:8080/api/auth/signup",
      changeOrigin: true,
    })
  );
};
