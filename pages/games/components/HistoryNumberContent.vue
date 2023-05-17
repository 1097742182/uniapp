<template>
	<view id="HistoryNumberContent">
		<history-number-content-item v-for="item in count" :value='item' :key="item"
			class="contentItem"></history-number-content-item>
	</view>
</template>

<script>
	import HistoryNumberContentItem from "./HistoryNumberContentItem.vue"

	export default {
		data() {
			return {}
		},
		mounted() {
			console.log(this.HistoryNumberList);
		},
		props: {
			count: {
				type: Number,
				default: 10
			}
		},
		components: {
			HistoryNumberContentItem
		}
	}
</script>

<style>
	#HistoryNumberContent {
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