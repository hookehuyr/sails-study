/*
 * @Date: 2025-05-03 11:16:55
 * @LastEditors: hookehuyr hookehuyr@gmail.com
 * @LastEditTime: 2025-05-03 11:20:20
 * @FilePath: /test-study/config/routes.js
 * @Description: 文件描述
 */
/**
 * Route Mappings
 * 路由配置文件
 */

module.exports.routes = {
  // 用户相关接口
  'POST /api/v1/users/register': 'UserController.register',
  'POST /api/v1/users/login': 'UserController.login',
  'GET /api/v1/users/profile': 'UserController.profile',

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
