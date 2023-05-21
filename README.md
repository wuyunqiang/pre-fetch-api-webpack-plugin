# 应用场景：

可以应用在首屏接口上 和 js 并行发送请求 减少网络耗时 提升页面秒开率

# 实现原理
插件会在 html 的 head 里面插入一段 code 从 query 上面获取参数 提前进行请求接口，插件会在 window 上挂载 usePreFetchApiService 方法，业务方可以使用此方法来获取结果数据。

# 功能列表
1. 可以配置一个页面 并行请求多个接口
2. 可以配置多个页面 请求一个接口
3. 可以配置多个页面请求多个接口
4. 多个页面数据通过 hash||path 标识 防止数据互串
5. 数据获取 支持静态参数，query 参数，cookie 参数

# 参数说明
配置一个数组，根据 hashList || pathList 来匹配第一个命中的选项，
若两个字段同时存在则 pathList 优先级更高，每项有如下字段。

### pathList: 路径维度
用于拦截是否发送预请求 只有命中才会发送
设置["all"] 则不区分页面
通过location.pathname比较

### hashList：hash 维度
用于拦截是否发送预请求 只有命中才会发送
设置["all"] 则不区分页面
通过location.hash比较

### urls:
需要请求的接口数组 可以是一个字符串也可以是一个对象
如果是对象必须包含 url 可以覆盖外层的配置
会对 method,params,staticParams,cookieParams 做聚合处理，覆盖外层参数。

### method：
请求的方法 默认为post 支持post||get

### params：
请求参数从query上解析

### cookieParams：
请求参数从cookie中解析

### staticParams：
静态写死的参数

### 同名参数覆盖优先级：
params > cookieParams > staticParams

# 示例代码：

### 1: npm i pre-fetch-api-webpack-plugin <br>
### 2: vue.config.js
```
const PreFetchApiPlugin = require('pre-fetch-api-webpack-plugin');
chainWebpack: config => {
       config
           .plugin('PreFetchApiPlugin')
           .use(PreFetchApiPlugin, [[{
                method: 'post',
                params: { name: 'username' },
                staticParams: {
                    age: '18',
                },
                cookieParams:{
                    _address:"somewhere"
                }
                hashList: ['all'],
                urls: [
                    { url: `/aaa` },
                    {
                        url: `/bbb`,
                        method: 'get',
                        params: { add: 'add' },
                        staticParams: {
                            age: 33,
                            name: '333333',
                        },
                    },
                ],
            }]]);
   }
```

### 3:业务使用
```
export const getPageData = async () => {
    const usePreFetchApiService = window.usePreFetchApiService && window.usePreFetchApiService() || {};
    const { preFetchService } = usePreFetchApiService;
    if (preFetchService) {
        try {
            const res = await preFetchService; 
            //可能设置多个接口 所以返回的是一个数组
            return res[0];
        } catch (error) {
            // 接口请求报错 这里可以再次发送请求
        }
    } else {
        // 因为异常原因 预请求运行报错导致 方法缺失 
    }
};

```
