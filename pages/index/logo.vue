<template>
	<view>
		<cl-header :key="0" title="密码神探" :isBack="false" />
		<view class="avatarUrl">
			<button type="primary" class="btn-login" open-type="getUserInfo" @getuserinfo="getUserInfo">
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
			getUserInfo(e) {
				// 判断是否获取用户信息成功
				if (e.detail.errMsg === 'getUserInfo:fail auth deny') return uni.$showMsg('您取消了登录授权！')

				// 获取用户信息成功， e.detail.userInfo 就是用户的基本信息
				console.log(e.detail.userInfo)
				this.avatarUrl = e.detail.userInfo.avatarUrl
				this.nickName = e.detail.userInfo.nickName
				
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