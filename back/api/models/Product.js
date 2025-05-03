/*
 * @Date: 2025-05-03 11:17:13
 * @LastEditors: hookehuyr hookehuyr@gmail.com
 * @LastEditTime: 2025-05-03 20:22:40
 * @FilePath: /sails-study/back/api/models/Product.js
 * @Description: 商品模型
 */

module.exports = {
  attributes: {
    // 商品名称
    name: {
      type: 'string',
      required: true,
      minLength: 2,
      maxLength: 100
    },

    // 商品描述
    description: {
      type: 'string',
      allowNull: true
    },

    // 商品价格
    price: {
      type: 'number',
      required: true,
      min: 0
    },

    // 商品库存
    stock: {
      type: 'number',
      min: 0,
      defaultsTo: 0
    },

    // 商品分类
    category: {
      type: 'string',
      required: true
    },

    // 商品图片URL数组
    images: {
      type: 'json',
      defaultsTo: []
    },

    // 商品状态（上架/下架）
    status: {
      type: 'string',
      isIn: ['active', 'inactive'],
      defaultsTo: 'active'
    },

    // 商品规格（如颜色、尺寸等）
    specifications: {
      type: 'json',
      defaultsTo: {}
    },

    // 关联的订单项
    orderItems: {
      collection: 'orderitem',
      via: 'product'
    }
  }
};
