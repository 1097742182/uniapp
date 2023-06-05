const CONFIG = {
	// 开发环境配置
	development: {
		baseUrl: 'http://127.0.0.1:8000/',
		// baseUrl: 'https://www.xinyongji.com:9898/',
	},
	// 生产环境配置
	production: {
		baseUrl: 'https://www.xinyongji.com:9898/',
	}
}
export default CONFIG[process.env.NODE_ENV];
