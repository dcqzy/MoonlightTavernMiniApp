<template>
    <view class="getherMain">
        <view class="gatherMenuBar">
            <view class="placeholderDiv"></view>
            <view class="gatherMenuBarBox" v-for="item, index in gatherMenuArray" :key="index"
                @click="clickSwitchWindow(index)">
                <text class="gatherMenuBarBoxTitle">{{ item }}</text>
                <view class="gatherMenuBarBoxSelectIcon">
                    <view class="selectIcon" v-if="clickMenu == index"></view>
                </view>
            </view>
            <view class="placeholderDiv"></view>
        </view>
        <view style="border: 0.1px solid #b3b3b3; width: 100%;"></view>
        <view style=" width: 100%; height: 239.9px;" v-if="clickMenu == 0">
            <scroll-view scroll-y style="height: 100%;">
                <view style="height: auto; width: 100%; padding: 1px 0px;"
                    v-for="(value, index) in useGatherArrayStore().quarrys" :key="index">
                    <gatherBox :value="value.getDuration()" :index="index" v-if="value.getIsShow()"
                        :clickMenu="clickMenu" />
                </view>

            </scroll-view>
        </view>
        <view style=" width: 100%; height: 239.9px;" v-if="clickMenu == 1">
            <scroll-view scroll-y style="height: 100%;">
                <view style="height: auto; width: 100%; padding: 1px 0px;"
                    v-for="(value, index) in useGatherArrayStore().meadows" :key="index">
                    <gatherBox :value="value.getDuration()" :index="index" v-if="value.getIsShow()"
                        :clickMenu="clickMenu" />
                </view>

            </scroll-view>
        </view>
        <view style=" width: 100%; height: 239.9px;" v-if="clickMenu == 2">
            <scroll-view scroll-y style="height: 100%;">
                <view style="height: auto; width: 100%; padding: 1px 0px;"
                    v-for="(value, index) in useGatherArrayStore().fishery" :key="index">
                    <gatherBox :value="value.getDuration()" :index="index" v-if="value.getIsShow()"
                        :clickMenu="clickMenu" />
                </view>

            </scroll-view>
        </view>
    </view>
</template>

<script setup lang="ts">
import type { Ref } from 'vue';
import { ref, onBeforeUnmount } from 'vue';
import { onLoad } from '@dcloudio/uni-app'
import gatherBox from './gatherBox.vue';
import type Gather from '@/common/js/dao/gatherDao';
import { useGatherArrayStore } from '@/stores/gatherArray'

// 当前的采集菜单索引值
let clickMenu: Ref<number> = ref(0);
// 当前的采集窗口索引值
let clickWindow: Ref<number> = ref(0);

let daoQiKuangWu = ref(true);

let gatherMenuArray: Ref<string[]> = ref([
    "限时矿脉",
    "限时草场",
    "鱼王窗口"
])

function xx() {

    const E_TIME = 20.57;
    const NOW_TIME = new Date().getTime(); // 获取当前时间戳
    const ET_TIME = new Date().setTime(Math.floor(NOW_TIME * E_TIME));

    // 获取当前显示时间的ET时间  LT和ET之间的倍率是20.57
    let nowTimeET = new Date(new Date().setTime(ET_TIME));
    // 获取当前ET时间的时分
    const ET_Hour: number = nowTimeET.getUTCHours();
    const ET_Minute: number = nowTimeET.getUTCMinutes();
    // const ETHH:number = 23;
    // const ETMM:number = 10;
    // console.log("矿场", ET_Hour, ET_Minute, useGatherArrayStore().quarrys)

    forGatherArray(useGatherArrayStore().quarrys, ET_Hour, ET_Minute);
}

function xx2() {

    const E_TIME = 20.57;
    const NOW_TIME = new Date().getTime(); // 获取当前时间戳
    const ET_TIME = new Date().setTime(Math.floor(NOW_TIME * E_TIME));

    // 获取当前显示时间的ET时间  LT和ET之间的倍率是20.57
    let nowTimeET = new Date(new Date().setTime(ET_TIME));
    // 获取当前ET时间的时分
    const ET_Hour: number = nowTimeET.getUTCHours();
    const ET_Minute: number = nowTimeET.getUTCMinutes();
    // const ETHH:number = 23;
    // const ETMM:number = 10;
    // console.log("草场", ET_Hour, ET_Minute, useGatherArrayStore().meadows)

    forGatherArray(useGatherArrayStore().meadows, ET_Hour, ET_Minute)
}

function xx3() {

    const E_TIME = 20.57;
    const NOW_TIME = new Date().getTime(); // 获取当前时间戳
    const ET_TIME = new Date().setTime(Math.floor(NOW_TIME * E_TIME));

    // 获取当前显示时间的ET时间  LT和ET之间的倍率是20.57
    let nowTimeET = new Date(new Date().setTime(ET_TIME));
    // 获取当前ET时间的时分
    const ET_Hour: number = nowTimeET.getUTCHours();
    const ET_Minute: number = nowTimeET.getUTCMinutes();
    // const ETHH:number = 23;
    // const ETMM:number = 10;
    // console.log("鱼王", ET_Hour, ET_Minute, useGatherArrayStore().fishery)

    forGatherArray(useGatherArrayStore().fishery, ET_Hour, ET_Minute)
}

function forGatherArray(data: Gather[], hour: number, minute: number) {
    for (let i = 0; i < data.length; i++) {
        // console.log("进入数组循环")
        // 获取当前索引的采集点里的开始时间组
        let startTimeArray = data[i].getStartTime();
        // 获取当前索引的采集点里的结束时间组
        let endTimeArray = data[i].getEndTime();
        // 通过当前采集点内的方法获取采集点的持续时间
        let defaultDuration = data[i].getDefaultDuration();
        // 循环开始时间 判断当前ET小时是否等于或大于采集点开始时间的小时
        for (let j = 0; j < startTimeArray.length; j++) {
            // console.log("进入数组循环2")
            // console.log(startTimeArray[j])
            // console.log(ETHH > startTimeArray[j])
            // 如果等于 那么判断分钟是否为零
            if (hour == (startTimeArray[j] == 24 ? 0 : startTimeArray[j])) {
                // console.log("开始时间",startTimeArray[j])
                // 如果不为零 那么持续时间减去当前分钟的毫秒数 获得真实的持续时间
                if (minute > 0) {
                    // console.log("判断分钟")
                    data[i].setDuration(defaultDuration - (minute * 60)); // 使用默认持续时间 - 已过去的时间 = 当前的持续时间 单位毫秒
                    data[i].setIsShow(true); // 将数据展示
                    break;
                }
            }
            if (hour > (startTimeArray[j] == 0 ? 24 : startTimeArray[j])) { // 如果当前ET小时大于采集点开始时间的小时 进行结束时间判断
                // 如果当前时间小于结束时间 那么进行分钟判断
                if (hour < (endTimeArray[j] == 0 ? 24 : endTimeArray[j])) {
                    // console.log("开始时间2",startTimeArray[j],endTimeArray[j])
                    // 和上面一样
                    if (minute > 0) {
                        // console.log("判断分钟2") // 7200 - ((endtime - ethh)*60*60) -(etmm * 60)
                        let endTime = endTimeArray[j] - hour;
                        // console.log("endTime",endTime)
                        data[i].setDuration(defaultDuration - ((endTime * 60 * 60) + (minute * 60))); // 使用默认持续时间 - 已过去的时间 = 当前的持续时间 单位毫秒
                        data[i].setIsShow(true); // 将数据展示
                        break;
                    }
                }
            }
        }
        for (let j = 0; j < endTimeArray.length; j++) {
            if (hour == endTimeArray[j]) {
                data[i].setIsShow(false);
            }
        }
    }
}


var timerQ: number = 0
var timerM: number = 0
var timerF: number = 0
onLoad(() => {
    timerQ = setInterval(xx, 1000);
    timerM = setInterval(xx2, 1000);
    timerF = setInterval(xx3, 1000);
})

onBeforeUnmount(() => {
    console.log("运行了onBeforeUnmount")
    clearInterval(timerQ)
})




// 点击事件 切换窗口 根据点击的值 切换对应窗口
function clickSwitchWindow(index: number) {
    if (clickMenu.value == index) {
        return;
    }
    // 切换菜单的索引
    clickMenu.value = index;
    // 切换窗口的索引
    clickWindow.value = index;
}


</script>

<style>
.getherMain {
    height: 300px;
    box-shadow: 0 -2px 3px #04000080;
}

.gatherMenuBar {
    height: 60px;
    /* background-color: #FFFFFF; */
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

}

.placeholderDiv {
    height: 100%;
    width: 5%;
}

.gatherMenuBarBox {
    height: 100%;
    width: 30%;
    align-self: center;
    text-align: center;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap
}

.gatherMenuBarBoxTitle {
    width: 100%;
    align-self: flex-end;
    font-size: small;
}

.gatherMenuBarBoxSelectIcon {
    width: 60%;
    margin: 0 20%;
    height: 5px;
    align-self: flex-end;
}

.selectIcon {
    background-color: #476FB5;
    height: 100%;
}
</style>