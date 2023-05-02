const { createProxyMiddleware } = require('http-proxy-middleware');
import { API_URL } from '../config';
module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: API_URL,
      changeOrigin: true
    })
  );
}; 