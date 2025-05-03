/*
 * @Date: 2025-05-03 12:04:37
 * @LastEditors: hookehuyr hookehuyr@gmail.com
 * @LastEditTime: 2025-05-03 15:07:38
 * @FilePath: /sails-study/back/config/env/development.js
 * @Description: Sails.js开发环境配置文件，用于设置开发环境特定的配置项
 */

/**
 * development.js
 *
 * 开发环境配置文件
 * 该文件包含了在开发环境下运行应用程序所需的所有配置项
 * 包括日志级别、数据库连接、模型迁移策略、安全设置和服务端口等
 */

module.exports = {
    /**
     * 日志配置
     * level: 日志级别，可选值：
     * - silly: 最详细的日志级别
     * - verbose: 详细的日志级别
     * - info: 信息级别的日志
     * - debug: 调试级别（开发环境推荐）
     * - warn: 警告级别
     * - error: 错误级别
     */
    log: {
        level: 'debug',
    },

    /**
     * 数据库配置
     * adapter: 数据库适配器，这里使用MySQL
     * url: 数据库连接URL，格式：
     * mysql://username:password@host:port/database
     *
     * 注意：生产环境中应使用环境变量存储敏感信息
     */
    datastores: {
        default: {
            adapter: 'sails-mysql',
            url: 'mysql://root:huyirui520@localhost:3306/ecommerce_db',
        },
    },

    /**
     * 模型配置
     * migrate: 数据库迁移策略，可选值：
     * - safe: 不自动迁移数据库（生产环境推荐）
     * - alter: 自动更新数据库表结构（开发环境推荐）
     * - drop: 删除并重新创建表（谨慎使用）
     */
    models: {
        migrate: 'alter',
    },

    /**
     * 安全配置
     * cors: 跨域资源共享设置
     * - allRoutes: 是否对所有路由启用CORS
     * - allowOrigins: 允许的源域名，'*'表示允许所有域
     * - allowCredentials: 是否允许发送认证信息
     * - allowRequestMethods: 允许的HTTP请求方法
     * - allowRequestHeaders: 允许的请求头
     *
     * 注意：生产环境应该限制allowOrigins为特定域名
     */
    security: {
        cors: {
            allRoutes: true,
            allowOrigins: '*',
            allowCredentials: false,
            allowRequestMethods: 'GET, POST, PUT, DELETE, OPTIONS, HEAD',
            allowRequestHeaders: 'content-type',
        },
    },

    /**
     * 端口配置
     * 开发服务器监听的端口号
     * 可以通过环境变量PORT覆盖此设置
     */
    port: 1337,
}
