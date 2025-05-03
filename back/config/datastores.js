/*
 * @Date: 2025-05-03 11:16:48
 * @LastEditors: hookehuyr hookehuyr@gmail.com
 * @LastEditTime: 2025-05-03 15:08:49
 * @FilePath: /sails-study/back/config/datastores.js
 * @Description: 数据库配置文件
 */

module.exports.datastores = {
  default: {
    adapter: 'sails-mysql',
    url: 'mysql://root:huyirui520@localhost:3306/ecommerce_db'
  }
};
