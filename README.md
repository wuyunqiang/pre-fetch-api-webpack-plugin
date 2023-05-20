# 文档:


目录说明：<br>
babel-plugin：babel相关插件<br>
build：编译源码ES6->ES5<br>
script: 这里的文件会被自动收集 插入到html的源代码集合 <br>
src: webpack插件先关逻辑<br>
test: 做一些函数测试<br>



使用方式：<br>
PreApiServicePlugin预请求插件
应用场景：
可以应用在首屏接口上 和js并行发送请求 减少网络耗时 提升fmp
实现原理
插件会在html的head里面插入一段 code 从 query 上面获取参数 提前进行请求接口，插件会在 window 上挂载 usePreFetchApiService 方法，业务方可以使用此方法来获取结果数据。
 
功能列表
1. 可以配置一个页面 并行请求多个接口
2. 可以配置多个页面 请求一个接口
3. 可以配置多个页面请求多个接口
4. 多个页面数据通过hash||path标识 防止数据互串
5. 数据获取 支持静态参数，query参数，cookie参数






