<template>
	<view class="ButtonContent">
		<button type="primary" class="buttonClass" v-for="item in buttonList.slice(0, 5)" :key="item">{{ item }}</button>
		<view v-if="buttonCount">
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				buttonList: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
			}
		},
		props: {
			buttonCount: {
				type: Number,
				default: 10
			}
		},
		mounted() {
			this.buttonList = this.buttonList.slice(0, this.buttonCount)
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.ButtonContent {
		display: flex;
		justify-content: space-between;
		
		.buttonClass {
			width: 50px;
			height: 50px;
		}
	}
</style>