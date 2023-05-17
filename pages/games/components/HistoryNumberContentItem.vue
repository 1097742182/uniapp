<template>
	<view id="HistoryNumberContentItem">

	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},
		props: {
			value: {
				type: Number
			}
		},
		mounted() {
			console.log(this.HistoryNumberList[this.value - 1]);
		}
	}
</script>

<style>
	#HistoryNumberContentItem {
		height: 50px;
		border: 1px solid blue;
		border-radius: 5px;
		margin-bottom: 10px;
	}
</style>