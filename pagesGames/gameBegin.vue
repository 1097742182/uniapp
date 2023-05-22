<template>
	<view class="gameBegin" style="margin-top: 20px;">
		<cl-header :title="GameBeginTitle" />
		<u-toast ref="uToast"></u-toast>
		<view class="content">
			<number-content></number-content>
			<history-number-content></history-number-content>
			<button-content></button-content>
			<view class="buttonContent">
				<view class="" style="width: 200px;" v-if="!gameOver">
					<u-button type="primary" style="background-color: #3c8adf;" @click="checkAnswer">提交</u-button>
				</view>

				<view class="" style="width: 200px;" v-if="gameOver">
					<u-button type="success" @click="returnMenuBtnClick()">返回菜单</u-button>

					<u-popup :show="showPopup" :round="10" mode="center">
						<view class="popupContent">
							<text>{{ gameResult }}</text>
							<button @click="showPopup = false">关闭弹出框</button>
						</view>
					</u-popup>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	import NumberContent from "./components/NumberContent.vue"
	import HistoryNumberContent from "./components/HistoryNumberContent.vue"
	import ButtonContent from "./components/ButtonContent.vue"
	import logoVue from "../pages/index/logo.vue";

	function equals(list1, list2) {
		if (list1.length !== list2.length) {
			return false;
		}
		for (let i = 0; i < list1.length; i++) {
			if (list1[i] !== list2[i]) {
				return false;
			}
		}
		return true;
	}


	export default {
		data() {
			return {
				secretNumbers: [1, 2, 3, 4], // 正确的数字序列
				gameOver: false, // 是否游戏结束
				gameResult: "", // 是否游戏结束
				count: 0, // 已猜测次数
				showPopup: false,
				firstCheck: true // 第一次检查，不可直接成功
			}
		},

		components: {
			NumberContent,
			HistoryNumberContent,
			ButtonContent
		},
		created() {
			this._initSecretNumbers();
			this._initNumberList()
		},
		mounted() {
			uni.$u.vuex('HistoryNumberList', []);
		},

		methods: {
			_initSecretNumbers() {
				const nums = [];
				// NumberCount为store里面的数据，是可输入的总数
				while (nums.length < this.NumberCount) {
					const num = Math.floor(Math.random() * this.ButtonCount); // 值为button的值
					if (!nums.includes(num)) nums.push(num);
				}
				this.secretNumbers = nums.map(item => item.toString());
				console.log(this.secretNumbers);
			},
			// 初始化头部的数据
			_initNumberList() {
				let numberList = ["", "", "", ""]
				numberList = numberList.slice(0, this.NumberCount)
				uni.$u.vuex('NumberList', numberList);
			},
			// 检查用户输入数字并显示结果
			checkAnswer() {
				// 检查数据有效性，如果数据有空，则不可提交
				const valid = this._checkValueValid()
				if (!valid) return;

				// 第一次不可为空，所以需要检查数据
				this._checkFirstCheck()

				console.log("numberList", this.NumberList);
				console.log("secretNumbers", this.secretNumbers);
				// 计算本次结果（1A和1B的数量）
				let A = 0,
					B = 0;
				for (let i = 0; i < this.NumberCount; i++) {
					if (this.NumberList[i] == this.secretNumbers[i]) A++; // 数字和位置都正确
					else if (this.secretNumbers.includes(this.NumberList[i])) B++; // 数字正确但位置不正确
				}

				// 保存数据到history中
				const status = {
					right: A,
					nearlyRight: B
				}
				this._setHistoryNumberList(status); // 将数据保存到history中

				this.count++;
				// 如果猜测次数已满10次或者已猜对，则游戏结束
				if (A === this.NumberCount) {
					this.showPopup = true;
					this.gameOver = true;
					this.gameResult = '恭喜你猜对了！';
				} else if (this.count === this.HistoryNumberCount) {
					this.gameOver = true;
					this.showPopup = true;
					this.gameResult = `很遗憾，你没有在规定的${this.HistoryNumberCount}次内猜中答案。正确答案是${this.secretNumbers.join(' ')}`;
				}

				// 清空输入数字
				const numberBack = this.NumberList.map(item => "")
				uni.$u.vuex('NumberList', numberBack);
				uni.$u.vuex('CurrentIndex', 0)
			},

			// 检查数据有效性
			_checkValueValid() {
				// 如果数字不是4位数，则return false
				for (let item of this.NumberList) {
					if (!item) {
						uni.$showMsg('请输入完整数字！')
						return false;
					}
				}

				// 如果有相同数字，则return false
				const valid = this.__checkDuplicates(this.NumberList)
				if (!valid) {
					uni.$showMsg('请勿输入相同数字！')
					return false;
				}

				// 默认返回true
				return true
			},

			// 检查重复数字
			__checkDuplicates(arr) {
				let newArr = Array.from(new Set(arr)); // 将数组转换成 Set
				return newArr.length === arr.length; // 比较长度，判断是否存在重复元素
			},

			// 如果是第一次输入，则判断是否相等
			_checkFirstCheck() {
				if (!this.firstCheck) return; // 如果不是第一次检查，则直接返回

				if (equals(this.NumberList, this.secretNumbers)) this._initSecretNumbers();
				if (equals(this.NumberList, this.secretNumbers)) this._checkFirstCheck();

				this.firstCheck = false
			},

			// 将数据保存到history中
			_setHistoryNumberList(status) {
				const historyitem = {
					numberList: this.NumberList,
					status: status
				}

				const historyNumberList = JSON.parse(JSON.stringify(this.HistoryNumberList))
				historyNumberList.push(historyitem);

				// 如果数量不大于10，则放入进去
				if (this.HistoryNumberList.length < 10) {
					uni.$u.vuex('HistoryNumberList', historyNumberList);
					uni.$u.vuex('HistoryRefresh', !this.HistoryRefresh);
				}
			},


			returnMenuBtnClick() {
				uni.navigateBack({
					delta: 1
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 80vh;
	}

	.buttonContent {
		display: flex;
		justify-content: center;

		.checkBtnClass {
			width: 200px;

		}

		.successBtnClass {
			width: 200px;
			// background-color: #3c8adf;
		}
	}

	.popupContent {
		padding: 10px;
	}
</style>