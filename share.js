export default {
  data() {
    return {
      //设置默认的分享参数
      share: {
        title: "密码侦探",
        path: "/pages/index/index",
        imageUrl: "https://img2.baidu.com/it/u=1724008973,2601519575&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=584",
        desc: "",
        content: "",
      },
    };
  },
  onShareAppMessage(res) {
    return {
      title: this.share.title,
      path: this.share.path,
      imageUrl: this.share.imageUrl,
      desc: this.share.desc,
      content: this.share.content,
      success(res) {
        uni.showToast({ title: "分享成功" });
      },
      fail(res) {
        uni.showToast({ title: "分享失败", icon: "none" });
      },
    };
  },

  //分享到朋友圈
  onShareTimeline(res) {
    return {
      title: "密码侦探 猜数字",
      type: 0,
      summary: "",
    };
  },
};
