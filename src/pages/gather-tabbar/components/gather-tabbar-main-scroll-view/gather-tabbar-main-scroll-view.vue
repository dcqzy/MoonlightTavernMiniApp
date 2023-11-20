<template>
    <scroll-view class="main" scroll-y :style="{ height: height + 'px' }" v-if="useGatherArrayStore().getShowIndex() == 0">
        <!-- <view v-for="(item, index) in trueArray" :key="index" style="padding: 5px 10px;" v-if="trueArray.length != 0">
            <gather-tabbar-main-box :value="item.getDuration()" :data="item" v-if="item.getIsAppear()"/>
        </view> -->
        <view v-for="(item, index) in falseArray" :key="index" style="padding: 5px 10px;">
            <gather-tabbar-main-box :value="item.getDuration()" :data="item" />
        </view>
    </scroll-view>
</template>

<script setup lang="ts">
import type gatherDao from '@/common/js/dao/gatherDao';
import { useGatherArrayStore } from '@/stores/gatherArray';
import { ref, defineProps, onBeforeUnmount, onMounted } from 'vue'



const prop = defineProps<{
    trueArray: gatherDao[],
    falseArray: gatherDao[],
    height: number
}>()

let timerTrue = 0
let timerFalse = 0

onMounted(() => {
    timerTrue = setInterval(xx1,300);
    timerFalse = setInterval(xx2, 300);
})

onBeforeUnmount(() => {
    console.log("触发了111")
    clearInterval(timerTrue);
    clearInterval(timerFalse);
})


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
    // console.log("测试", ET_Hour, ET_Minute)

    forGatherArrayTrueShow(prop.trueArray, ET_Hour, ET_Minute)
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

    // forGatherArrayFalseShow(prop.falseArray, ET_Hour, ET_Minute)
    forGatherArrayFalseShow(prop.falseArray,ET_Hour,ET_Minute)
}

function forGatherArrayTrueShow(data: gatherDao[], hour: number, minute: number) {
    let deleteArr = [];
    for (let i = 0; i < data.length; i++) {
        // console.log("进入数组循环")
        // 获取当前索引的采集点里的开始时间组
        let startTime = data[i].getStartTime();
        // 获取当前索引的采集点里的结束时间组
        let endTime = data[i].getEndTime();
        // data[i].setTime(data[i].getDefaultDuration())
        // 通过当前采集点内的方法获取采集点的默认持续时间
        let defaultDuration = data[i].getDefaultDuration();


        // 将当前小时数进行缩减
        if (hour >= 12) {
            hour = hour - 12
        }

        // 判断当前小时是否等于或大于结束时间 x >= 0 ? 如果 end =0
        if (hour != 0 && endTime == 0) {
            endTime = endTime + 12;
        }

        if (hour >= endTime) {
            // 将当前的采集物设置为未出现
            prop.trueArray[i].setIsAppear(false);
            // 将未出现的采集物转移到未出现数组里 并在当前数组进行移除
            prop.falseArray.push(prop.trueArray[i]);
            deleteArr.push(i);
            // data.splice(i,1);
            continue;
        }

        // 判断持续时间
        if (hour == startTime) {
            console.log("defaultDuration:", defaultDuration)
            if (minute > 0) {
                // console.log("判断分钟")
                data[i].setDuration(defaultDuration - (minute * 60 * 1000)); // 使用默认持续时间 - 已过去的时间 = 当前的持续时间 单位毫秒
                // console.log('Duration1:', data[i].getDuration())
                //data[i].setIsAppear(true); // 将数据展示     
                continue;
            } else {
                data[i].setDuration(defaultDuration)
                // console.log('Duration2:', data[i].getDuration())
                //data[i].setIsAppear(true);
                continue;
            }
        } else {
            // 计算已过时间
            const pastHour = endTime - hour;

            if (minute > 0) {
                data[i].setDuration(defaultDuration - (pastHour * 60 * 60 * 1000) - (minute * 60 * 1000));
                // console.log('Duration3:', data[i].getDuration())
                continue;
            } else {
                data[i].setDuration(defaultDuration - (pastHour * 60 * 60 * 1000));
                // console.log('Duration4:', data[i].getDuration())
                continue;
            }
        }

        // for (let j = 0; j < endTimeArray.length; j++) {
        //     if (hour == endTimeArray[j]) {
        //         data[i].setIsAppear(false);
        //         prop.falseArray.push(data[i])// 将过期数据丢到false数组里
        //         data.splice(i, 1); // 从数组里删除过期数据
        //         console.log(data)
        //     }
        // }

        // 循环开始时间 判断当前ET小时是否等于或大于采集点开始时间的小时
        // for (let j = 0; j < startTimeArray.length; j++) {
        //     // console.log("进入数组循环2")
        //     // console.log(startTimeArray[j])
        //     // console.log(ETHH > startTimeArray[j])
        //     // 如果等于 那么判断分钟是否为零
        //     if (hour == startTimeArray[j]) {
        //         // console.log("开始时间",startTimeArray[j])
        //         // 如果不为零 那么持续时间减去当前分钟的毫秒数 获得真实的持续时间
        //         if (minute > 0) {
        //             // console.log("判断分钟")
        //             data[i].setDuration(defaultDuration - (minute * 60 * 1000)); // 使用默认持续时间 - 已过去的时间 = 当前的持续时间 单位毫秒
        //             console.log('Duration1:', data[i].getDuration())
        //             //data[i].setIsAppear(true); // 将数据展示     
        //             break;
        //         } else {
        //             data[i].setDuration(defaultDuration)
        //             console.log('Duration2:', data[i].getDuration())
        //             //data[i].setIsAppear(true);
        //             break
        //         }
        //     }
        //     if (hour > (startTimeArray[j] == 24 ? 0 : startTimeArray[j])) { // 如果当前ET小时大于采集点开始时间的小时 进行结束时间判断
        //         // 如果当前时间小于结束时间 那么进行分钟判断
        //         if (hour < (endTimeArray[j] == 0 ? 24 : endTimeArray[j])) {
        //             // console.log("开始时间2",startTimeArray[j],endTimeArray[j])
        //             let endTime = endTimeArray[j] - hour;
        //             // 和上面一样
        //             if (minute > 0) {
        //                 // console.log("判断分钟2") // 7200 - ((endtime - ethh)*60*60) -(etmm * 60)

        //                 // console.log("endTime",endTime)
        //                 data[i].setDuration(defaultDuration - ((endTime * 60 * 60 * 1000) + (minute * 60 * 1000))); // 使用默认持续时间 - 已过去的时间 = 当前的持续时间 单位毫秒
        //                 console.log('Duration3:', data[i].getDuration())
        //                 //data[i].setIsAppear(true); // 将数据展示
        //                 break;
        //             } else {
        //                 data[i].setDuration(defaultDuration - (endTime * 60 * 60 * 1000));
        //                 console.log('Duration4:', data[i].getDuration())
        //                 //data[i].setIsAppear(true)
        //                 break
        //             }
        //         }
        //     }
        // }

    }

    // 在末尾进行删除
    for (let i = 0; i < deleteArr.length; i++) {
        prop.trueArray.splice(deleteArr[i], 1);
    }
}

function forGatherArrayFalseShow(data: gatherDao[], hour: number, minute: number) {
    let deleteArr = [];
    for (let i = 0; i < data.length; i++) {
        // console.log("进入数组循环")

        // 获取当前索引的采集点里的开始时间组
        let startTimeArray = data[i].getStartTime();
        // 获取当前索引的采集点里的结束时间组
        let endTimeArray = data[i].getEndTime();
        // data[i].setTime(data[i].getDefaultCdTime())
        // 通过当前采集点内的方法获取采集点的默认间隔时间
        let defaultCdTime = data[i].getDefaultCdTime();

        // 判断当前时间是否大于12
        if (hour >= 12) {
            hour = hour - 12;
        }
        // 如果当前时间等于11 同时 这组采集物的时间是 10 - 12 但因为程序逻辑问题 12 = 0 那么 11 不可能大于 0  这时候就要0变成12 hour的区间限制为0-11
        if (hour >= startTimeArray && hour < (endTimeArray == 0 ? 12 : endTimeArray)) {
            console.log("转移数组：", data[i].getLocation(), "p", startTimeArray, ":", endTimeArray)
            prop.falseArray[i].setIsAppear(true);
            prop.trueArray.unshift(prop.falseArray[i])// 将过期数据丢到false数组里
            deleteArr.push(i);
            //data.splice(i, 1) // 从数组里删除过期数据
            // console.log(prop.falseArray)
            continue;
        }

        // 进行判断时间
        if (hour == endTimeArray) {
            if (minute > 0) {
                // console.log("判断分钟")
                data[i].setDuration(defaultCdTime - (minute * 60 * 1000)); // 使用默认持续时间 - 已过去的时间 = 当前的持续时间 单位毫秒
                console.log('DurationCD:', data[i].getDuration())

                //data[i].setIsAppear(true); // 将数据展示     
                continue;
            } else {
                console.log("defaultCdTime:", defaultCdTime, ":", data[i].location)
                data[i].setDuration(defaultCdTime)
                console.log('DurationCDq:', data[i].getDuration())
                //data[i].setIsAppear(true);
                continue
            }
        } else { // 当小时数大于开始时间时
            // console.log("hour:",hour)
            // console.log("startTimeArray:",startTimeArray)
            let timeRemaining = 0;
            if (hour > startTimeArray) {
                timeRemaining = Math.abs(hour - startTimeArray - 12);
            } else {
                timeRemaining = Math.abs(hour - startTimeArray);
            }

            // console.log(timeRemaining)
            if (minute > 0 && timeRemaining == 1) {
                data[i].setDuration(3600000 - (minute * 60 * 1000))
                // console.log("晚上到早上计算完成时间 小于一小时：", data[i].getDuration())
                continue;
            } else if (minute > 0 && timeRemaining > 1) {
                data[i].setDuration(((timeRemaining) * 60 * 60 * 1000) - (minute * 60 * 1000))
                // console.log("晚上到早上计算完成时间 大于一小时非整数：", data[i].getDuration())
                continue;
            } else if (minute == 0 && timeRemaining == 1) {
                data[i].setDuration((timeRemaining * 60 * 60 * 1000))
                // console.log("晚上到早上计算完成时间 等于一小时：", data[i].getDuration())
                continue;
            } else if (minute == 0 && timeRemaining > 1) {
                data[i].setDuration(((timeRemaining) * 60 * 60 * 1000))
                // console.log("晚上到早上计算完成时间 大于一小时：", data[i].getDuration())
                continue;
            }
        }

        // for (let j = 0; j < startTimeArray.length; j++) {
        //   22  22   && 0  2
        //     if (hour >= startTimeArray[j] && hour < endTimeArray[j]) {
        //         console.log("转移数组：", data[i].getLocation(), "p", startTimeArray[j], ":", endTimeArray[j])
        //         data[i].setIsAppear(true);
        //         prop.trueArray.unshift(prop.falseArray[i])// 将过期数据丢到false数组里
        //         prop.falseArray.splice(i, 1) // 从数组里删除过期数据
        //         console.log(prop.falseArray)
        //     }
        // }

        // 循环开始时间 判断当前ET小时是否等于或大于采集点开始时间的小时
        //     for (let j = 0; j < startTimeArray.length; j++) {
        //         // console.log("进入数组循环2")
        //         // console.log(startTimeArray[j])
        //         // console.log(ETHH > startTimeArray[j])
        //         // 如果等于 那么判断分钟是否为零
        //         if (hour == endTimeArray[j]) {
        //             // console.log("开始时间",startTimeArray[j])
        //             // 如果不为零 那么持续时间减去当前分钟的毫秒数 获得真实的持续时间
        //             if (minute > 0) {
        //                 // console.log("判断分钟")
        //                 data[i].setDuration(defaultCdTime - (minute * 60 * 1000)); // 使用默认持续时间 - 已过去的时间 = 当前的持续时间 单位毫秒
        //                 console.log('DurationCD:', data[i].getDuration())

        //                 //data[i].setIsAppear(true); // 将数据展示     
        //                 break;
        //             } else {
        //                 data[i].setDuration(defaultCdTime)
        //                 console.log('DurationCDq:', data[i].getDuration())
        //                 //data[i].setIsAppear(true);
        //                 break
        //             }
        //         } else if (hour < 12) { // 当小时数小于12时

        //             if (hour > (startTimeArray[0])) { // 当小时数大于开始时间时
        //                 let timeRemaining = Math.abs(hour - startTimeArray[0] - 12);
        //                 if (minute > 0 && timeRemaining == 1) {
        //                     data[i].setDuration(3600000 - (minute * 60 * 1000))
        //                     console.log("晚上到早上计算完成时间 小于一小时：", data[i].getDuration())
        //                     break;
        //                 } else if (minute > 0 && timeRemaining > 1) {
        //                     data[i].setDuration(((timeRemaining) * 60 * 60 * 1000) - (minute * 60 * 1000))
        //                     console.log("晚上到早上计算完成时间 大于一小时非整数：", data[i].getDuration())
        //                     break;
        //                 } else if (minute == 0 && timeRemaining == 1) {
        //                     data[i].setDuration((timeRemaining * 60 * 60 * 1000))
        //                     console.log("晚上到早上计算完成时间 等于一小时：", data[i].getDuration())
        //                     break;
        //                 } else if (minute == 0 && timeRemaining > 1) {
        //                     data[i].setDuration(((timeRemaining) * 60 * 60 * 1000))
        //                     console.log("晚上到早上计算完成时间 大于一小时：", data[i].getDuration())
        //                     break;
        //                 }
        //             } else {
        //                 // 小于开始时间的情况只有小时归零了 那么就要用开始时间减去当前小时数
        //                 let timeRemaining = Math.abs(hour - startTimeArray[0]);
        //                 if (minute > 0 && timeRemaining == 1) {
        //                     data[i].setDuration(3600000 - (minute * 60 * 1000))
        //                     console.log("晚上到早上计算完成时间 小于一小时：", data[i].getDuration())
        //                     break;
        //                 } else if (minute > 0 && timeRemaining > 1) {
        //                     data[i].setDuration(((timeRemaining) * 60 * 60 * 1000) - (minute * 60 * 1000))
        //                     console.log("晚上到早上计算完成时间 大于一小时非整数：", data[i].getDuration())
        //                     break;
        //                 } else if (minute == 0 && timeRemaining == 1) {
        //                     data[i].setDuration((timeRemaining * 60 * 60 * 1000))
        //                     console.log("晚上到早上计算完成时间 等于一小时：", data[i].getDuration())
        //                     break;
        //                 } else if (minute == 0 && timeRemaining > 1) {
        //                     data[i].setDuration(((timeRemaining) * 60 * 60 * 1000))
        //                     console.log("晚上到早上计算完成时间 大于一小时：", data[i].getDuration())
        //                     break;
        //                 }
        //             }
        //         } else { // 当小时数大于12时
        //             if ((hour - 12) > (startTimeArray[0])) { // 当小时数大于开始时间时
        //                 let timeRemaining = Math.abs((hour - 12) - startTimeArray[0] - 12);
        //                 if (minute > 0 && timeRemaining == 1) {
        //                     data[i].setDuration(3600000 - (minute * 60 * 1000))
        //                     console.log("晚上到早上计算完成时间 小于一小时：", data[i].getDuration())
        //                     break;
        //                 } else if (minute > 0 && timeRemaining > 1) {
        //                     data[i].setDuration(((timeRemaining) * 60 * 60 * 1000) - (minute * 60 * 1000))
        //                     console.log("晚上到早上计算完成时间 大于一小时非整数：", data[i].getDuration())
        //                     break;
        //                 } else if (minute == 0 && timeRemaining == 1) {
        //                     data[i].setDuration((timeRemaining * 60 * 60 * 1000))
        //                     console.log("晚上到早上计算完成时间 等于一小时：", data[i].getDuration())
        //                     break;
        //                 } else if (minute == 0 && timeRemaining > 1) {
        //                     data[i].setDuration(((timeRemaining) * 60 * 60 * 1000))
        //                     console.log("晚上到早上计算完成时间 大于一小时：", data[i].getDuration())
        //                     break;
        //                 }
        //             } else {
        //                 // 小于开始时间的情况只有小时归零了 那么就要用开始时间减去当前小时数
        //                 let timeRemaining = Math.abs((hour - 12) - startTimeArray[0]);
        //                 if (minute > 0 && timeRemaining == 1) {
        //                     data[i].setDuration(3600000 - (minute * 60 * 1000))
        //                     console.log("晚上到早上计算完成时间 小于一小时：", data[i].getDuration())
        //                     break;
        //                 } else if (minute > 0 && timeRemaining > 1) {
        //                     data[i].setDuration(((timeRemaining) * 60 * 60 * 1000) - (minute * 60 * 1000))
        //                     console.log("晚上到早上计算完成时间 大于一小时非整数：", data[i].getDuration())
        //                     break;
        //                 } else if (minute == 0 && timeRemaining == 1) {
        //                     data[i].setDuration((timeRemaining * 60 * 60 * 1000))
        //                     console.log("晚上到早上计算完成时间 等于一小时：", data[i].getDuration())
        //                     break;
        //                 } else if (minute == 0 && timeRemaining > 1) {
        //                     data[i].setDuration(((timeRemaining) * 60 * 60 * 1000))
        //                     console.log("晚上到早上计算完成时间 大于一小时：", data[i].getDuration())
        //                     break;
        //                 }
        //             }
        //         }
        //     }

    }

    deleteArr.forEach((value, index) => {
        prop.falseArray.splice(value, 1)
    })
}

function forGatherArrayFalseShow1(data: gatherDao[]) {
    const E_TIME = 20.57;
    for (let i = 0; i < prop.falseArray.length; i++) {
        let hour = new Date(new Date().setTime(new Date().setTime(Math.floor(new Date().getTime() * E_TIME)))).getHours();
        let minute = new Date(new Date().setTime(new Date().setTime(Math.floor(new Date().getTime() * E_TIME)))).getMinutes();
        // console.log("进入数组循环")

        // 获取当前索引的采集点里的开始时间组
        let startTime = data[i].getStartTime();
        // 获取当前索引的采集点里的结束时间组
        let endTime = data[i].getEndTime();
        // data[i].setTime(data[i].getDefaultCdTime())
        // 通过当前采集点内的方法获取采集点的默认间隔时间
        let defaultCdTime = data[i].getDefaultCdTime();

        let defaultDuration = data[i].getDefaultDuration();

        // 判断当前时间是否大于12
        if (hour >= 12) {
            hour = hour - 12;
        }
        // 如果当前时间等于11 同时 这组采集物的时间是 10 - 12 但因为程序逻辑问题 12 = 0 那么 11 不可能大于 0  这时候就要0变成12 hour的区间限制为0-11
        if (hour >= startTime && hour < (endTime == 0 ? 12 : endTime)) {
            // console.log("转移数组：", data[i].getLocation(), "p", startTimeArray, ":", endTimeArray)
            data[i].setIsAppear(true);
            // prop.trueArray.unshift(prop.falseArray[i])// 将过期数据丢到false数组里
            //data.splice(i, 1) // 从数组里删除过期数据
            // console.log(prop.falseArray)
        } else {
            data[i].setIsAppear(false);
        }

        if (new Date().getTime() > prop.falseArray[i].getDuration()) {
            console.log("aaaa,",new Date().getTime() ," + ",prop.falseArray[i].getDuration())
            prop.falseArray[i].setDuration(0);
        }
        // debugger
        if (data[i].getIsAppear()) { // 已出现
            // 判断持续时间
            if (hour == startTime) {
                console.log("defaultDuration:", defaultDuration)
                if (minute > 0) {
                    // console.log("判断分钟")
                    // 转换成结束时间的时间戳 当前时间戳 + 剩余持续时间毫秒
                    if (prop.falseArray[i].getDuration() == 0) {
                        prop.falseArray[i].setDuration(new Date().getTime() + (Math.floor((defaultDuration - (minute * 60 * 1000)) / E_TIME))); // 使用默认持续时间 - 已过去的时间 = 当前的持续时间 单位毫秒
                    }

                    // console.log('Duration1:', data[i].getDuration())
                    //data[i].setIsAppear(true); // 将数据展示     
                    continue;
                } else {
                    if (prop.falseArray[i].getDuration() == 0) {
                        prop.falseArray[i].setDuration(new Date().getTime() + Math.floor((defaultDuration / E_TIME)))
                    }
                    // console.log('Duration2:', data[i].getDuration())
                    //data[i].setIsAppear(true);
                    continue;
                }
            } else {
                // 计算已过时间
                const pastHour = endTime - hour;

                if (minute > 0) {
                    if (prop.falseArray[i].getDuration() == 0) {
                        prop.falseArray[i].setDuration(new Date().getTime() + Math.floor(((defaultDuration - (pastHour * 60 * 60 * 1000) - (minute * 60 * 1000)) / E_TIME)));

                    }    // console.log('Duration3:', data[i].getDuration())
                    continue;
                } else {
                    if (prop.falseArray[i].getDuration() == 0) {
                        prop.falseArray[i].setDuration(new Date().getTime() + Math.floor(((defaultDuration - (pastHour * 60 * 60 * 1000)) / E_TIME)));

                    }    // console.log('Duration4:', data[i].getDuration())
                    continue;
                }
            }
        } else { // 未出现
            // 进行判断时间
            if (hour == endTime) {
                if (minute > 0) {
                    // console.log("判断分钟")
                    if (prop.falseArray[i].getDuration() == 0) {
                        prop.falseArray[i].setDuration(new Date().getTime() + Math.floor((defaultCdTime - (minute * 60 * 1000) / E_TIME))); // 使用默认持续时间 - 已过去的时间 = 当前的持续时间 单位毫秒

                    } console.log('DurationCD:', data[i].getDuration())

                    //data[i].setIsAppear(true); // 将数据展示     
                    continue;
                } else {
                    console.log("defaultCdTime:", defaultCdTime, ":", data[i].location)
                    if (prop.falseArray[i].getDuration() == 0) {
                        prop.falseArray[i].setDuration(new Date().getTime() + Math.floor((defaultCdTime / E_TIME)))

                    } console.log('DurationCDq:', data[i].getDuration())
                    //data[i].setIsAppear(true);
                    continue
                }
            } else { // 当小时数大于开始时间时
                // console.log("hour:",hour)
                // console.log("startTimeArray:",startTimeArray)
                let timeRemaining = 0;
                if (hour > startTime) {
                    timeRemaining = Math.abs(hour - startTime - 12);
                } else {
                    timeRemaining = Math.abs(hour - startTime);
                }

                // console.log(timeRemaining)
                if (minute > 0 && timeRemaining == 1) {
                    if (prop.falseArray[i].getDuration() == 0) {
                        prop.falseArray[i].setDuration(new Date().getTime() + Math.floor((3600000 - (minute * 60 * 1000) / E_TIME)))
                    }
                    // console.log("晚上到早上计算完成时间 小于一小时：", data[i].getDuration())
                    continue;
                } else if (minute > 0 && timeRemaining > 1) {
                    if (prop.falseArray[i].getDuration() == 0) {
                        prop.falseArray[i].setDuration(new Date().getTime() + Math.floor((((timeRemaining * 60 * 60 * 1000) - (minute * 60 * 1000)) / E_TIME)))

                    }    // console.log("晚上到早上计算完成时间 大于一小时非整数：", data[i].getDuration())
                    continue;
                } else if (minute == 0 && timeRemaining == 1) {
                    if (prop.falseArray[i].getDuration() == 0) {
                        prop.falseArray[i].setDuration(new Date().getTime() + Math.floor(((timeRemaining * 60 * 60 * 1000) / E_TIME)))

                    }    // console.log("晚上到早上计算完成时间 等于一小时：", data[i].getDuration())
                    continue;
                } else if (minute == 0 && timeRemaining > 1) {
                    if (prop.falseArray[i].getDuration() == 0) {
                        prop.falseArray[i].setDuration(new Date().getTime() + Math.floor(((timeRemaining * 60 * 60 * 1000) / E_TIME)))

                    }    // console.log("晚上到早上计算完成时间 大于一小时：", data[i].getDuration())
                    continue;
                }
            }
        }



    }

}
</script>

<style ></style>