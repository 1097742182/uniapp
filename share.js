export default {
	data() {
		return {
			//设置默认的分享参数
			share: {
				title: '密码神探',
				path: '/pages/index/index',
				imageUrl: '',
				desc: '',
				content: ''
			}
		}
	},
	onShareAppMessage(res) {
		return {
			title: this.share.title,
			path: this.share.path,
			imageUrl: this.share.imageUrl,
			desc: this.share.desc,
			content: this.share.content,
			success(res) {
				uni.showToast({
					title: '分享成功'
				})
			},
			fail(res) {
				uni.showToast({
					title: '分享失败',
					icon: 'none'
				})
			}
		}
	},

	//分享到朋友圈
	onShareTimeline(res) {
		return {
			title: '密码神探 猜数字',
			type: 0,
			summary: "",
		}
	},
}