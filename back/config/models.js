/*
 * @Date: 2025-05-03 12:04:44
 * @LastEditors: hookehuyr hookehuyr@gmail.com
 * @LastEditTime: 2025-05-03 12:04:45
 * @FilePath: /sails-study/back/config/models.js
 * @Description: 文件描述
 */
/**
 * models.js
 * 全局模型配置
 */

module.exports.models = {
  // 数据库表名前缀
  tablePrefix: '',

  // 主键配置
  primaryKey: 'id',

  // 属性配置
  attributes: {
    createdAt: { type: 'number', autoCreatedAt: true },
    updatedAt: { type: 'number', autoUpdatedAt: true },
    id: { type: 'number', autoIncrement: true }
  },

  // 数据迁移策略
  migrate: 'safe',

  // 架构模式
  schema: true,

  // 数据存储配置
  datastore: 'default',

  // 软删除配置
  cascadeOnDestroy: false
};
