<template>
	<view>
		<view class="avatarUrl">
			<button type="balanced" open-type="chooseAvatar" @chooseavatar="onChooseavatar">
				<image :src="avatarUrl" class="refreshIcon" style="margin-top: 30rpx; width:500rpx;height:500rpx;"></image>
			</button>
		</view>
		<view class="nickname" style="display: flex;flex-direction: row;margin-top: 20rpx;">
			<text class="weui-text">昵称：</text>
			<input type="nickname" class="weui-input" :value="nickName" @blur="bindblur" placeholder="请输入昵称"
				@input="bindinput" />
		</view>

		<button type="primary" @click="save" style="width:710rpx;margin-left: 20rpx;margin-top: 20rpx;">
			保存
		</button>

		<button type="primary" open-type="getUserInfo" @getuserinfo="onGetUserInfo">获取用户信息</button>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				avatarUrl: 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0',
				nickName: ''
			}
		},
		methods: {
			//昵称输入框blur
			bindblur(e) {
				console.log('nickName', e)
				this.nickName = e.detail.value;
			},
			// 监听用户信息授权事件
			onGetUserInfo(e) {
				if (e.detail.errMsg === 'getUserInfo:ok') {
					// 获取用户信息成功，可以在这里进行后续操作
					console.log(e.detail.userInfo);
					wx.showToast({
						title: '已授权',
						icon: 'none'
					})
				} else {
					// 用户拒绝授权，需要做出相应的提示
					wx.showToast({
						title: '未授权',
						icon: 'none'
					})
				}
			},

			//昵称输入框input
			bindinput(e) {
				console.log('nickName', e)
				this.nickName = e.detail.value;
			},
			//选择头像
			onChooseavatar(e) {
				console.log(e.detail);
				this.avatarUrl = e.detail.avatarUrl;
			},
			//保存头像和昵称
			save() {
				//判断输入数据
				if (this.nickName.length < 2) {
					uni.showToast({
						title: "昵称最少两个字",
						icon: "error",
					})
					return false;
				}

				if (this.avatarUrl ==
					'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
				) {
					uni.showToast({
						title: "请选择头像",
						icon: "error",
					})
					return false;
				}

				//保存到线上
				uni.showLoading({
					title: '加载中'
				});
				uni.uploadFile({
					url: 'http://api.lhdtest.com/auth/save',
					filePath: this.avatarUrl,
					name: 'file',
					formData: {
						nickname: this.nickName,
					},
					header: {},
					success: res => {
						// 注意：这里返回的res.data类型是string  需要自己去转换为JSON
						let data = JSON.parse(res.data);
						if (data.code == 0) {
							//this.avatarUrl = data.data.url;
							uni.showToast({
								title: "保存成功！",
							})
						}
					},
					fail: (error) => {
						uni.showToast({
							title: error,
							duration: 2000
						});
					},
					complete: () => {
						uni.hideLoading();
					}
				});
			},
		}
	}
</script>

<style>
	.weui-input {
		border: 1px solid gray;
		border-radius: 10rpx;
		height: 66rpx;
		font-size: 50rpx;
		width: 540rpx;
		margin-left: 20rpx;
	}

	.weui-text {
		height: 66rpx;
		font-size: 40rpx;
		line-height: 66rpx;
		width: 140rpx;
		margin-left: 20rpx;
	}
</style>