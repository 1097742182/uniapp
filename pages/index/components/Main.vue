<template>
	<view class="u-page">
		<cl-header :key="0" title="密码神探" :isBack="false" />
		<main-image style="width: 100%;"></main-image>

		<view class="u-demo-block">
			<view class="u-demo-block__content">
				<view class="u-page__button-item">
					<u-button @click="goPage(1)" text="开始游戏" size="normal" type="primary" />
				</view>
				<view class="u-page__button-item">
					<u-button @click="goPage(1)" text="游戏规则" size="normal" type="primary" />
				</view>
			</view>
		</view>

		<view class="footer">
			<text class="u-demo-block__title">密码神探</text>
			<text class="info">本程序仅供娱乐，请勿用于非法活动</text>
		</view>
	</view>
</template>

<script>
	import MainImage from "./MainImage.vue"

	export default {
		data() {
			return {

			}
		},
		components: {
			MainImage
		},
		methods: {
			goPage(type) {
				this.$Router.push({
					name: "gameMenu",
					params: {}
				})
			},
			getUserInfo() {
				this.$Router.push({
					name: "logo",
					params: {}
				})
			},
			onGetUserInfo(event) {
				uni.login({
					provider: 'weixin',
					success: (res) => {
						uni.getUserInfo({
							provider: 'weixin',
							success: (res) => {
								console.log(res.userInfo) // 用户信息
							}
						})
					}
				})
			},
			// 获取微信用户的基本信息
			// getUserInfo(e) {
			// 	// 判断是否获取用户信息成功
			// 	if (e.detail.errMsg === 'getUserInfo:fail auth deny') return uni.$showMsg('您取消了登录授权！')

			// 	// 获取用户信息成功， e.detail.userInfo 就是用户的基本信息
			// 	console.log(e.detail.userInfo)
			// }
		}
	}
</script>

<style lang="scss" scoped>
	.u-view {
		padding: 40px 20px 0px 20px;

		&__title {
			font-size: 14px;
			color: rgb(143, 156, 162);
			margin-bottom: 10px;
		}
	}

	.u-block {
		padding: 14px;

		&__section {
			margin-bottom: 10px;
		}

		&__title {
			margin-top: 10px;
			font-size: 15px;
			color: $u-content-color;
			margin-bottom: 10px;
		}

		&__flex {
			/* #ifndef APP-NVUE */
			display: flex;
			/* #endif */
		}
	}

	// 使用了cell组件的icon图片样式
	.u-cell-icon {
		width: 36rpx;
		height: 36rpx;
		margin-right: 8rpx;
	}

	.u-page {
		padding: 15px 15px 40px 15px;
	}

	.u-demo-block {
		flex: 1;
		margin: 20px 30px;
		margin-bottom: 23px;

		&__content {
			/* #ifndef APP-NVUE */
			display: flex;
			/* #endif */
			// flex-direction: row!important;
			// align-items: center;
			// flex-wrap: wrap;
		}

		&__title {
			display: block;
			font-size: 20px;
			color: #40485B;
			margin-bottom: 18px;
			text-align: center;
		}
	}



	.u-page {
		height: 100%;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
		flex-direction: column;

		&__button-item {
			width: 100%;
			min-width: 250px;
			margin: 0 0 15px 0;
		}
	}

	.u-demo-block__content {
		flex-direction: row;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
	}


	.footer {
		position: absolute;
		bottom: 30px;
		display: block;
		text-align: center;
		width: 100%;



		.info {
			font-size: 12px;
			color: #444444;
			text-align: center;
			display: block;
			margin-top: -10px;
		}
	}
</style>