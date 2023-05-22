<template>
	<view class="HistoryNumberContentItem">
		<view class="numberList">
			<view class="numberItem" v-for="(item, index) in numberList" :key="index">
				<text>{{ item }}</text>
			</view>
		</view>

		<view class="numberStatus">
			<text class="statusNumber">{{ numberStatus.right }}</text>
			<text style="color: green;">V</text>
			<text class="statusNumber">{{ numberStatus.nearlyRight }}</text>
			<text style="color: blue;">O</text>
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
		watch: {
			HistoryNumberList() {
				this._initNumberList()
			}
		},
		mounted() {
			this._initNumberList()
		},
		methods: {
			_initNumberList() {
				this.numberDetail = this.HistoryNumberList[this.value]

				// 获取历史记录，如果找到对应数据，则放入对应数据
				if (this.numberDetail) {
					this.numberList = this.numberDetail["numberList"]
					this.numberStatus = this.numberDetail["status"]
				} else {
					// 如果没有找到对应数据，则重置数据

					this.numberList = this.NumberList.map(item => "")
					this.numberStatus = {
						right: "",
						nearlyRight: ""
					}
				}
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