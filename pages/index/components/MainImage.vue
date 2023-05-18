<template>
	<view class="MainImage">
		<view class="imageContent">
			<image class="imageClass" alt="logo" src="https://img0.baidu.com/it/u=3425868493,3104015061&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1684515600&t=f0e004c528de99c0fbb88513d98ca8da" />
			<view class="svgClass">
				<u-icon name='camera' size="28"></u-icon>
			</view>
		</view>

		<view class="inputContent">
			<input type="text" v-model="userName">
			<text class="tips">建议修改成微信头像与微信名称</text>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss">
	.MainImage {
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		margin-bottom: 40px;
		margin-top: 20px;

		.imageContent {
			margin: 10px 20px;
			position: relative;
			display: inline-block;
			text-align: center;

			.imageClass {
				width: 120px;
				height: 120px;
				object-fit: cover;
				border-radius: 50%;
				box-shadow: 0 0 10px rgba($color: #000000, $alpha: 0.5);
			}
		}

		.svgClass {
			position: absolute;
			right: 0;
			bottom: 0;
			background-color: #ffffff;
			border-radius: 50%;
			opacity: 0.8;
		}

		.inputContent {
			padding: 10px 40px;
			width: 100%;
			text-align: center;


			input {
				height: 40px;
				text-align: center;
				box-shadow: 0 0 10px rgba($color: #000000, $alpha: 0.2);
			}

			.tips {
				font-size: 12px;
				color: #999999;
				margin: 10px 0;
				display: block;
				text-align: center;
			}
		}
	}
</style>