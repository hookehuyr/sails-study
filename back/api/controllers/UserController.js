/**
 * UserController.js
 * 用户控制器
 */

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sails = require('sails');

// 导入用户模型
const User = sails.models.user;

module.exports = {
  /**
   * 用户注册
   * @param {Object} req - 请求对象，包含用户注册信息
   * @param {Object} res - 响应对象
   */
  register: async function(req, res) {
    try {
      // 数据验证阶段
      const { username, email, password, phone } = req.body;

      // 检查用户名或邮箱是否已存在
      const existingUser = await User.findOne({ or: [{ username }, { email }] });
      if (existingUser) {
        return res.badRequest('用户名或邮箱已被使用');
      }

      // 密码加密
      const hashedPassword = await bcrypt.hash(password, 10);

      // 创建新用户
      const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
        phone
      }).fetch();

      return res.status(201).json({
        message: '注册成功',
        user: newUser
      });
    } catch (error) {
      return res.serverError(error.message);
    }
  },

  /**
   * 用户登录
   * @param {Object} req - 请求对象，包含登录凭证
   * @param {Object} res - 响应对象
   */
  login: async function(req, res) {
    try {
      const { email, password } = req.body;

      // 查找用户
      const user = await User.findOne({ email });
      if (!user) {
        return res.notFound('用户不存在');
      }

      // 验证密码
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.badRequest('密码错误');
      }

      // 生成JWT令牌
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        'your-jwt-secret',  // 注意：在生产环境中应使用环境变量
        { expiresIn: '24h' }
      );

      return res.json({
        message: '登录成功',
        token,
        user
      });
    } catch (error) {
      return res.serverError(error.message);
    }
  },

  /**
   * 获取用户个人信息
   * @param {Object} req - 请求对象
   * @param {Object} res - 响应对象
   */
  profile: async function(req, res) {
    try {
      // 注意：需要配合身份验证中间件使用
      const userId = req.user.id;
      const user = await User.findOne({ id: userId });

      if (!user) {
        return res.notFound('用户不存在');
      }

      return res.json({
        user
      });
    } catch (error) {
      return res.serverError(error.message);
    }
  }
};
