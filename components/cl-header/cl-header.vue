<template>
	<view>
		<view class="header" :style="{
				'padding-top': `${statusBarHeight}px;`,
				'background-color': realBackgroundColor,
				color: realTextColor
			}">
			<view class="header-content">
				<!-- <image  src="./back-btn.png" mode="widthFix" /> -->
				<!-- 图标库使用方式 （可以根据color来切换） -->
				<!-- <dbb-icon style="" type="iconbianzubeifen" size="32" :color="realTextColor" /> -->
				<view class="back-btn">
					<u-icon v-if="isBack" size="20" @click="back" name="arrow-left"></u-icon>
				</view>
				<slot v-if="!title"></slot>
				<text v-else class="nav-text">{{ title }}</text>
			</view>
		</view>

		<view v-if="isOccupy" :style="{
			height: `calc(${statusBarHeight}px + 88rpx)`
		}"></view>
	</view>
</template>

<script>
	// 使用自定义导航栏需要将页面 style 中增加 "navigationStyle": "custom"
	// 参考示例项目
	export default {
		props: {
			// 背景色
			backgroundColor: {
				type: String,
				default: '#ffffff'
			},
			// 页面传递过来距离顶部的高度
			scrollTop: {
				type: Number,
				default: 0
			},
			// 默认字体颜色
			defaultTextColor: {
				type: String,
				default: '#000000'
			},
			// 是否透明
			transparent: {
				type: Boolean,
				default: false
			},
			// 透明时文本颜色
			transparentTextColor: {
				type: String,
				default: '#ffffff'
			},
			// 透明阈值到指定高度取消透明
			transparentMaxHeight: {
				type: Number,
				default: 88
			},
			// 是否留出导航栏高度
			isOccupy: {
				type: Boolean,
				default: true
			},
			//  导航标题
			title: {
				type: String,
				default: ''
			},
			// 是否需要返回按钮
			isBack: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				statusBarHeight: uni.getSystemInfoSync().statusBarHeight,
				isTransparent: true
			};
		},
		computed: {
			realBackgroundColor() {
				if (this.transparent) {
					let {
						r,
						g,
						b
					} = this.backgrounRGBObject;
					return `rgba(${r},${g},${b},${this.transparentAlpha})`;
				}
				return this.backgroundColor;
			},
			realTextColor() {
				if (this.transparent && this.transparentAlpha != 1) {
					return this.transparentTextColor;
				}
				return this.defaultTextColor;
			},
			transparentAlpha() {
				let alpha = Math.min(this.scrollTop / this.transparentMaxHeight, 1);

				if (alpha == 1 && this.isTransparent) {
					this.isTransparent = false;
					this.$emit('changeTransparent', false);
				} else if (alpha < 1 && !this.isTransparent) {
					this.isTransparent = true;
					this.$emit('changeTransparent', true);
				}
				return alpha;
			},
			backgrounRGBObject() {
				return this.Hex2RgbObject(this.backgroundColor);
			}
		},
		methods: {
			back() {
				let pages = getCurrentPages(); //获取当前页面信息栈
				let prevPage = pages[pages.length - 2]; //获取上一个页面信息栈
				
				try {
					if (prevPage) {
						uni.navigateBack({
							delta: 1
						});
					} else {
						uni.switchTab({
							url: '/pages/tabs/home/index'
						});
					}
				} catch (err) {
					uni.switchTab({
						url: '/pages/tabs/home/index'
					});
				}
			},
			Hex2Dec(hex) {
				return parseInt(hex, 16).toString();
			},
			Hex2RgbObject(hex) {
				hex = hex.substring(1);
				if (hex.length === 3) {
					hex += hex;
				}
				return {
					r: this.Hex2Dec(hex.substring(0, 2)),
					g: this.Hex2Dec(hex.substring(2, 4)),
					b: this.Hex2Dec(hex.substring(4))
				};
			}
		}
	};
</script>

<style style lang="scss">
	.header {
		position: fixed;
		top: 0;
		left: 0;
		height: 88rpx;
		width: 100%;
		display: flex;
		align-items: center;
		box-sizing: content-box;
		z-index: 999;
		transition: background-color, color 0.1s linear;
	}

	.header-content {
		position: relative;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0 30rpx;
	}

	.nav-text {
		font-size: 34rpx;
		// margin-left: 20rpx;
	}

	.back-btn {
		position: absolute;
		left: 0;
		left: 30rpx;
		width: 20rpx;
		height: 20px;
	}
</style>