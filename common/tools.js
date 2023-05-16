const install = (Vue, vm) => {
	
	Vue.prototype.$t = {
		// 转大写
		toUpperCase(arg){
			return arg && arg.toUpperCase();
		}
	}
}

export default {
	install
}
