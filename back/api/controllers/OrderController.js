2/**
 * OrderController.js
 * 订单控制器
 */

const sails = require('sails');
// 导入订单模型
const Order = sails.models.order;
// 导入订单项模型
const OrderItem = sails.models.orderitem;
// 导入商品模型
const Product = sails.models.product;

module.exports = {
  /**
   * 创建订单
   * @param {Object} req - 请求对象
   * @param {Object} res - 响应对象
   */
  create: async function(req, res) {
    try {
      const { products, shippingAddress } = req.body;
      const userId = req.user.id; // 需要配合身份验证中间件

      // 生成订单编号
      const orderNumber = 'ORD' + Date.now() + Math.floor(Math.random() * 1000);

      // 计算订单总金额并创建订单项
      let totalAmount = 0;
      const orderItems = [];

      for (const item of products) {
        const product = await Product.findOne({ id: item.productId });
        if (!product) {
          return res.badRequest(`商品ID ${item.productId} 不存在`);
        }

        if (product.stock < item.quantity) {
          return res.badRequest(`商品 ${product.name} 库存不足`);
        }

        const subtotal = product.price * item.quantity;
        totalAmount += subtotal;

        orderItems.push({
          product: item.productId,
          quantity: item.quantity,
          price: product.price,
          specifications: item.specifications || {}
        });

        // 更新商品库存
        await Product.updateOne({ id: item.productId })
          .set({ stock: product.stock - item.quantity });
      }

      // 创建订单
      const order = await Order.create({
        orderNumber,
        user: userId,
        totalAmount,
        shippingAddress
      }).fetch();

      // 创建订单项
      for (const item of orderItems) {
        await OrderItem.create({
          ...item,
          order: order.id
        });
      }

      // 返回完整的订单信息
      const completeOrder = await Order.findOne({ id: order.id })
        .populate('items');

      return res.status(201).json({
        message: '订单创建成功',
        order: completeOrder
      });
    } catch (error) {
      return res.serverError(error.message);
    }
  },

  /**
   * 获取订单列表
   * @param {Object} req - 请求对象
   * @param {Object} res - 响应对象
   */
  find: async function(req, res) {
    try {
      const userId = req.user.id;
      const { page = 1, limit = 10, status } = req.query;

      // 构建查询条件
      let query = { user: userId };
      if (status) query.status = status;

      // 分页查询
      const skip = (page - 1) * limit;
      const orders = await Order.find(query)
        .populate('items')
        .skip(skip)
        .limit(limit)
        .sort('createdAt DESC');

      // 获取总数
      const total = await Order.count(query);

      return res.json({
        orders,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total
        }
      });
    } catch (error) {
      return res.serverError(error.message);
    }
  },

  /**
   * 获取订单详情
   * @param {Object} req - 请求对象
   * @param {Object} res - 响应对象
   */
  findOne: async function(req, res) {
    try {
      const { id } = req.params;
      const userId = req.user.id;

      const order = await Order.findOne({
        id,
        user: userId
      }).populate('items');

      if (!order) {
        return res.notFound('订单不存在');
      }

      return res.json({ order });
    } catch (error) {
      return res.serverError(error.message);
    }
  },

  /**
   * 更新订单状态
   * @param {Object} req - 请求对象
   * @param {Object} res - 响应对象
   */
  updateStatus: async function(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const userId = req.user.id;

      // 验证状态值
      const validStatuses = ['pending', 'paid', 'shipped', 'delivered', 'cancelled'];
      if (!validStatuses.includes(status)) {
        return res.badRequest('无效的订单状态');
      }

      // 更新订单状态
      const updatedOrder = await Order.updateOne({
        id,
        user: userId
      }).set({ status });

      if (!updatedOrder) {
        return res.notFound('订单不存在');
      }

      return res.json({
        message: '订单状态更新成功',
        order: updatedOrder
      });
    } catch (error) {
      return res.serverError(error.message);
    }
  }
};
