/*
 * @Date: 2025-05-03 12:05:33
 * @LastEditors: hookehuyr hookehuyr@gmail.com
 * @LastEditTime: 2025-05-03 15:36:53
 * @FilePath: /sails-study/back/config/bootstrap.js
 * @Description: 文件描述
 */
/**
 * bootstrap.js
 * 应用启动配置文件
 */

const sails = require('sails');

module.exports.bootstrap = async function(done) {
  // 在应用启动时执行的初始化代码

  // 检查数据库连接
  try {
    await sails.getDatastore().sendNativeQuery('SELECT 1');
    sails.log.info('数据库连接成功');
  } catch (error) {
    sails.log.error('数据库连接失败:', error);
  }

  // 加载环境变量
  process.env.NODE_ENV = process.env.NODE_ENV || 'development';

  // 设置默认时区
  process.env.TZ = 'Asia/Shanghai';

  // 调用回调函数，表示启动过程完成
  return done();
};
