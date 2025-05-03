/*
 * @Date: 2025-05-03 11:16:55
 * @LastEditors: hookehuyr hookehuyr@gmail.com
 * @LastEditTime: 2025-05-03 20:25:33
 * @FilePath: /sails-study/back/config/routes.js
 * @Description: 路由配置文件
 */

// 路由日志记录函数
const logRoute = function(req, res, next) {
  console.warn(`[Router] 匹配到路由 - ${req.method} ${req.path} -> ${req.options.controller}.${req.options.action}`);
  next();
};

module.exports.routes = {
  // 用户相关接口
  'POST /api/v1/users/register': {
    controller: 'UserController',
    action: 'register',
    middleware: logRoute
  },
  'POST /api/v1/users/login': {
    controller: 'UserController',
    action: 'login',
    middleware: logRoute
  },
  'GET /api/v1/users/profile': {
    controller: 'UserController',
    action: 'profile',
    middleware: logRoute
  },

  // 商品相关接口
  'GET /api/v1/products': 'ProductController.find',
  'GET /api/v1/products/:id': 'ProductController.findOne',
  'POST /api/v1/products': 'ProductController.create',
  'PUT /api/v1/products/:id': 'ProductController.update',
  'DELETE /api/v1/products/:id': 'ProductController.delete',

  // 订单相关接口
  'POST /api/v1/orders': 'OrderController.create',
  'GET /api/v1/orders': 'OrderController.find',
  'GET /api/v1/orders/:id': 'OrderController.findOne',
  'PUT /api/v1/orders/:id/status': 'OrderController.updateStatus',
}
