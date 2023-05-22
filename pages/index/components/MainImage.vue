<template>
	<view class="containar">
		<view class="avatarUrl">
			<button type="balanced" open-type="chooseAvatar" @chooseavatar="onChooseavatar">
				<image :src="avatarUrl" class="refreshIcon"></image>
			</button>
		</view>
		<view class="nickname">
			<input type="nickname" class="weui-input" :value="nickName" @blur="bindblur" @input="bindinput" />
			<text class="tips">建议修改为微信头像昵称</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				avatarUrl: 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0',
				nickName: ''
			};
		},
		onLoad(option) {},
		methods: {
			bindblur(e) {
				// 获取微信昵称
				console.log('nickName', e)
				this.nickName = e.detail.value;
			},
			bindinput(e) {
				console.log('nickName', e)
				//这里要注意如果只用blur方法的话用户在输入玩昵称后直接点击保存按钮，会出现修改不成功的情况。
				this.nickName = e.detail.value;
			},
			onChooseavatar(e) {
				this.avatarUrl = e.detail.avatarUrl;
			},
		}
	};
</script>
<style lang="scss">
	.containar {
		width: 100%;

		.avatarUrl {
			padding: 0 0 20rpx;
			background: #fff;

			button {
				background: #fff;
				line-height: 80rpx;
				height: auto;
				width: auto;
				padding: 20rpx 30rpx;
				margin: 0;
				display: flex;
				justify-content: center;
				align-items: center;


				.refreshIcon {
					width: 260rpx;
					height: 260rpx;
					border-radius: 50%;
				}

				.jt {
					width: 14rpx;
					height: 28rpx;
				}
			}
		}

		// botton 去除边框
		button::after {
			border: none;
		}

		.nickname {
			text-align: center;
			margin: 30px;
			display: flex;
			justify-content: center;
			flex-direction: column;

			.weui-input {
				width: 100%;
				padding: 10px;
				border: 1px solid #444444;
				border-radius: 10px;
			}
			
			.tips {
				color: #aaaaaa;
				margin: 20px;
			}
		}
	}
</style>