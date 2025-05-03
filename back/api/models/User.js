/*
 * @Date: 2025-05-03 11:17:04
 * @LastEditors: hookehuyr hookehuyr@gmail.com
 * @LastEditTime: 2025-05-03 11:17:05
 * @FilePath: /test-study/api/models/User.js
 * @Description: 文件描述
 */
/**
 * User.js
 * 用户模型
 */

module.exports = {
  attributes: {
    // 用户名
    username: {
      type: 'string',
      required: true,
      unique: true,
      minLength: 3,
      maxLength: 50
    },

    // 邮箱
    email: {
      type: 'string',
      required: true,
      unique: true,
      isEmail: true
    },

    // 密码（加密存储）
    password: {
      type: 'string',
      required: true,
      minLength: 6
    },

    // 手机号码
    phone: {
      type: 'string',
      allowNull: true
    },

    // 地址信息
    addresses: {
      type: 'json',
      defaultsTo: []
    },

    // 用户角色（普通用户/管理员）
    role: {
      type: 'string',
      isIn: ['user', 'admin'],
      defaultsTo: 'user'
    },

    // 关联的订单
    orders: {
      collection: 'order',
      via: 'user'
    }
  },

  // 在返回用户数据前去除敏感信息
  customToJSON: function() {
    return _.omit(this, ['password']);
  }
};
