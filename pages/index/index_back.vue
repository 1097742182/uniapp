<template>
	<view class="content">
		<cl-header title="正常导航栏" />

		<u-tabs :list="tabList" @click="tabClick" :activeStyle="{
			color: '#3c9cff',
		}" />

		<!-- uview 示例 -->
		<uview-demo-component v-show="tabIndex == 0" />

		<!-- iconfont 示例 -->
		<IconFontComponent v-show="tabIndex == 1" />

		<!-- UniSimpleRouter 示例 -->
		<uni-simple-router-component v-show="tabIndex == 2" />

		<!-- Request 示例 -->
		<request-component v-show="tabIndex == 3" />

		<!-- Utils 示例 -->
		<utils-component v-show="tabIndex == 4" />

		<!-- Filters 示例 -->
		<filters-component v-show="tabIndex == 5" />

		<!-- easycom 示例 -->
		<easycom-component v-show="tabIndex == 6" />

		<!-- vuex 示例 -->
		<vuex-component v-show="tabIndex == 7" />

		<!-- extend 示例 -->
		<extend-component v-show="tabIndex == 8" />

	</view>
</template>

<script>
	import index from "./index.vue"
	import UviewDemoComponent from './components/UviewDemoComponent.vue';
	import IconFontComponent from './components/IconFontComponent.vue';
	import UniSimpleRouterComponent from './components/UniSimpleRouterComponent.vue';
	import RequestComponent from './components/RequestComponent.vue';
	import UtilsComponent from './components/UtilsComponent.vue';
	import FiltersComponent from './components/FiltersComponent.vue';
	import EasycomComponent from './components/EasycomComponent.vue';
	import VuexComponent from './components/VuexComponent.vue';
	import ExtendComponent from './components/ExtendComponent.vue';


	export default {
		components: {
			index,
			VuexComponent,
			UtilsComponent,
			ExtendComponent,
			RequestComponent,
			FiltersComponent,
			EasycomComponent,
			IconFontComponent,
			UviewDemoComponent,
			UniSimpleRouterComponent
		},
		data() {
			return {
				tabIndex: 0,
				tabList: [{
					name: 'Uview组件',
				}, {
					name: 'IconFont图标',
				}, {
					name: 'UniSimpleRouter路由'
				}, {
					name: 'Request请求'
				}, {
					name: 'Utils工具'
				}, {
					name: 'Filters全局过滤'
				}, {
					name: 'EasyCom组件'
				}, {
					name: 'Vuex使用'
				}, {
					name: 'extendJS扩展'
				}, {
					name: '自定义导航栏'
				}, {
					name: 'zPaing列表展示'
				}]
			};
		},
		methods: {
			tabClick(e) {
				console.log('e.index::', e.index);

				if (e.index == 9) {
					this.$Router.push({
						name: 'NormalHeader',
						params: {}
					});
					return;
				} else if (e.index == 10) {
					this.$Router.push({
						name: 'zPagingList',
						params: {}
					});
					return;
				}
				this.tabIndex = e.index;
			}
		}
	};
</script>