<template>
	<view class="naviBar" :style="{ paddingTop: systemTop + 'px' }">

		<view class="nbColumn" :style="{
			height: autoHeight + 'px',
			marginTop: autoTop + 'px',
			marginLeft: autoMarginWidth / 5 + 'px',
			marginRight: autoMarginWidth * 1.5 + 'px'
		}">

			<view style="height: auto; width: 30px; margin-right: 10px;" v-if="isRedirect == false" @click="backHome">
				<uni-icons type="back" color="#FFFFFF" size="24" />
			</view>
			<view
				style="border-radius: 40px; background-color: #ffffff; height: 100%; width: 100%; display: flex; align-items: center;">
				<input class="searchInput" type="text" :placeholder="placeholder" placeholder-class="inputText"
					confirm-type="search" v-model="inputValue" @input="searchInputEvent" @confirm="searchEnterEvent" />
				<view style="height: auto; width: 30px; text-align: center; margin-right: 10px; margin-left: 5px;">
					<uni-icons type="clear" size="24" v-if="showClearIcon" @click="clearIcon"></uni-icons>
				</view>
			</view>

		</view>

	</view>
</template>

<script setup lang="ts">

import { ref, defineProps } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import {useSearchValueStore} from '@/stores/searchValue'
import { usePriceArrayStore } from '@/stores/priceArray';
import priceDao from '@/common/js/dao/priceDao';
import { httpSelectPriceApi, requstHttpCheckPriceData } from '@/common/js/api/httpSelectPriceApi';


const systemInfoSync = uni.getSystemInfoSync();

let systemTop = systemInfoSync.safeAreaInsets?.top;

let autoHeight = uni.getMenuButtonBoundingClientRect().height;
let autoTop = (uni.getMenuButtonBoundingClientRect().top - systemTop!);
// let autoLeft = (systemInfoSync.safeArea?.width! - uni.getMenuButtonBoundingClientRect().right);
let autoMarginWidth = uni.getMenuButtonBoundingClientRect().width

let inputValue = ref(""); // 输入文字
let showClearIcon = ref(false); // 是否显示返回按键
let placeholder = ref(""); // 默认文字



const props = defineProps<{
	isRedirect: boolean
	propPlaceholder: string
	searchContent:string
}>();

onLoad(() => {

		if (props.propPlaceholder != "") {
			placeholder.value = props.propPlaceholder
			return;
		} else {
			console.log(useSearchValueStore().getCheckPriceValue())
			placeholder.value = useSearchValueStore().getCheckPriceValue().value;
		}


})

function searchInputEvent(e: any) {

	if (e.detail.value.length > 0) {
		showClearIcon.value = true;
	} else {
		showClearIcon.value = false;
	}
}
function searchEnterEvent(e: any) {
	
	switch(props.searchContent) {
		case 'checkPrice' :{
			searchCheckPriceFunc();
			break;
		}
		case 'gather' : {
			searchGather();
			break;
		}
		case 'fish' : {
			searchFish();
			break;
		}
	}

}

function searchCheckPriceFunc() {
	// 根据空格进行拆分字符串
	let values = inputValue.value.split(/\s+/);
	inputValue.value = '';
	// 判断拆分后的数组大小
	if (values.length == 2) {
		useSearchValueStore().setCheckPriceValue(values[0],values[1]);
	} else if (values.length == 1) {
		useSearchValueStore().setCheckPriceValue(values[0],"陆行鸟");
	} else {
		console.log("无效数据");
		placeholder.value = '';
	}
	// 请求数据
	requstHttpCheckPriceData();

	if (props.isRedirect == true) {
		
		// 将携带跳转到指定页面
		uni.navigateTo({ url: '/pages/checkPrice-page/index' })
		// inputValue.value = '';
		showClearIcon.value = false;
	} else {
		// 原地请求数据
		console.log("原地请求数据 占位标识");
		placeholder.value = useSearchValueStore().getCheckPriceValue().value;
		// console.log(useSearchValueStore().getCheckPriceValue())
		// 将输入框中的数据进行清空
		// inputValue.value = "";
		showClearIcon.value = false;
	}
}

function searchGather() {
	// 清除当前搜索字符
	inputValue.value = '';

	// 请求数据

	if (props.isRedirect == true) {
		// 将页面跳转
		uni.navigateTo({url:''})

		// 关闭删除按钮
		showClearIcon.value = false;

	} else {
		// 获取当前搜索的字符
		placeholder.value = "";

		showClearIcon.value = false;
	}
}

function searchFish() {
	// 清除当前搜索字符
	inputValue.value = '';

	// 请求数据

	if (props.isRedirect == true) {
		// 将页面跳转
		uni.navigateTo({url:''})

		// 关闭删除按钮
		showClearIcon.value = false;

	} else {
		// 获取当前搜索的字符
		placeholder.value = "";

		showClearIcon.value = false;
	}
}

function backHome() {
	console.log(getCurrentPages()[0])
	uni.navigateBack({
		delta: getCurrentPages()[0]
	})
}

function clearIcon() {
	inputValue.value = '';
	showClearIcon.value = false;
}

</script>

<style>
.naviBar {
	width: 100%;
	height: 50px;
	background-color: #476FB5;
	box-shadow: 0 2.5px 5px #04000080;
	/* border-radius: 0rpx 0rpx 120rpx 120rpx; */
	opacity: 1;
	position: relative;

}

.nbColumn {
	/* background-color: #ffffff; */
	/* border-radius: 40px; */
	/* position: relative; */
	display: flex;
	align-items: center;
}

.searchInput {
	margin-left: 15px;
	height: 100%;
	width: 60rem;
	font-size: small;
}

.inputText {
	font-size: small;
	color: #999999;
	opacity: 0.6;
}
</style>