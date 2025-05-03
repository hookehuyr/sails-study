/*
 * @Date: 2025-05-03 15:20:00
 * @LastEditors: hookehuyr hookehuyr@gmail.com
 * @LastEditTime: 2025-05-03 19:17:27
 * @FilePath: /sails-study/back/config/session.js
 * @Description: Sails.js会话配置文件
 */

/**
 * session.js
 * 会话配置文件
 */
module.exports.session = {
    /**
     * 会话密钥
     * 用于加密会话数据
     * 在生产环境中应使用强随机值
     */
    secret: 'extremely-secure-keyboard-cat',

    /**
     * 会话名称
     */
    name: 'sails.sid',

    /**
     * Cookie配置
     */
    cookie: {
        // 仅通过HTTP(S)访问，不允许客户端JavaScript访问
        httpOnly: true,
        // 设置Cookie的过期时间（24小时）
        maxAge: 24 * 60 * 60 * 1000
    },

    /**
     * 会话存储配置
     * 开发环境使用内存存储
     * 生产环境应该使用Redis等持久化存储
     */
    adapter: 'memory'
};
