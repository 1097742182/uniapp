<template>
	<view class="HistoryNumberContent">
		<history-number-content-item v-for="item in countList" :value='item' :key="item"
			class="contentItem"></history-number-content-item>
	</view>
</template>

<script>
	import HistoryNumberContentItem from "./HistoryNumberContentItem.vue"

	export default {
		data() {
			return {
				countList: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
			}
		},
		props: {
			count: {
				type: Number,
				default: 10
			}
		},
		mounted() {
			// 根据传入的count对countList进行分隔
			this.countList = this.countList.slice(0, this.count)
		},
		components: {
			HistoryNumberContentItem
		}
	}
</script>

<style>
	.HistoryNumberContent {
		/* height: 300px; */
		border: 1px solid red;
		margin: 10px;
		padding: 10px;
		border-radius: 5px;
		padding-bottom: 0;

		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}

	.contentItem {
		width: 48%;
	}
</style>