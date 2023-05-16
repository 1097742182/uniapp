<template>
	<view class="u-page">
		<u-button @click="goPage(1)" text="正常导航栏" size="normal"
			color="linear-gradient(to right, rgb(66, 83, 216), rgb(213, 51, 186))" />
			
		<u-button @click="goPage(2)" text="透明导航栏" size="normal"
			color="linear-gradient(to right, rgb(220, 194, 11), rgb(4, 151, 99))" />
			
		<view class="prompt">
			更多路由跳转参考<a href="https://hhyang.cn/v2/start/cross/codeRoute.html">官方文档</a>
		</view>


		
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},
		methods: {
			goPage(type) {
				if (type == 1) {
					this.$Router.push({
						path: '/pages/index/NormalHeader'
					});
					
				} else if (type == 2) {
					this.$Router.push({
						path: '/pages/index/TransparentHeader'
					});
				} 
			},
		}
	}
</script>

<style lang="scss" scoped>
	.u-page {
		padding: 10px 20px 0px 20px;

		.u-button+.u-button {
			margin-top: 30rpx;
		}
	}
	
	.prompt{
		background-color:rgba(242, 238, 214, 0.4);
		font-size: 28rpx;
		color: #d9063f;
		padding: 15rpx;
		margin-top: 30rpx;
		border-radius: 8rpx;
	}
</style>
