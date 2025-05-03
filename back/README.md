# 电商平台API服务

基于Sails.js框架开发的电商平台API服务，提供用户管理、商品管理、订单管理等核心功能。本项目主要用于学习后端开发，采用RESTful API设计风格，使用MySQL数据库存储数据。

## 技术栈

- **框架**: Sails.js v1.5.8
- **数据库**: MySQL
- **认证**: JWT (JSON Web Token)
- **密码加密**: bcryptjs
- **其他工具**: nodemon (开发环境)

## 项目架构

```
├── api/                    # API相关文件
│   ├── controllers/        # 控制器
│   │   ├── UserController.js    # 用户相关接口
│   │   ├── ProductController.js # 商品相关接口
│   │   └── OrderController.js   # 订单相关接口
│   └── models/            # 数据模型
│       ├── User.js        # 用户模型
│       ├── Product.js     # 商品模型
│       ├── Order.js       # 订单模型
│       └── OrderItem.js   # 订单项模型
├── config/                # 配置文件
│   ├── env/              # 环境配置
│   ├── bootstrap.js      # 启动配置
│   ├── datastores.js     # 数据存储配置
│   ├── http.js          # HTTP配置
│   ├── models.js        # 模型配置
│   ├── routes.js        # 路由配置
│   └── security.js      # 安全配置
└── app.js               # 应用入口文件
```

## 环境要求

- Node.js >= 14.x
- MySQL Server
- npm 或 yarn

## 快速开始

1. **安装依赖**

```bash
pnpm install
```

2. **配置数据库**

在 `config/env/development.js` 中配置数据库连接：

```javascript
datastores: {
  default: {
    adapter: 'sails-mysql',
    url: 'mysql://root:password@localhost:3306/ecommerce_db'
  }
}
```

3. **启动服务**

开发环境：
```bash
pnpm run dev
```

生产环境：
```bash
pnpm start
```

服务将在 http://localhost:1337 启动

## 主要功能

### 1. 用户管理
- 用户注册
- 用户登录（JWT认证）
- 获取用户信息
- 地址管理

### 2. 商品管理
- 商品列表（支持分页、搜索、分类筛选）
- 商品详情
- 商品创建/更新/删除
- 库存管理

### 3. 订单管理
- 创建订单
- 订单列表查询
- 订单详情
- 订单状态更新

## API接口文档

### 用户相关接口

#### 注册用户
- **POST** `/api/v1/users/register`
- **请求体**:
  ```json
  {
    "username": "string",
    "email": "string",
    "password": "string",
    "phone": "string"
  }
  ```

#### 用户登录
- **POST** `/api/v1/users/login`
- **请求体**:
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```

#### 获取用户信息
- **GET** `/api/v1/users/profile`
- **请求头**: `Authorization: Bearer {token}`

### 商品相关接口

#### 获取商品列表
- **GET** `/api/v1/products`
- **查询参数**:
  - page: 页码（默认1）
  - limit: 每页数量（默认10）
  - category: 商品分类
  - status: 商品状态
  - search: 搜索关键词

#### 获取商品详情
- **GET** `/api/v1/products/:id`

#### 创建商品
- **POST** `/api/v1/products`
- **请求体**:
  ```json
  {
    "name": "string",
    "description": "string",
    "price": "number",
    "stock": "number",
    "category": "string",
    "images": "array",
    "specifications": "object"
  }
  ```

### 订单相关接口

#### 创建订单
- **POST** `/api/v1/orders`
- **请求头**: `Authorization: Bearer {token}`
- **请求体**:
  ```json
  {
    "products": [
      {
        "productId": "string",
        "quantity": "number",
        "specifications": "object"
      }
    ],
    "shippingAddress": "object"
  }
  ```

#### 获取订单列表
- **GET** `/api/v1/orders`
- **请求头**: `Authorization: Bearer {token}`
- **查询参数**:
  - page: 页码（默认1）
  - limit: 每页数量（默认10）
  - status: 订单状态

## 安全配置

项目已配置CORS和基本的安全措施：

```javascript
security: {
  cors: {
    allRoutes: true,
    allowOrigins: '*',
    allowCredentials: false,
    allowRequestMethods: 'GET, POST, PUT, DELETE, OPTIONS, HEAD',
    allowRequestHeaders: 'content-type'
  }
}
```

## 开发环境配置

- 日志级别：debug
- 数据库迁移策略：alter（自动更新数据库结构）
- 启用API蓝图
- 启用开发者工具

## 部署说明

1. 确保生产环境的Node.js版本 >= 14.x
2. 配置生产环境的数据库连接
3. 设置适当的环境变量
4. 使用PM2或类似工具管理Node.js进程

## 后续优化建议

1. 功能扩展：
   - 实现商品评价系统
   - 添加购物车功能
   - 集成支付系统
   - 实现商品分类管理
   - 添加商品收藏功能

2. 技术改进：
   - 使用Redis实现缓存
   - 添加消息队列处理异步任务
   - 实现WebSocket推送订单状态更新
   - 集成对象存储服务管理商品图片
   - 添加Swagger文档

## 许可证

[MIT](LICENSE)
