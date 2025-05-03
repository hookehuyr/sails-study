/*
 * @Date: 2025-05-03 12:04:11
 * @LastEditors: hookehuyr hookehuyr@gmail.com
 * @LastEditTime: 2025-05-03 15:13:31
 * @FilePath: /sails-study/back/app.js
 * @Description: 文件描述
 */
/**
 * app.js - Sails.js 应用入口文件
 * 配置和启动Sails.js应用服务器
 */

const sails = require('sails');

// 启动Sails应用
sails.lift({
    // 日志级别设置
    log: {
        level: 'info'
    },
    // 安全设置
    security: {
        cors: {
            allRoutes: true,
            allowOrigins: '*',
            allowCredentials: false,
            allowRequestMethods: 'GET, POST, PUT, DELETE, OPTIONS, HEAD',
            allowRequestHeaders: 'content-type'
        }
    },
    // 端口设置
    port: process.env.PORT || 1337,
    // 环境设置
    environment: process.env.NODE_ENV || 'development'
}, (err) => {
    if (err) {
        console.error('Sails应用启动失败:', err);
        return process.exit(1);
    }

    console.warn('Sails应用已启动 🚀');
    console.warn(`环境: ${sails.config.environment}`);
    console.warn(`端口: ${sails.config.port}`);
});
