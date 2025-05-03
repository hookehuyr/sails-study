/*
 * @Date: 2025-05-03 12:05:03
 * @LastEditors: hookehuyr hookehuyr@gmail.com
 * @LastEditTime: 2025-05-03 12:05:04
 * @FilePath: /sails-study/back/config/http.js
 * @Description: 文件描述
 */
/**
 * http.js
 * HTTP中间件配置
 */

module.exports.http = {
  /**
   * 中间件配置
   */
  middleware: {
    order: [
      'cookieParser',
      'session',
      'bodyParser',
      'compress',
      'poweredBy',
      'router',
      'www',
      'favicon'
    ],

    /**
     * body解析器配置
     */
    bodyParser: (function() {
      const bodyParser = require('body-parser');
      const jsonParser = bodyParser.json({
        strict: true,
        limit: '10mb'
      });
      const urlencodedParser = bodyParser.urlencoded({
        extended: true,
        limit: '10mb'
      });
      return function(req, res, next) {
        jsonParser(req, res, function(err) {
          if (err) return next(err);
          urlencodedParser(req, res, next);
        });
      };
    })(),

    /**
     * Cookie解析器配置
     */
    cookieParser: function() {
      const cookieParser = require('cookie-parser');
      return cookieParser();
    },

    /**
     * 压缩中间件配置
     */
    compress: (function() {
      const compression = require('compression');
      return compression();
    })()
  },

  /**
   * 缓存配置
   */
  cache: 31557600000,

  /**
   * SSL配置（如果需要）
   */
  ssl: {
    enabled: false
  }
};
