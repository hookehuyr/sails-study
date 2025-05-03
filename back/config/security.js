/*
 * @Date: 2025-05-03 12:05:11
 * @LastEditors: hookehuyr hookehuyr@gmail.com
 * @LastEditTime: 2025-05-03 12:05:12
 * @FilePath: /sails-study/back/config/security.js
 * @Description: 安全配置文件
 */

module.exports.security = {
  /**
   * CORS配置
   */
  cors: {
    allRoutes: true,
    allowOrigins: '*',
    allowCredentials: false,
    allowRequestMethods: 'GET, POST, PUT, DELETE, OPTIONS, HEAD',
    allowRequestHeaders: 'content-type, authorization'
  },

  /**
   * CSRF保护
   */
  csrf: false,

  /**
   * 会话配置
   */
  session: {
    cookie: {
      maxAge: 24 * 60 * 60 * 1000 // 24小时
    }
  },

  /**
   * XSS保护
   */
  xssProtection: true,

  /**
   * 内容安全策略
   */
  contentSecurityPolicy: {
    enabled: true,
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
    styleSrc: ["'self'", "'unsafe-inline'"],
    imgSrc: ["'self'", 'data:', 'blob:']
  }
};
