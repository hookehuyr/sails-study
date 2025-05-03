/**
 * ProductController.js
 * 商品控制器
 */

const sails = require('sails');
// 导入商品模型
const Product = sails.models.product;

module.exports = {
  /**
   * 获取商品列表
   * @param {Object} req - 请求对象，包含查询参数
   * @param {Object} res - 响应对象
   */
  find: async function(req, res) {
    try {
      const { page = 1, limit = 10, category, status, search } = req.query;

      // 构建查询条件
      let query = {};
      if (category) query.category = category;
      if (status) query.status = status;
      if (search) {
        query.or = [
          { name: { contains: search } },
          { description: { contains: search } }
        ];
      }

      // 分页查询
      const skip = (page - 1) * limit;
      const products = await Product.find(query)
        .skip(skip)
        .limit(limit);

      // 获取总数
      const total = await Product.count(query);

      return res.json({
        products,
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
   * 获取单个商品详情
   * @param {Object} req - 请求对象
   * @param {Object} res - 响应对象
   */
  findOne: async function(req, res) {
    try {
      const { id } = req.params;
      const product = await Product.findOne({ id });

      if (!product) {
        return res.notFound('商品不存在');
      }

      return res.json({ product });
    } catch (error) {
      return res.serverError(error.message);
    }
  },

  /**
   * 创建新商品
   * @param {Object} req - 请求对象
   * @param {Object} res - 响应对象
   */
  create: async function(req, res) {
    try {
      const productData = req.body;

      // 创建商品
      const newProduct = await Product.create(productData).fetch();

      return res.status(201).json({
        message: '商品创建成功',
        product: newProduct
      });
    } catch (error) {
      return res.serverError(error.message);
    }
  },

  /**
   * 更新商品信息
   * @param {Object} req - 请求对象
   * @param {Object} res - 响应对象
   */
  update: async function(req, res) {
    try {
      const { id } = req.params;
      const updateData = req.body;

      // 更新商品
      const updatedProduct = await Product.updateOne({ id })
        .set(updateData);

      if (!updatedProduct) {
        return res.notFound('商品不存在');
      }

      return res.json({
        message: '商品更新成功',
        product: updatedProduct
      });
    } catch (error) {
      return res.serverError(error.message);
    }
  },

  /**
   * 删除商品
   * @param {Object} req - 请求对象
   * @param {Object} res - 响应对象
   */
  delete: async function(req, res) {
    try {
      const { id } = req.params;

      // 删除商品
      const deletedProduct = await Product.destroyOne({ id });

      if (!deletedProduct) {
        return res.notFound('商品不存在');
      }

      return res.json({
        message: '商品删除成功',
        product: deletedProduct
      });
    } catch (error) {
      return res.serverError(error.message);
    }
  }
};
