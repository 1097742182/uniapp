<template>
	<view id="main">
		<u-button @click="goPage(1)" text="开始游戏" size="normal" type="primary"
			style="margin: 10px 0; margin-bottom: 10px;" />
		<u-button @click="goPage(1)" text="游戏规则" size="normal" type="primary" style="margin: 10px 0;" />
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


					uni.navigateTo({
						url: '/pages/games/gameMenu'
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

<style>
	#main {
		height: 100%;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
	}
</style>