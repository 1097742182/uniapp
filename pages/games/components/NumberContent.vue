<template>
	<view class="container">
		<number-content-item v-for="(item, index) in NumberList" :key="index" :value="item" :viewIndex='index'
			@changeIndex="changeIndex" :actived="CurrentIndex === index"></number-content-item>
	</view>
</template>

<script>
	import NumberContentItem from "./NumberContentItem.vue"

	export default {
		data() {
			return {
				// numberList: ["1", "2", "3", "4"],
				// currentIndex: 0
			}
		},
		components: {
			NumberContentItem
		},
		watch: {

		},
		methods: {
			changeIndex(i) {
				uni.$u.vuex('CurrentIndex', i);
			}
		}
	}
</script>

<style scoped>
	.container {
		display: flex;
		justify-content: space-evenly;
		padding: 10px;
		border: 1px solid #a96fa9;
		border-radius: 5px;
		margin: 10px 30px;
		background-color: #a96fa9;
	}
</style>