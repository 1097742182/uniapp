<template>
	<view class="content">

		<u-tabs :list="tabList" @click="tabClick" :activeStyle="{
			color: '#3c9cff',
		}" />

		<Main v-show="tabIndex == 0" />

	</view>
</template>

<script>
	import Main from './components/Main.vue';

	export default {
		components: {
			Main
		},
		data() {
			return {
				tabIndex: 0,
				tabList: [{
					name: 'Uview组件',
				}]
			};
		},
		methods: {
			tabClick(e) {
				console.log('e.index::', e.index);
				this.tabIndex = e.index;
			}
		}
	};
</script>