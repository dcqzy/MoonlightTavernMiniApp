<template>
	<view class="progress-bar">
		<!-- <view class="progress-bar-title" :style="titleStyle">{{ title }}</view> -->

		<view v-if="!secondValue" class="bar">
			<view
				class="bar-single"
				:style="{
					backgroundColor: backColor,
					borderRadius: barRadius,
					height: barHeight,
					lineHeight: barHeight
				}"
			>
				<view
					class="bar-content"
					:style="{ width: firstWidth, minWidth: minWidth }"
				>
					<view
						:class="{ 'bar-content-inner': animationReal }"
						:style="{ background: contentColor }"
					>
						<text
							v-if="textPosition === 'inside'"
							class="bar-text"
							:style="{ color: textColor, fontSize: textSize }"
						>
							{{ singleText }}
						</text>
						<text v-else class="placeholder">1</text>
					</view>
				</view>
			</view>
			<view
				v-if="textPosition === 'outside'"
				class="bar-text"
				:style="{ color: textColor, fontSize: textSize }"
			>
				{{ singleText }}
			</view>
		</view>

		<view v-else class="bar">
			<view
				class="bar-single bar-double"
				:style="{
					backgroundColor: backColor,
					borderRadius: barRadius,
					height: barHeight,
					lineHeight: barHeight
				}"
			>
				<view
					class="bar-content"
					:style="{ width: firstWidth, minWidth: minWidth }"
				>
					<view
						:class="{ 'bar-content-inner': animationReal }"
						:style="{ background: contentColor }"
					>
						<text
							v-if="textPosition !== 'none'"
							class="bar-text"
							:style="{ color: textColor, fontSize: textSize }"
						>
							{{ singleText }}
						</text>
						<text v-else class="placeholder">1</text>
					</view>
				</view>
				<view class="bar-interval placeholder">1</view>
				<view
					class="bar-content"
					:style="{ width: secondWidth, minWidth: minWidth }"
				>
					<view
						:class="{ 'bar-content-inner': animationReal }"
						:style="{ background: contentColor2 }"
					>
						<text
							v-if="textPosition !== 'none'"
							class="bar-text"
							:style="{ color: textColor, fontSize: textSize }"
						>
							{{ doubleText }}
						</text>
						<text v-else class="placeholder">1</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import props from './props.js';

export default {
	mixins: [props],
	data() {
		return {
			singleText: '',
			doubleText: '',
			firstWidth: '',
			secondWidth: '',
			animationReal: false
		};
	},
	watch: {
		firstValue: {
			handler(newVal) {
				// 进度条长度改变后,重新加载动画
				if (this.animationReal) {
					this.animationReal = false;
					this.firstWidth = this.manageWidth(0, 'singleText');
					setTimeout(() => {
						this.animationReal = true;
						this.firstWidth = this.manageWidth(
							newVal,
							'singleText'
						);
					}, 100);
				} else {
					this.firstWidth = this.manageWidth(newVal, 'singleText');
				}
			},
			immediate: true
		},
		secondValue: {
			handler(newVal) {
				if (this.animationReal) {
					this.animationReal = false;
					this.secondWidth = this.manageWidth(0, 'doubleText');
					setTimeout(() => {
						this.animationReal = true;
						this.secondWidth = this.manageWidth(
							newVal,
							'doubleText'
						);
					}, 100);
				} else {
					this.secondWidth = this.manageWidth(newVal, 'doubleText');
				}
			},
			immediate: true
		},
		animation: {
			handler(newVal) {
				this.animationReal = newVal;
			},
			immediate: true
		}
	},
	methods: {
		manageWidth(target, flag) {
			let value =
				((target / this.total) * 100).toFixed(this.precision) + '%';
			this.percentum ? (this[flag] = value) : (this[flag] = target);
			// 减去间隔所占宽度
			this.secondValue ? (value = `calc(${value} - 1px)`) : '';
			return value;
		}
	}
};
</script>

<style lang="scss" scoped>
.progress-bar {
	&-title {
		font-size: 4vw;
		font-weight: bold;
		margin-bottom: 1vw;
	}

	.bar {
		/* #ifdef H5 */
		cursor: pointer;
		/* #endif */
		display: flex;
		align-items: center;
		justify-content: space-between;

		&-single {
			overflow: hidden;
			width: 100vw;
		}

		&-double {
			display: flex;
			align-items: center;
			justify-content: left;
		}

		&-content {
			&-inner {
				animation: addWidth 1.5s 0s;
			}
		}

		&-interval {
			background-color: #ffffff;
			width: 2px;
		}

		&-text {
			margin: 0 5px;
			font-size: 4vw;
		}

		.placeholder {
			color: rgba(0, 0, 0, 0);
			font-size: 4vw;
		}
	}
}

@keyframes addWidth {
	from {
		width: 0;
	}
	to {
		width: 100%;
	}
}
</style>
