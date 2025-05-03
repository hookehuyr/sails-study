/*
 * @Date: 2025-05-03 16:49:29
 * @LastEditors: hookehuyr hookehuyr@gmail.com
 * @LastEditTime: 2025-05-03 19:20:52
 * @FilePath: /sails-study/back/tests/port-test.js
 * @Description: 文件描述
 */
/**
 * port-test.js
 * 端口可访问性测试脚本
 */

const http = require('http');
const net = require('net');

// 测试配置
const config = {
    host: 'localhost',
    port: 1337,
    timeout: 5000, // 超时时间：5秒
    retries: 3, // 重试次数
    retryDelay: 1000, // 重试间隔（毫秒）
    endpoints: [
        { path: '/api/v1/users/register', method: 'POST' },
        { path: '/api/v1/users/login', method: 'POST' },
        { path: '/api/v1/users/profile', method: 'GET' }
    ]
};

/**
 * 测试单个端点
 * @param {Object} endpoint - 端点配置
 * @returns {Promise} - 测试结果Promise
 */
/**
 * 检查端口是否可访问
 * @returns {Promise<boolean>} - 端口是否可访问
 */
async function checkPort() {
    return new Promise((resolve) => {
        const socket = new net.Socket();
        socket.setTimeout(config.timeout);

        socket.on('connect', () => {
            console.warn('✅ 服务器端口可访问');
            socket.destroy();
            resolve(true);
        });

        socket.on('timeout', () => {
            console.error('❌ 服务器端口连接超时');
            socket.destroy();
            resolve(false);
        });

        socket.on('error', (error) => {
            console.error(`❌ 服务器端口连接错误: ${error.message}`);
            resolve(false);
        });

        socket.connect(config.port, config.host);
    });
}

/**
 * 测试单个端点
 * @param {Object} endpoint - 端点配置
 * @param {number} retryCount - 当前重试次数
 * @returns {Promise<boolean>} - 测试结果Promise
 */
let authToken = null;

async function testEndpoint(endpoint, retryCount = 0) {
    return new Promise((resolve) => {
        const options = {
            host: config.host,
            port: config.port,
            path: endpoint.path,
            method: endpoint.method,
            timeout: config.timeout,
            headers: {
                'Content-Type': 'application/json',
                ...(authToken && { 'Authorization': `Bearer ${authToken}` })
            }
        };

        // 准备请求数据
        let requestData = null;
        if (endpoint.path === '/api/v1/users/register') {
            requestData = {
                username: 'testuser',
                email: 'test@example.com',
                password: 'Test123!@#',
                phone: '13800138000'
            };
        } else if (endpoint.path === '/api/v1/users/login') {
            requestData = {
                email: 'test@example.com',
                password: 'Test123!@#'
            };
        }

        const req = http.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                console.warn(`\n测试端点: ${endpoint.method} ${endpoint.path}`);
                console.warn(`状态码: ${res.statusCode}`);
                if (data) {
                    try {
                        const responseData = JSON.parse(data);
                        console.warn(`响应数据: ${JSON.stringify(responseData, null, 2)}`);

                        // 保存登录返回的token
                        if (endpoint.path === '/api/v1/users/login' && responseData.token) {
                            authToken = responseData.token;
                            console.warn('已保存认证token');
                        }
                    } catch (e) {
                        console.warn(`响应数据: ${data}`);
                    }
                }
                resolve(res.statusCode >= 200 && res.statusCode < 500);
            });
        });

        req.on('error', async (error) => {
            console.error(`\n测试端点: ${endpoint.method} ${endpoint.path}`);
            console.error(`错误: ${error.message}`);

            if (retryCount < config.retries) {
                console.warn(`尝试重试 (${retryCount + 1}/${config.retries})...`);
                await new Promise(r => setTimeout(r, config.retryDelay));
                const result = await testEndpoint(endpoint, retryCount + 1);
                resolve(result);
            } else {
                resolve(false);
            }
        });

        req.on('timeout', () => {
            console.error(`\n测试端点: ${endpoint.method} ${endpoint.path}`);
            console.error('错误: 请求超时');
            req.destroy();
            resolve(false);
        });

        // 发送请求数据
        if (requestData) {
            req.write(JSON.stringify(requestData));
        }
        req.end();


    });
}

/**
 * 运行所有测试
 */
async function runTests() {
    console.warn('开始测试服务器端口可访问性...');
    console.warn(`目标: ${config.host}:${config.port}\n`);

    // 首先检查端口是否可访问
    const portAccessible = await checkPort();
    if (!portAccessible) {
        console.warn('\n测试终止: 服务器端口不可访问');
        return;
    }

    let allTestsPassed = true;
    let successCount = 0;
    const totalEndpoints = config.endpoints.length;

    console.warn('\n开始测试API端点...');
    for (const endpoint of config.endpoints) {
        const result = await testEndpoint(endpoint);
        if (result) {
            successCount++;
        } else {
            allTestsPassed = false;
        }
    }

    console.warn('\n测试完成!');
    console.warn(`测试结果统计:`);
    console.warn(`- 总端点数: ${totalEndpoints}`);
    console.warn(`- 成功数量: ${successCount}`);
    console.warn(`- 失败数量: ${totalEndpoints - successCount}`);
    console.warn(`总体结果: ${allTestsPassed ? '✅ 所有测试通过' : '❌ 部分测试失败'}`);
}

// 执行测试
runTests();
