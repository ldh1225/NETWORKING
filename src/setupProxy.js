const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://118.67.143.230:8080',
            changeOrigin: true,
        })
    );
};
