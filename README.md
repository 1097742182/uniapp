# 项目介绍

<a href="https://unitemplate-bd0.pages.dev/#/" target="_blank" >在线示例Demo</a>

## 主架构 uniapp

###	介绍 
-	组件使用easycom模式，有暗坑详见示例组件内代码注释。
-	目前已经更新至uview2.0，uview1.0版本可在码云里面找到

###	plugins  
-	路由 -> <a href="https://hhyang.cn/v2/" target="_blank" >uni-simple-router</a>
-	ui框架 -> <a href="http://uviewui.com/" target="_blank" >uview2.x</a>
-	api请求 -> <a href="http://uviewui.com/js/http.html" target="_blank" >uview自带api请求</a>
-	图标 -> <a href="https://www.iconfont.cn/" target="_blank" >Iconfont</a>
-	列表 -> <a href="https://ext.dcloud.net.cn/plugin?id=3935" target="_blank" >ZPaging</a>

###	项目结构

```
├─apis					// 接口管理
│  ├─modules 			// api模块化目录
│  │  └─user.js 		// 模块化示例user
│  ├─http.api.js 		// 接口定义文件
│  └─http.interceptor 	// 拦截器
├─common				// 公共文件
│  ├─config 			// 环境配置 (设置baseurl等)
│  ├─extend 			// 扩展原型方法
│  ├─filters 			// 全局过滤器
│  ├─tools 				// 全局公共方法
│  └─router 			// 路由文件
├─components			// 项目组件库
│  ├─cl-test			// easycom测试组件 (示例使用可删除)
│  ├─cl-header			// 自定义导航栏
│  └─cl-icon			// iconfont图标组件
├─store					// vuex
│  ├─$u.mixin			// store全局混入方法
│  └─index				// vuex
├─uni_modules			// 插件市场插件目录
│  ├─uview-ui			// uview-ui	
│  └─z-paging			// z-paging		
```

### 自定义环境配置

<a href="https://uniapp.dcloud.io/collocation/package" target="_blank" >官方文档示例</a>，目前已配置了H5与微信小程序，其他自行配置即可。

![avatar](https://z3.ax1x.com/2021/06/09/2671JJ.png)

![avatar](https://z3.ax1x.com/2021/06/09/267Rw8.png)

###	Iconfont 注意事项

1. 在阿里矢量图标库创建项目
2. 添加你所需要使用的图标文件
3. 下载文件到本地后替换components/cl-icon里面的文件


### Iconfont示例

iconfont库中修改示例:

![avatar](https://z3.ax1x.com/2021/07/19/WJa9w6.png)

代码示例:

```
	<cl-icon type="test" size="30" color="#000000"></cl-icon>
```

### 依赖安装

1. 安装之前请移除下载后自带的package.json 使用下面代码安装依赖即可运行
2. uview2.0可在uni_modules下右键即可更新至最新


```
npm i uni-simple-router uni-read-pages
```

###	接口问题

1. 因云函数收费所以目前接口无法正常跑通需在`common/config.js`中修改域名为您自己的服务器域名
2. 接口定义在`apis/http.api.js`, `apis/modules`为接口模块化目录
3. 使用接口示例如下，或在Demo中Request请求页签中查看

```

// 非模块化示例
this.$api.getSearch({ keyword: '111' }).then(res=>{
	// ...
})

// 模块化接口示例
this.$api.user.postGoodsInfo().then(res=>{
	// ...
})

```

### 如何移除所有示例代码？

1. 移除pageA与pageB目录
2. 移除pages/index目录下除index.vue以外其他文件
3. 移除pages.json中无用路由以及subPackages
4. 移除components/cl-test测试组件


### 仓库
<a href="https://gitee.com/ChenMuShan/uniapp-template" target="_blank" >gitee</a>

### 贡献者
<a href="https://gitee.com/zslgodex" target="_blank" >风筝</a>
<a href="https://gitee.com/ChenMuShan" target="_blank" >陈木杉</a>

<img width="300" src="https://s1.ax1x.com/2023/04/27/p9MvNn0.jpg" />
