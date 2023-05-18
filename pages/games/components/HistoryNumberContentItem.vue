<template>
	<view class="HistoryNumberContentItem">
		<view class="numberList">
			<view class="numberItem" v-for="(item,index) in numberList" :key="index">
				<text>{{ item }}</text>
			</view>
		</view>

		<view class="numberStatus">
			<text class="statusNumber">{{ numberStatus.right }}</text>
			<text>A</text>
			<text class="statusNumber">{{ numberStatus.nearlyRight }}</text>
			<text>B</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				numberDetail: {},
				numberList: ["", "", "", ""],
				numberStatus: {
					right: "",
					nearlyRight: ""
				}
			}
		},
		props: {
			value: {
				type: Number
			}
		},
		mounted() {
			this.numberDetail = this.HistoryNumberList[this.value]

			if (this.numberDetail) {
				this.numberList = this.numberDetail["numberList"]
				this.numberStatus = this.numberDetail["status"]
			}
		}
	}
</script>

<style lang="scss" scoped>
	.HistoryNumberContentItem {
		height: 50px;
		border: 1px solid blue;
		border-radius: 5px;
		margin-bottom: 10px;
		padding: 0 6px;
		box-sizing: border-box;
		display: flex;
		justify-content: space-around;
		align-items: center;


		.numberList {
			flex: 1;
			display: flex;
			justify-content: space-between;
			height: 50px;
			line-height: 50px;
			padding-left: 4px;
			padding-right: 10px;

			.numberItem {
				text {
					border-bottom: 1px solid #333333;
					padding: 2px;
				}
			}
		}

		.numberStatus {
			border: 1px solid saddlebrown;
			padding: 4px;
			border-radius: 6px;

			.statusNumber {
				display: inline-block;
				width: 10px;
				text-align: center;
				margin: 0px 1px;
				border-bottom: 1px solid #333333;
			}
		}

	}
</style>