/*
 * @Date: 2025-05-03 11:17:21
 * @LastEditors: hookehuyr hookehuyr@gmail.com
 * @LastEditTime: 2025-05-03 20:24:21
 * @FilePath: /sails-study/back/api/models/Order.js
 * @Description: 订单模型
 */

module.exports = {
  attributes: {
    // 订单编号
    orderNumber: {
      type: 'string',
      required: true,
      unique: true
    },

    // 关联用户
    user: {
      model: 'user',
      required: true
    },

    // 订单总金额
    totalAmount: {
      type: 'number',
      required: true,
      min: 0
    },

    // 订单状态
    status: {
      type: 'string',
      isIn: ['pending', 'paid', 'shipped', 'delivered', 'cancelled'],
      defaultsTo: 'pending'
    },

    // 收货地址
    shippingAddress: {
      type: 'json',
      required: true
    },

    // 支付信息
    paymentInfo: {
      type: 'json',
      defaultsTo: {}
    },

    // 订单项
    items: {
      collection: 'orderitem',
      via: 'order'
    },

    // 创建时间
    createdAt: {
      type: 'ref',
      columnType: 'datetime',
      autoCreatedAt: true
    },

    // 更新时间
    updatedAt: {
      type: 'ref',
      columnType: 'datetime',
      autoUpdatedAt: true
    }
  }
};
