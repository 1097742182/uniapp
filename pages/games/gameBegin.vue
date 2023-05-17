<template>
	<view id="app" style="margin-top: 20px;">
		<cl-header title="正常导航栏" />

		<h1>猜数字游戏</h1>
		<view>
			<form @submit.prevent="checkAnswer">
				<label>请输入四个数字，用空格分隔：</label>
				<!-- <input type="text" v-model="inputNumbers" /> -->
				<number-content></number-content>
				<history-number-content></history-number-content>
				<view class="">
					<button type="primary" style="width: 200px; background-color: #3c8adf;" @click="checkAnswer">提交</button>
				</view>
			</form>
		</view>
		<view v-if="result !== ''">
			<h2>本次结果：</h2>
			<p>{{ result }}</p>
		</view>
		<view v-if="gameOver">
			<h2>游戏结束！</h2>
			<p>{{ gameResult }}</p>
		</view>
	</view>
</template>

<script>
	import NumberContent from "./components/NumberContent.vue"
	import HistoryNumberContent from "./components/HistoryNumberContent.vue"

	export default {
		data() {
			return {
				// 正确的数字序列
				secretNumbers: [1, 2, 3, 4],
				// 用户输入的数字序列
				inputNumbers: '',
				// 本次游戏结果
				result: '',
				// 是否游戏结束
				gameOver: false,
				// 游戏结果
				gameResult: '',
				// 已猜测次数
				count: 0,
				// 最大猜测次数
				maxCount: 10
			}
		},

		components: {
			NumberContent,
			HistoryNumberContent
		},

		methods: {
			// 检查用户输入数字并显示结果
			checkAnswer() {
				this.inputNumbers = this.inputNumbers.trim()
				// 将用户输入的数字序列转换为数字数组
				const inputArray = this.inputNumbers.split(' ').map(num => Number(num));
				// 检查输入数字的长度和合法性
				if (inputArray.length !== 4 || inputArray.some(num => isNaN(num))) {
					alert('请输入合法的四个数字！');
					return;
				}
				// 计算本次结果（1A和1B的数量）
				let A = 0,
					B = 0;
				for (let i = 0; i < 4; i++) {
					if (inputArray[i] === this.secretNumbers[i]) A++; // 数字和位置都正确
					else if (this.secretNumbers.includes(inputArray[i])) B++; // 数字正确但位置不正确
				}
				// 更新结果和猜测次数
				this.result = A === 4 ? '恭喜你猜对了！' : `${A}A${B}B`;
				this.count++;
				// 如果猜测次数已满10次或者已猜对，则游戏结束
				if (A === 4 || this.count === this.maxCount) {
					this.gameOver = true;
					this.gameResult = A === 4 ? '恭喜你猜对了！' :
						`很遗憾，你没有在规定的${this.maxCount}次内猜中答案。正确答案是${this.secretNumbers.join('')}`;
				}
				// 清空输入数字
				this.inputNumbers = '';
			}
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>