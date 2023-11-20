<template>
    <view style="background-color: #ffffff; height: 50px; width: 100%; display: grid; grid-template-columns: 1fr 1px 1fr;">
        <view style="display: flex; flex-direction: column; align-items: center; justify-content: center;"
            @click="switchMenu(0)">
            <text style="height: 45px; display: flex; justify-content: center; align-items: center;">采集时钟</text>
            <view style="height: 5px; width: 100%; background-color: #476FB5;" v-show="ii == 0"></view>
            <view style="height: 5px; width: 100%;" v-show="ii != 0"></view>
        </view>
        <view style="width: 1px; height: 40px; background-color: #E6E6E6; margin-top: 5px; opacity: 0.5;"></view>
        <view style="display: flex; flex-direction: column; align-items: center; justify-content: center;"
            @click="switchMenu(1)">
            <text style="height: 45px; display: flex; justify-content: center; align-items: center;">我的收藏</text>
            <view style="height: 5px; width: 100%; background-color: #476FB5;" v-show="ii == 1"></view>
            <view style="height: 5px; width: 100%;" v-show="ii != 1"></view>
        </view>
    </view>
    <view style="overflow: hidden; background-color: #ffffff;" :style="{ height: autoHeight + 'px' }" v-show="ii == 0">
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
        <gather-tabbar-main-scroll-view :trueArray="testArrTrue" :falseArray="testArrFalse" :height="autoHeight - 30" v-if="useGatherArrayStore().getShowIndex() == 0"/>
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
    <view style="overflow: hidden; background-color: #ffffff;" :style="{ height: autoHeight + 'px' }" v-show="ii == 1">
        <scroll-view class="main" scroll-y :style="{ height: autoHeight + 'px' }">
            <!-- <view v-for="(item, index) in testArr" :key="index" style="padding: 5px 10px;">
            <gather-tabbar-main-box :data="item" />
        </view> -->
            6.0
        </scroll-view>
    </view>
</template>

<script setup lang="ts">
import { ref,onBeforeUnmount } from 'vue'
import { onLoad } from '@dcloudio/uni-app';
import type { Ref } from 'vue';
import gatherDao from '@/common/js/dao/gatherDao';
import { jobConstant } from '@/common/js/constant/jobConstant';
import { useGatherArrayStore } from '@/stores/gatherArray';

const systemInfo = uni.getSystemInfoSync();
const autoHeight = ref(systemInfo.safeArea?.height! - 50 - 50 - 50)

const testArrFalse: Ref<gatherDao[]> = ref([
     new gatherDao(["第四期重建用有生命活水", "第四期重建用有生命活水", "第四期重建用有生命活水", "第四期重建用有生命活水"], jobConstant().Miner, 100, 10, 12, "阿拉芭提雅云海", new Map<string, number>([['x', 33], ['y', 24]]), false, '/static/test-map.png'),
    //new gatherDao(["第四期重建用有生命活水", "第四期重建用有生命活水", "第四期重建用有生命活水"], jobConstant().Botanist, 100, 12, 14, "阿拉芭提雅云海a", new Map<string, number>([['x', 40], ['y', 16]]), false, '/static/test-map.png'),
    //new gatherDao(["第四期重建用有生命活水", "第四期重建用有生命活水"], jobConstant().Botanist, 80, 8, 10, "阿拉芭提雅云海b", new Map<string, number>([['x', 102], ['y', 105]]), false, '/static/test-map.png'),
     //new gatherDao(["第四期重建用有生命活水"], jobConstant().Miner, 80, 2, 4, "阿拉芭提雅云海c", new Map<string, number>([['x', 70], ['y', 80]]), false, '/static/test-map.png'),
    //new gatherDao(["第四期重建用有生命活水"], jobConstant().Miner, 80, 4, 6, "阿拉芭提雅云海d", new Map<string, number>([['x', 70], ['y', 80]]), false, '/static/test-map.png'),
    //new gatherDao(["第四期重建用有生命活水"], jobConstant().Miner, 80, 6, 8, "阿拉芭提雅云海e", new Map<string, number>([['x', 70], ['y', 80]]), false, '/static/test-map.png'),



])

const ii = ref(0);

const testArrTrue: Ref<gatherDao[]> = ref([])

const versionArr = ref([
    "2.0 重生之境",
    "3.0 xxxxxxxx",
    "4.0 xxxxxxxx",
    "5.0 xxxxxxxx",
    "6.0 xxxxxxxx"
])

const versionValue = ref(versionArr.value[0]);



// onLoad(() => {
//     setInterval(xx1, 1000);
//     setInterval(xx2, 1000);
// })

// onBeforeUnmount(()=>{
//     console.log("触发了")
// })

function selectVersion(e) {
    console.log(e.detail.value);
    versionValue.value = versionArr.value[e.detail.value]
    useGatherArrayStore().setShowIndex(e.detail.value)
}

function switchMenu(index: number) {
    ii.value = index
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
                if ((hour-12) > (startTimeArray[0])) { // 当小时数大于开始时间时
                    let timeRemaining = Math.abs((hour-12) - startTimeArray[0] - 12);
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
                    let timeRemaining = Math.abs((hour-12) - startTimeArray[0]);
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