<template>
    <view class="fflogSearch">
        
        <input class="searchInput" 
        type="text" 
        placeholder="FF LOGS 请输入ID"
        placeholder-class="inputText"
        confirm-type="search" 
        :value="inputValue"
				@input="searchInputEvent" 
				@confirm="searchEnterEvent"/>
        <view style="height: auto; width: 30px; text-align: center; margin-right: 10px; margin-left: 5px;">
            <uni-icons type="clear" size="24" v-if="showClearIcon" @click="clearIcon"></uni-icons>
        </view>        
        
        <picker mode="multiSelector" :range="multiArray" :value="multiIndex" @columnchange="bindMultiPickerColumnChange" 
        style="height: auto; 
        width: auto; background-color: #476FB5; 
        border-radius: 10px; 
        margin: 5px; 
        margin-right: 10px;
        margin-left: auto; 
        padding: 8px; 
        text-align: end; 
        font-size: clamp(0.625rem, -0.226rem + 4.26vw, 0.875rem); 
        white-space: nowrap;
        color: #ffffff;">
            <text>{{ multiArray[1][multiIndex[1]] }}</text>
        </picker>
    </view>
</template>

<script setup lang="ts">
    import { ref , getCurrentInstance} from 'vue'

    let inputValue = ref("");

    let showClearIcon = ref(false);

    let multiArray = ref([
        ["陆行鸟","莫古力",'猫小胖','豆豆柴','Elemental','Gaia','Mana','Meteor'],
        ['红玉海','神意之地','拉诺西亚','幻影群岛','萌芽池','宇宙和音','沃仙曦染','晨曦王座','Pandaemoniume'],
    ])
    let multiIndex = ref([0,0]);
    const instance = getCurrentInstance();

    function bindMultiPickerColumnChange(e:any) {
            console.log(e.detail)
				console.log('修改的列为：' + e.detail.column + '，值为：' + e.detail.value)
				multiIndex.value[e.detail.column] = e.detail.value
				switch (e.detail.column) {
					case 0: //拖动第1列
						switch (multiIndex.value[0]) {
							case 0:
								multiArray.value[1] = ['红玉海','神意之地','拉诺西亚','幻影群岛','萌芽池','宇宙和音','沃仙曦染','晨曦王座']
								break
							case 1:
								multiArray.value[1] = ['白银乡','白金幻象','神拳痕','潮风亭','旅人栈桥','拂晓之间','龙巢神殿','梦羽宝境']
								break
                            case 2:
                                multiArray.value[1] = ['紫水栈桥','延夏','静语庄园','摩杜纳','海猫茶屋','柔风海湾','琥珀原']
                                break
                            case 3:
                                multiArray.value[1] = ['水晶塔','银泪湖','太阳海岸','伊修加德','红茶川']
						}
						multiIndex.value.splice(1, 1, 0)
						multiIndex.value.splice(2, 1, 0)
						break
				}
				instance?.proxy!.$forceUpdate()
			}

    function searchInputEvent(e:any) {
		// 将输入框中的数据传到inputValue变量中
		inputValue.value = e.detail.value
		if (e.detail.value.length > 0) {
			showClearIcon.value = true;
		} else {
			showClearIcon.value = false;
		}
	}
	function searchEnterEvent(e:any) {
		// 将携带跳转到指定页面
		uni.navigateTo({ url: '/pages/fflogs-page/index?msg='+e.detail.value })
		// 将输入框中的数据进行清空
		inputValue.value = '';
	}

	function clearIcon() {
		inputValue.value = '';
		showClearIcon.value = false;
	}
</script>

<style >
.fflogSearch {
    display: flex;
    align-items: center;
    height: 50px;
    width: 100%;
    background-color: #ffffff;
    box-shadow: 0 2.5px 5px #04000080;
    border-radius: 10px;
}
.searchInput {
    width: 50rem;
    height: 100%;
    margin-left: 15px;
    font-size: medium;
}
.inputText {
    font-size: medium;
    color: #999999;
    opacity: 0.6;
}
    
</style>