/*
 * @Date: 2025-05-03 11:16:48
 * @LastEditors: hookehuyr hookehuyr@gmail.com
 * @LastEditTime: 2025-05-03 11:16:49
 * @FilePath: /test-study/config/datastores.js
 * @Description: 文件描述
 */
/**
 * Datastores
 * 数据库配置文件
 */

module.exports.datastores = {
  default: {
    adapter: 'sails-mysql',
    url: 'mysql://root:password@localhost:3306/ecommerce_db'
  }
};
