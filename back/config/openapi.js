/*
 * @Date: 2025-05-03 16:11:55
 * @LastEditors: hookehuyr hookehuyr@gmail.com
 * @LastEditTime: 2025-05-03 16:12:03
 * @FilePath: /back/config/openapi.js
 * @Description: 文件描述
 */
module.exports.openapi = {
    // 基本信息配置
    info: {
        title: 'sails-api',
        description: '测试sails-api',
        version: '1.0.0',
        contact: {
            name: 'API Support',
            email: 'support@example.com'
        }
    },
    // 模型扫描配置
    swaggerModels: {
        enabled: true,
        modelsPath: 'api/models',
        defaultResponseType: 'application/json',
        includeValidations: true,
        generateExamples: true
    },
    // 服务器配置
    servers: [
        {
            url: 'http://localhost:1337',
            description: 'Development server'
        }
    ],
    // 安全配置
    security: [
        {
            bearerAuth: []
        }
    ],
    // 组件配置
    components: {
        // 安全方案
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT'
            }
        },
        // 通用响应模式
        schemas: {
            Error: {
                type: 'object',
                properties: {
                    code: {
                        type: 'integer',
                        format: 'int32'
                    },
                    message: {
                        type: 'string'
                    }
                }
            }
        }
    },
    // 启用Swagger UI
    swagger: {
        enabled: true,
        path: '/swagger',
        swaggerUI: true,
        specUrl: '/swagger/swagger.json'
    },
    // 路由前缀
    prefix: '/api/v1',
    // 默认响应
    defaults: {
        responses: {
            '200': {
                description: '操作成功'
            },
            '400': {
                description: '请求错误',
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/Error'
                        }
                    }
                }
            },
            '401': {
                description: '未授权',
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/Error'
                        }
                    }
                }
            }
        }
    }
};
