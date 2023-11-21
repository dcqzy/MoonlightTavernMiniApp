<template>
    <view style="background-color: #ffffff; height: 50px; width: 100%; display: grid; grid-template-columns: 1fr 1px 1fr;">
        <view style="display: flex; flex-direction: column; align-items: center; justify-content: center;"
            @click="switchMenu(0)">
            <text style="height: 45px; display: flex; justify-content: center; align-items: center;">采集时钟</text>
            <view style="height: 5px; width: 100%; background-color: #476FB5;" v-show="itemIndex == 0"></view>
            <view style="height: 5px; width: 100%;" v-show="itemIndex != 0"></view>
        </view>
        <view style="width: 1px; height: 40px; background-color: #E6E6E6; margin-top: 5px; opacity: 0.5;"></view>
        <view style="display: flex; flex-direction: column; align-items: center; justify-content: center;"
            @click="switchMenu(1)">
            <text style="height: 45px; display: flex; justify-content: center; align-items: center;">我的收藏</text>
            <view style="height: 5px; width: 100%; background-color: #476FB5;" v-show="itemIndex == 1"></view>
            <view style="height: 5px; width: 100%;" v-show="itemIndex != 1"></view>
        </view>
    </view>
    <view style="overflow: hidden; background-color: #ffffff;" :style="{ height: autoHeight + 'px' }" v-show="itemIndex == 0">
        <view style="height: 30px; display: flex; flex-direction: row-reverse; background-color: #ffffff;">
            <view
                style="height: 25px; width: 100px; margin-right: 10px; margin-top: 2.5px; margin-bottom: 2.5px; border-radius: 10px; background-color: #E6E6E6;">
                <picker mode="selector" :range="versionArr" :value="0" @change="selectVersion"
                    style="height: 100%; width: 100px; display: flex; justify-content: center; align-items: center; color: #999999; font-size: 12px;">
                    {{ versionValue }}
                </picker>
            </view>
            <view
                style="display: flex; justify-content: center; align-items: center; margin-right: 10px; font-size: 12px; color: #999999;">
                资料片选择</view>
        </view>
        <!-- <scroll-view class="main" scroll-y :style="{ height: autoHeight - 30 + 'px' }"
            v-if="useGatherArrayStore().getShowIndex() == 0">
            <view v-for="(item, index) in testArrTrue" :key="index" style="padding: 5px 10px;">
                <gather-tabbar-main-box :value="item.getDuration()" :data="item" />
            </view>
            <view v-for="(item, index) in testArrFalse" :key="index" style="padding: 5px 10px;">
                <gather-tabbar-main-box :value="item.getDuration()" :data="item" />
            </view>
        </scroll-view> -->
        <gather-tabbar-main-scroll-view :version="2" :height="autoHeight - 30"
            v-if="useGatherArrayStore().getShowIndex() == 0" />
        <scroll-view class="main" scroll-y :style="{ height: autoHeight + 'px' }"
            v-if="useGatherArrayStore().getShowIndex() == 1">
            <!-- <view v-for="(item, index) in testArr" :key="index" style="padding: 5px 10px;">
            <gather-tabbar-main-box :data="item" />
        </view> -->
            3.0
        </scroll-view>
        <scroll-view class="main" scroll-y :style="{ height: autoHeight + 'px' }"
            v-if="useGatherArrayStore().getShowIndex() == 2">
            <!-- <view v-for="(item, index) in testArr" :key="index" style="padding: 5px 10px;">
            <gather-tabbar-main-box :data="item" />
        </view> -->
            4.0
        </scroll-view>
        <scroll-view class="main" scroll-y :style="{ height: autoHeight + 'px' }"
            v-if="useGatherArrayStore().getShowIndex() == 3">
            <!-- <view v-for="(item, index) in testArr" :key="index" style="padding: 5px 10px;">
            <gather-tabbar-main-box :data="item" />
        </view> -->
            5.0
        </scroll-view>
        <scroll-view class="main" scroll-y :style="{ height: autoHeight + 'px' }"
            v-if="useGatherArrayStore().getShowIndex() == 4">
            <!-- <view v-for="(item, index) in testArr" :key="index" style="padding: 5px 10px;">
            <gather-tabbar-main-box :data="item" />
        </view> -->
            6.0
        </scroll-view>
    </view>
    <view style="overflow: hidden; background-color: #ffffff;" :style="{ height: autoHeight + 'px' }" v-show="itemIndex == 1">
        <gather-tabbar-main-scroll-view :version="1" :height="autoHeight - 30"
            v-if="useGatherArrayStore().getShowIndex() == 0" />
    </view>
</template>

<script setup lang="ts">
import { ref, onBeforeUnmount } from 'vue'
import { onLoad } from '@dcloudio/uni-app';
import type { Ref } from 'vue';
import gatherDao from '@/common/js/dao/gatherDao';
import { jobConstant } from '@/common/js/constant/jobConstant';
import { useGatherArrayStore } from '@/stores/gatherArray';
import { useLocalTimeStore } from '@/stores/localTime';

const systemInfo = uni.getSystemInfoSync();
const autoHeight = ref(systemInfo.safeArea?.height! - 50 - 50 - 50)

const localTimeStore = useLocalTimeStore();
const gatherArrayStore = useGatherArrayStore();

const testArr: Ref<gatherDao[]> = ref([
    //new gatherDao(1001, ["第四期重建用有生命活水", "第四期重建用有生命活水", "第四期重建用有生命活水", "第四期重建用有生命活水"], jobConstant().Miner, 100, [10, 22], [12, 0], "阿拉芭提雅云海", new Map<string, number>([['x', 33], ['y', 24]]), false, '/static/test-map.png',2),
    new gatherDao(1002, ["第四期重建用有生命活水", "第四期重建用有生命活水", "第四期重建用有生命活水"], jobConstant().Botanist, 100, [12, 0], [14, 2], "阿拉芭提雅云海a", new Map<string, number>([['x', 40], ['y', 16]]), false, '/static/test-map.png', 2),
    //new gatherDao(1003,["第四期重建用有生命活水", "第四期重建用有生命活水"], jobConstant().Botanist, 80, [8, 20], [10, 22], "阿拉芭提雅云海b", new Map<string, number>([['x', 102], ['y', 105]]), false, '/static/test-map.png',2),
    new gatherDao(1004, ["第四期重建用有生命活水"], jobConstant().Miner, 80, [2, 14], [4, 16], "阿拉芭提雅云海c", new Map<string, number>([['x', 70], ['y', 80]]), false, '/static/test-map.png', 2),
    //new gatherDao(1005,["第四期重建用有生命活水"], jobConstant().Miner, 80, [4, 16], [6, 18], "阿拉芭提雅云海d", new Map<string, number>([['x', 70], ['y', 80]]), false, '/static/test-map.png',2),
    //new gatherDao(1006,["第四期重建用有生命活水"], jobConstant().Miner, 80, [6, 18], [8, 20], "阿拉芭提雅云海e", new Map<string, number>([['x', 70], ['y', 80]]), false, '/static/test-map.png',2),



])

onLoad(()=>{
    // 模拟http请求数据
    // 循环数组 从本地缓存中提取已收藏id
    let list = uni.getStorageSync("gatherCollectList");
    debugger;
    if (list != '') {
        list.forEach((item_i)=>{
            testArr.value.forEach((item_j)=>{
                if( item_j.getId() == item_i) {
                    item_j.setIsCollect(true);
                }
            })
        })
    }

    gatherArrayStore.setGatherList(testArr.value);

    
})



// 切换采集时钟和我的收藏的索引
const itemIndex = ref(0);

const versionArr = ref([
    "2.0 重生之境",
    "3.0 xxxxxxxx",
    "4.0 xxxxxxxx",
    "5.0 xxxxxxxx",
    "6.0 xxxxxxxx"
])

const versionValue = ref(versionArr.value[0]);



localTimeStore.$subscribe(() => {
    // 通过pinia api 监听现实时间的变动并执行对应的函数
    // 获取gather数组
    const gatherList: gatherDao[] = gatherArrayStore.gatherList!;

    // 将数组进行循环
    for (let i = 0; i < gatherList.length; i++) {
        // 获取开始时间数组和结束时间数组
        let startTimeList = gatherList[i].getStartTime();
        let endTimeList = gatherList[i].getEndTime();
        // 循环时间数组
        for (let j = 0; j < startTimeList.length; j++) {
            // 获取当前索引的开始时间和结束时间
            let startTime = startTimeList[j];
            let endTime = endTimeList[j];


            // 判断当前索引的采集物是否在当前时间显示
            gatherList[i].setIsAppear(computeIsShow(startTime, endTime))


            let duration = computeDuration(startTime, endTime, gatherList[i].getIsAppear())
            if (duration == undefined) {
                continue;
            }
            if (gatherList[i].getDuration() == undefined) {
                gatherList[i].setDuration(duration);
            }
        }
    }


    console.log("数据更新触发")
})

// 判断指定gather是否到了显示时间
function computeIsShow(startTime: number, endTime: number): boolean {
    // debugger;
    // 获取当前et时间的小时
    let hour = localTimeStore.getETTime.getHours();

    if (hour >= startTime && hour < endTime) { // 如果当前时间大于等于开始时间并且小于结束时间 那么这个采集物是已出现状态 返回true
        return true;

    } else {
        return false;
    }
}

// 计算倒计时
function computeDuration(startTime: number, endTime: number, isShow: boolean): Date {
    // debugger;
    let duration: Date = undefined!;

    let hour = localTimeStore.getETTime.getHours();
    let minute = localTimeStore.getETTime.getMinutes();

    // 用于持续时间为负数时追加的常量
    const oneDay = 24;
    const halfDay = 12;
    let durationTime;
    let durationTimeET;
    let durationTimeLT;

    // 判断是否出现
    if (isShow) { // 如果判断为true 说明已经出现
        durationTime = endTime - hour; // 用结束时间减去当前时间得到持续时间
        if (durationTime < 0) { // 如果持续时间为负数 那么就加上24
            durationTime += oneDay;
        }

        // 判断分钟是否为零
        if (minute == 0) {
            durationTimeET = durationTime * 60 * 60 * 1000 // 转换成毫秒

        } else {
            durationTimeET = (durationTime * 60 * 60 * 1000) - (minute * 60 * 1000); // 转换成毫秒 去除已经走过的分钟毫秒
        }
    } else { // 为false 说明还没出现
        // end - 下一个start 20 - 8  20+12 = 32 > 24  32 - 24 = 8
        // 计算下一次的开始时间
        let nextStartTime = startTime + halfDay;
        // if (nextStartTime > oneDay) { // 如果得到的下一次开始时间超过24小时制范围 那么就减去24
        //     nextStartTime = - oneDay;
        // }

        // 用下一次开始时间减去当前时间得到间隔时间
        durationTime = nextStartTime - hour;

        if (durationTime <= 0) {
            return undefined;
        }

        // 判断分钟是否为零
        if (minute == 0) {
            durationTimeET = durationTime * 60 * 60 * 1000 //转换成毫秒
        } else {
            durationTimeET = (durationTime * 60 * 60 * 1000) - (minute * 60 * 1000);
        }
    }

    durationTimeLT = new Date(new Date().setTime(Math.floor(durationTimeET / 20.57))).getTime(); // 转换为现实时间
    duration = new Date(new Date().setTime(localTimeStore.nowTime!.getTime() + durationTimeLT));

    return duration;
}


function selectVersion(e) {
    console.log(e.detail.value);
    versionValue.value = versionArr.value[e.detail.value]
    useGatherArrayStore().setShowIndex(e.detail.value)
}

function switchMenu(index: number) {
    itemIndex.value = index
}

function xx1() {

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
    console.log("测试", ET_Hour, ET_Minute)

    forGatherArrayTrueShow(testArrTrue.value, ET_Hour, ET_Minute)
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
    console.log("测试", ET_Hour, ET_Minute)

    forGatherArrayFalseShow(testArrFalse.value, ET_Hour, ET_Minute)
}

function forGatherArrayTrueShow(data: gatherDao[], hour: number, minute: number) {
    for (let i = 0; i < data.length; i++) {
        // console.log("进入数组循环")
        // 获取当前索引的采集点里的开始时间组
        let startTimeArray = data[i].getStartTime();
        // 获取当前索引的采集点里的结束时间组
        let endTimeArray = data[i].getEndTime();
        data[i].setTime(data[i].getDefaultDuration())
        // 通过当前采集点内的方法获取采集点的默认持续时间
        let defaultDuration = data[i].getDefaultDuration();

        for (let j = 0; j < endTimeArray.length; j++) {
            if (hour == endTimeArray[j]) {
                data[i].setIsAppear(false);
                testArrFalse.value.push(data[i])// 将过期数据丢到false数组里
                data.splice(i, 1); // 从数组里删除过期数据
                console.log(data)
            }
        }

        // 循环开始时间 判断当前ET小时是否等于或大于采集点开始时间的小时
        for (let j = 0; j < startTimeArray.length; j++) {
            // console.log("进入数组循环2")
            // console.log(startTimeArray[j])
            // console.log(ETHH > startTimeArray[j])
            // 如果等于 那么判断分钟是否为零
            if (hour == startTimeArray[j]) {
                // console.log("开始时间",startTimeArray[j])
                // 如果不为零 那么持续时间减去当前分钟的毫秒数 获得真实的持续时间
                if (minute > 0) {
                    // console.log("判断分钟")
                    data[i].setDuration(defaultDuration - (minute * 60 * 1000)); // 使用默认持续时间 - 已过去的时间 = 当前的持续时间 单位毫秒
                    console.log('Duration1:', data[i].getDuration())
                    //data[i].setIsAppear(true); // 将数据展示     
                    break;
                } else {
                    data[i].setDuration(defaultDuration)
                    console.log('Duration2:', data[i].getDuration())
                    //data[i].setIsAppear(true);
                    break
                }
            }
            if (hour > (startTimeArray[j] == 24 ? 0 : startTimeArray[j])) { // 如果当前ET小时大于采集点开始时间的小时 进行结束时间判断
                // 如果当前时间小于结束时间 那么进行分钟判断
                if (hour < (endTimeArray[j] == 0 ? 24 : endTimeArray[j])) {
                    // console.log("开始时间2",startTimeArray[j],endTimeArray[j])
                    let endTime = endTimeArray[j] - hour;
                    // 和上面一样
                    if (minute > 0) {
                        // console.log("判断分钟2") // 7200 - ((endtime - ethh)*60*60) -(etmm * 60)

                        // console.log("endTime",endTime)
                        data[i].setDuration(defaultDuration - ((endTime * 60 * 60 * 1000) + (minute * 60 * 1000))); // 使用默认持续时间 - 已过去的时间 = 当前的持续时间 单位毫秒
                        console.log('Duration3:', data[i].getDuration())
                        //data[i].setIsAppear(true); // 将数据展示
                        break;
                    } else {
                        data[i].setDuration(defaultDuration - (endTime * 60 * 60 * 1000));
                        console.log('Duration4:', data[i].getDuration())
                        //data[i].setIsAppear(true)
                        break
                    }
                }
            }
        }

    }
}

function forGatherArrayFalseShow(data: gatherDao[], hour: number, minute: number) {
    for (let i = 0; i < data.length; i++) {
        // console.log("进入数组循环")

        // 获取当前索引的采集点里的开始时间组
        let startTimeArray = data[i].getStartTime();
        // 获取当前索引的采集点里的结束时间组
        let endTimeArray = data[i].getEndTime();
        data[i].setTime(data[i].getDefaultCdTime())
        // 通过当前采集点内的方法获取采集点的默认间隔时间
        let defaultCdTime = data[i].getDefaultCdTime();

        for (let j = 0; j < startTimeArray.length; j++) {
            if (hour >= startTimeArray[j] && hour < endTimeArray[j]) {
                console.log("转移数组：", data[i].getLocation(), "p", startTimeArray[j], ":", endTimeArray[j])
                data[i].setIsAppear(true);
                testArrTrue.value.unshift(testArrFalse.value[i])// 将过期数据丢到false数组里
                testArrFalse.value.splice(i, 1) // 从数组里删除过期数据
                console.log(testArrFalse.value)
            }
        }

        // 循环开始时间 判断当前ET小时是否等于或大于采集点开始时间的小时
        for (let j = 0; j < startTimeArray.length; j++) {
            // console.log("进入数组循环2")
            // console.log(startTimeArray[j])
            // console.log(ETHH > startTimeArray[j])
            // 如果等于 那么判断分钟是否为零
            if (hour == endTimeArray[j]) {
                // console.log("开始时间",startTimeArray[j])
                // 如果不为零 那么持续时间减去当前分钟的毫秒数 获得真实的持续时间
                if (minute > 0) {
                    // console.log("判断分钟")
                    data[i].setDuration(defaultCdTime - (minute * 60 * 1000)); // 使用默认持续时间 - 已过去的时间 = 当前的持续时间 单位毫秒
                    console.log('DurationCD:', data[i].getDuration())

                    //data[i].setIsAppear(true); // 将数据展示     
                    break;
                } else {
                    data[i].setDuration(defaultCdTime)
                    console.log('DurationCDq:', data[i].getDuration())
                    //data[i].setIsAppear(true);
                    break
                }
            } else if (hour < 12) { // 当小时数小于12时

                if (hour > (startTimeArray[0])) { // 当小时数大于开始时间时
                    let timeRemaining = Math.abs(hour - startTimeArray[0] - 12);
                    if (minute > 0 && timeRemaining == 1) {
                        data[i].setDuration(3600000 - (minute * 60 * 1000))
                        console.log("晚上到早上计算完成时间 小于一小时：", data[i].getDuration())
                        break;
                    } else if (minute > 0 && timeRemaining > 1) {
                        data[i].setDuration(((timeRemaining) * 60 * 60 * 1000) - (minute * 60 * 1000))
                        console.log("晚上到早上计算完成时间 大于一小时非整数：", data[i].getDuration())
                        break;
                    } else if (minute == 0 && timeRemaining == 1) {
                        data[i].setDuration((timeRemaining * 60 * 60 * 1000))
                        console.log("晚上到早上计算完成时间 等于一小时：", data[i].getDuration())
                        break;
                    } else if (minute == 0 && timeRemaining > 1) {
                        data[i].setDuration(((timeRemaining) * 60 * 60 * 1000))
                        console.log("晚上到早上计算完成时间 大于一小时：", data[i].getDuration())
                        break;
                    }
                } else {
                    // 小于开始时间的情况只有小时归零了 那么就要用开始时间减去当前小时数
                    let timeRemaining = Math.abs(hour - startTimeArray[0]);
                    if (minute > 0 && timeRemaining == 1) {
                        data[i].setDuration(3600000 - (minute * 60 * 1000))
                        console.log("晚上到早上计算完成时间 小于一小时：", data[i].getDuration())
                        break;
                    } else if (minute > 0 && timeRemaining > 1) {
                        data[i].setDuration(((timeRemaining) * 60 * 60 * 1000) - (minute * 60 * 1000))
                        console.log("晚上到早上计算完成时间 大于一小时非整数：", data[i].getDuration())
                        break;
                    } else if (minute == 0 && timeRemaining == 1) {
                        data[i].setDuration((timeRemaining * 60 * 60 * 1000))
                        console.log("晚上到早上计算完成时间 等于一小时：", data[i].getDuration())
                        break;
                    } else if (minute == 0 && timeRemaining > 1) {
                        data[i].setDuration(((timeRemaining) * 60 * 60 * 1000))
                        console.log("晚上到早上计算完成时间 大于一小时：", data[i].getDuration())
                        break;
                    }
                }
            } else { // 当小时数大于12时
                if ((hour - 12) > (startTimeArray[0])) { // 当小时数大于开始时间时
                    let timeRemaining = Math.abs((hour - 12) - startTimeArray[0] - 12);
                    if (minute > 0 && timeRemaining == 1) {
                        data[i].setDuration(3600000 - (minute * 60 * 1000))
                        console.log("晚上到早上计算完成时间 小于一小时：", data[i].getDuration())
                        break;
                    } else if (minute > 0 && timeRemaining > 1) {
                        data[i].setDuration(((timeRemaining) * 60 * 60 * 1000) - (minute * 60 * 1000))
                        console.log("晚上到早上计算完成时间 大于一小时非整数：", data[i].getDuration())
                        break;
                    } else if (minute == 0 && timeRemaining == 1) {
                        data[i].setDuration((timeRemaining * 60 * 60 * 1000))
                        console.log("晚上到早上计算完成时间 等于一小时：", data[i].getDuration())
                        break;
                    } else if (minute == 0 && timeRemaining > 1) {
                        data[i].setDuration(((timeRemaining) * 60 * 60 * 1000))
                        console.log("晚上到早上计算完成时间 大于一小时：", data[i].getDuration())
                        break;
                    }
                } else {
                    // 小于开始时间的情况只有小时归零了 那么就要用开始时间减去当前小时数
                    let timeRemaining = Math.abs((hour - 12) - startTimeArray[0]);
                    if (minute > 0 && timeRemaining == 1) {
                        data[i].setDuration(3600000 - (minute * 60 * 1000))
                        console.log("晚上到早上计算完成时间 小于一小时：", data[i].getDuration())
                        break;
                    } else if (minute > 0 && timeRemaining > 1) {
                        data[i].setDuration(((timeRemaining) * 60 * 60 * 1000) - (minute * 60 * 1000))
                        console.log("晚上到早上计算完成时间 大于一小时非整数：", data[i].getDuration())
                        break;
                    } else if (minute == 0 && timeRemaining == 1) {
                        data[i].setDuration((timeRemaining * 60 * 60 * 1000))
                        console.log("晚上到早上计算完成时间 等于一小时：", data[i].getDuration())
                        break;
                    } else if (minute == 0 && timeRemaining > 1) {
                        data[i].setDuration(((timeRemaining) * 60 * 60 * 1000))
                        console.log("晚上到早上计算完成时间 大于一小时：", data[i].getDuration())
                        break;
                    }
                }
            }
        }

    }
}

</script>

<style >
.main {
    background-color: #ffffff;
}
</style>