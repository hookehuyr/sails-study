/*
 * @Date: 2025-05-03 11:17:29
 * @LastEditors: hookehuyr hookehuyr@gmail.com
 * @LastEditTime: 2025-05-03 20:24:29
 * @FilePath: /sails-study/back/api/models/OrderItem.js
 * @Description: 订单项模型
 */

module.exports = {
  attributes: {
    // 关联订单
    order: {
      model: 'order',
      required: true
    },

    // 关联商品
    product: {
      model: 'product',
      required: true
    },

    // 购买数量
    quantity: {
      type: 'number',
      required: true,
      min: 1
    },

    // 商品单价（下单时的价格）
    price: {
      type: 'number',
      required: true,
      min: 0
    },

    // 小计金额
    subtotal: {
      type: 'number',
      required: true,
      min: 0
    },

    // 商品规格信息（快照）
    specifications: {
      type: 'json',
      defaultsTo: {}
    }
  },

  // 计算小计金额
  beforeCreate: async function(values, proceed) {
    values.subtotal = values.quantity * values.price;
    return proceed();
  }
};
