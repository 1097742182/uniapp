<template>
	<view>
		
		<cl-header :key="0" title="正常导航栏" v-if="type == 0" />
		
		<cl-header :key="1" v-if="type == 1">
			<view style="display: flex;align-items: center;">
				<view style="width: 30rpx;height: 30rpx;background-color: #000;" />
				bbb
				<view style="width: 30rpx;height: 30rpx;background-color: #000;" />
			</view>
		</cl-header>
		
		
		<cl-header :key="2" title="透明导航栏" v-if="type == 2" :transparent="true" :isOccupy="true" :scrollTop="scrollTop" />
		
		<cl-header :key="3" title="透明导航栏" v-if="type == 3" :transparent="true" :isOccupy="false" :scrollTop="scrollTop" />
		
		<u-button @click="type = 0">正常导航栏</u-button>
		<u-button @click="type = 1">导航栏内容自定义</u-button>
		<u-button @click="type = 2">透明导航栏(占位)</u-button>
		<u-button @click="type = 3">透明导航栏(不占位)</u-button>
		
		<view style="height: 300vh;"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type: 0,
				scrollTop: 0
			}
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		methods: {
			
		}
	}
</script>

<style scoped>
page{
	background:#fffbe6
}
</style>
