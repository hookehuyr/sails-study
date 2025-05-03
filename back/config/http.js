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
    bodyParser: {
      json: {
        strict: true,
        limit: '10mb'
      },
      urlencoded: {
        extended: true,
        limit: '10mb'
      }
    }
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
