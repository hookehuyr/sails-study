/*
 * @Date: 2025-05-03 12:05:03
 * @LastEditors: hookehuyr hookehuyr@gmail.com
 * @LastEditTime: 2025-05-03 19:21:36
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
      'requestLogger',
      'compress',
      'poweredBy',
      'router',
      'www',
      'favicon',
    ],

    /**
     * 请求日志记录中间件
     */
    requestLogger: function (req, res, next) {
      const startTime = Date.now();

      // 记录请求体信息
      if (req.method !== 'GET') {
        try {
          if (req.body) {
            if (Object.keys(req.body).length > 0) {
              // 过滤敏感信息
              const sanitizedBody = { ...req.body };
              if (sanitizedBody.password) sanitizedBody.password = '******';
              console.warn(`[Request] 请求体数据 - ${JSON.stringify(sanitizedBody)}`);
            } else {
              console.warn('[Request] 请求体为空对象');
            }
          } else {
            console.warn('[Request] 无请求体数据');
          }
        } catch (error) {
          console.error(`[Error] 请求体解析错误: ${error.message}`);
          return res.status(400).json({
            error: '请求体格式不正确',
            message: error.message
          });
        }
      }

      // 增强错误处理
      const originalServerError = res.serverError;
      res.serverError = function (data) {
        console.error(`[Error] 服务器错误 - ${req.method} ${req.url}`);
        console.error(`[Error] 错误详情:`, data);
        console.error(`[Error] 请求体:`, req.body);
        console.error(`[Error] 堆栈信息:`, new Error().stack);
        return originalServerError.call(this, data);
      };

      // 在响应结束时记录处理时间和状态
      res.on('finish', () => {
        const duration = Date.now() - startTime;
        const logLevel = res.statusCode >= 500 ? 'error' : 'info';
        // eslint-disable-next-line no-console
        console[logLevel](`[Request] 请求处理完成 - ${req.method} ${req.url} - 状态码: ${res.statusCode} - 耗时: ${duration}ms`);
      });

      next();
    },

    /**
     * body解析器配置
     */
    bodyParser: (function () {
      const bodyParser = require('body-parser');
      const jsonParser = bodyParser.json({
        strict: false,
        limit: '10mb',
        verify: function (req, res, buf) {
          try {
            JSON.parse(buf);
          } catch (e) {
            res.status(400).json({
              error: '请求体格式不正确',
              message: e.message
            });
            throw e;
          }
        }
      });
      const urlencodedParser = bodyParser.urlencoded({
        extended: true,
        limit: '10mb'
      });
      return function (req, res, next) {
        const contentType = req.headers['content-type'] || '';
        if (contentType.includes('application/json')) {
          jsonParser(req, res, function (err) {
            if (err) {
              console.error('[Error] JSON解析错误:', err.message);
              return res.status(400).json({
                error: '请求体格式不正确',
                message: err.message
              });
            }
            next();
          });
        } else {
          urlencodedParser(req, res, next);
        }
      };
    })(),

    /**
     * Cookie解析器配置
     */
    // cookieParser: function() {
    //   console.log('[CookieParser] 开始初始化 cookie-parser 中间件');
    //   const cookieParser = require('cookie-parser');
    //   const secret = '1234567890'; // 用于签名 Cookie 的密钥
    //   const parser = cookieParser(secret, {
    //     // 其他配置选项
    //     maxAge: 3600000, // Cookie 的有效时间（毫秒）
    //     path: '/', // Cookie 的路径
    //     httpOnly: true, // 确保 Cookie 只能通过 HTTP(S) 协议访问
    //   });
    //   console.warn(111);

    //   return function(req, res, next) {
    //     console.log('[CookieParser] 开始处理请求的 Cookie');
    //     try {
    //       parser(req, res, function(err) {
    //         if (err) {
    //           console.error('[CookieParser] Cookie 解析错误:', err.message);
    //           return res.status(400).json({
    //             error: 'Cookie 解析错误',
    //             message: err.message
    //           });
    //         }
    //         console.log('[CookieParser] Cookie 解析成功，继续处理请求');
    //         next();
    //       });
    //     } catch (error) {
    //       console.error('[CookieParser] 中间件执行异常:', error.message);
    //       return res.status(500).json({
    //         error: '服务器错误',
    //         message: '处理 Cookie 时发生异常'
    //       });
    //     }
    //   };
    // },

    // TODO: 待完善
    cookieParser: (function () {
      try {
        const cookieParser = require('cookie-parser');
        const secret = '1234567890'; // 用于签名 Cookie 的密钥
        const parser = cookieParser(secret, {
          // 其他配置选项
          maxAge: 3600000, // Cookie 的有效时间（毫秒）
          path: '/', // Cookie 的路径
          httpOnly: true, // 确保 Cookie 只能通过 HTTP(S) 协议访问
        });
        return parser()
      } catch (error) {
        console.error('[CookieParser] 初始化 cookie-parser 中间件时发生错误:', error.message);
      }
    })(),

    /**
     * 压缩中间件配置
     */
    compress: (function () {
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
