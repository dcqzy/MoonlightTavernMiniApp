export default {
	props: {
		// 标题
		title: {
			type: String,
			required: true
		},
		// 标题样式
		titleStyle: {
			type: String,
		},
		// 总数,计算的分母
		total: {
			type: Number,
			required: true
		},
		// 第一个值
		firstValue: {
			type: Number,
			required: true
		},
		// 第二个值
		secondValue: {
			type: Number
		},
		// 进度条背景颜色
		backColor: {
			type: String,
			default: '#f2f2f2'
		},
		// 进度条高度
		barHeight: {
			type: String
		},
		// 进度条圆角
		barRadius: {
			type: String
		},
		// 进度条颜色
		contentColor: {
			type: String,
			default: '#4cd964'
		},
		// 进度条2颜色
		contentColor2: {
			type: String,
			default: '#f0ad4e'
		},
		// 进度条最小长度
		minWidth: {
			type: String
		},
		// 文字大小
		textSize: {
			type: String,
			default: '16px'
		},
		// 文字颜色
		textColor: {
			type: String,
			default: '#333333'
		},
		// 文字内显、外显、不显，可选值：inside/outside/none
		textPosition: {
			type: String,
			default: 'inside'
		},
		// 展示百分比或值
		percentum: {
			type: Boolean,
			default: false
		},
		// 百分比精确到小数点后几位
		precision: {
			type: [String, Number],
			default: 2
		},
		// 是否选择动画加载
		animation: {
			type: Boolean,
			default: false
		}
	}
}