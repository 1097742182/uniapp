<template>
	<view class="u-page">
		<cl-header :key="0" title="游戏目录"  />
		
		<view class="u-demo-block">
			<text class="u-demo-block__title">游戏目录</text>
			<view class="u-demo-block__content">
			<view class="u-page__button-item">
				<u-button @click="gameBegin(1)" text="第一关" size="normal" type="primary" />
			</view>
			<view class="u-page__button-item">
				<u-button @click="gameBegin(1)" text="第二关" size="normal" type="primary" />
			</view>
			<view class="u-page__button-item">
				<u-button @click="gameBegin(1)" text="第三关" size="normal" type="primary" />
			</view>
			<view class="u-page__button-item">
				<u-button @click="gameBegin(1)" text="第四关" size="normal" type="primary" />
			</view>
			</view>
		</view>


	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			backBtnClick() {
				uni.navigateBack()
			},
			gameBegin(type) {
				this.$Router.push({
					name: "gameBegin",
					params: {}
				})
			},
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
			margin-top: 50%;
			display: block;
			font-size: 20px;
			color: #40485B;
			margin-bottom: 18px;
			text-align: center;
		}
	}



	.u-page {
		&__button-item {
			width: 100%;
			margin: 0 15px 15px 0;
		}
	}

	.u-demo-block__content {
		flex-direction: row;
		flex-wrap: wrap;
		align-items: center;
	}

	.prompt {
		text-align: left;
		
	}
</style>