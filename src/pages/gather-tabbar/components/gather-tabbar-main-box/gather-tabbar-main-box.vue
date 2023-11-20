<template>
    <view class="box" :class="(data.isAppear ? 'box-true-show' : 'box-false-show')"
        @click="clickView(data.imageUrl, data.location, data.coordinate)" @longpress="test">
        <view>
            <view
                style="display: grid; grid-template-columns: 1fr 1px 100px 1px 50px; padding-top: 10px; padding-bottom: 10px; gap: 5px;">
                <view class="item-text" :style="systemWidth >= 350 ? boxTextSystemWidth400 : boxTextSystemWidth300">
                    <view style="margin-top: 2px; margin-bottom: 2px;" v-for="(names, index) in props.data.name"
                        :key="index">
                        <text>{{ names }}</text>
                    </view>

                </view>
                <view style="height: 100%; opacity: 0.41;"
                    :style="{ backgroundColor: (data.isAppear ? '#FFFFFF' : '#000000') }">
                </view>
                <view class="item-text">
                    <view style="text-align: center;">
                        <view :style="systemWidth >= 350 ? boxTextSystemWidth400 : boxTextSystemWidth300">
                            <text>{{ data.location }}</text>
                        </view>
                        <view style="opacity: 0.59;"
                            :style="systemWidth >= 350 ? boxTagSystemWidth400 : boxTagSystemWidth300">
                            <text>{{ "x:" + data.coordinate.get('x') + "y:" + data.coordinate.get('y') }}</text>
                        </view>
                    </view>
                    <view style="text-align: center; margin-top: 10px;">
                        <view :style="systemWidth >= 350 ? boxTextSystemWidth400 : boxTextSystemWidth300">
                            <text>{{ "等级" + props.data.level }}</text>
                        </view>
                        <view style="opacity: 0.59;"
                            :style="systemWidth >= 350 ? boxTagSystemWidth400 : boxTagSystemWidth300">
                            <text>{{ props.data.job }}</text>
                        </view>
                    </view>

                </view>
                <view style="height: 100%; opacity: 0.41;"
                    :style="{ backgroundColor: (data.isAppear ? '#FFFFFF' : '#000000') }">
                </view>
                <view class="time-box">
                    
                    <view style="height: 0; width: 0; position: relative; top: -5px;" v-if="collect">
                        <image
                            src="@/static/collect-true-icon.png"
                            mode="aspectFit"
                            style="height: 20px; width: 20px;"
                        />
                    </view>
                    <view style="height: 0px; width: 0px; position: relative; top: -5px;" v-else>
                        <image
                            src="@/static/collect-false-icon.png"
                            mode="aspectFit"
                            style="height: 20px; width: 20px;"
                        />
                    </view>
                    <view class="time-text">
                        <text>{{ mm + ':' + ss }}</text>
                    </view>
                </view>
            </view>
        </view>
    </view>

    <!-- 弹窗 -->
    <view>
        <uni-popup ref="popup" type="center">
            <view
                style="height: 500px; background-color: #FFFFFF; border: 1px solid #476FB5; border-radius: 0px 50px 0px 50px;">
                <scroll-view scroll-y>
                    <view style="height: 300px; padding:10px 20px;">
                        <image :src="popupImageUrl" mode="aspectFit" style="height: 100%; width: 100%;" />
                    </view>
                    <view style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 10px;">
                        <view style="height: 50px; display: flex; flex-direction: row;">
                            <view
                                style="height: 50px; width: 50px; padding-left: 20px; padding-right: 10px; display: flex; justify-content: center; align-items: center;">
                                <image src="@/static/map-icon.png" mode="aspectFit" style="height: 100%; width: 100%;" />
                            </view>
                            <view style="display: flex; flex-direction: column; justify-content: end; align-items: center;">
                                <view
                                    style="height: 20px; font-size: 12px; font-weight: 1000; display: flex; align-items: center;">
                                    <text>所在地</text>
                                </view>
                                <view
                                    style="height: 25px; font-size: 12px; display: flex; align-items: center; opacity: 0.5;">
                                    <text>{{ popupLocation }}</text>
                                </view>
                            </view>
                        </view>
                        <view style="height: 50px; display: flex; flex-direction: row;">
                            <view
                                style="height: 50px; width: 50px; padding-left: 5px; padding-right: 10px; display: flex; justify-content: center; align-items: center;">
                                <image src="@/static/coordinate-icon.png" mode="aspectFit"
                                    style="height: 100%; width: 100%;" />
                            </view>
                            <view style="display: flex; flex-direction: column; justify-content: end; align-items: center;">
                                <view
                                    style="height: 20px; font-size: 12px; font-weight: 1000; display: flex; align-items: center;">
                                    <text>采集坐标</text>
                                </view>
                                <view
                                    style="height: 15px; font-size: 10px; display: flex; align-items: center; opacity: 0.5;">
                                    <text>{{ 'X : ' + popupCoordinate.get('x') }}</text>
                                </view>
                                <view
                                    style="height: 15px; font-size: 10px; display: flex; align-items: center; opacity: 0.5;">
                                    <text>{{ 'Y : ' + popupCoordinate.get('y') }}</text>
                                </view>
                            </view>
                        </view>
                    </view>
                </scroll-view>
            </view>

        </uni-popup>
    </view>
</template>

<script setup lang="ts">
import { ref, type Ref, defineProps, onMounted, onBeforeUnmount, getCurrentInstance,onBeforeMount } from 'vue'
import { onLoad,onShow,onReady } from '@dcloudio/uni-app';
import type gatherDao from '@/common/js/dao/gatherDao'

// 获取屏幕的宽度
const systemWidth = uni.getSystemInfoSync().screenWidth;

// 根据屏幕宽度 更改字体大小
const boxTextSystemWidth400 = ref({
    fontSize: '12px',
})
const boxTextSystemWidth300 = ref({
    fontSize: '8px',
})
const boxTagSystemWidth400 = ref({
    fontSize: '10px'
})
const boxTagSystemWidth300 = ref({
    fontSize: '8px'
})

const props = defineProps<{
    data: gatherDao
    value: number
}>()

const popup = ref(null)

const testValue = ref(0);

const popupImageUrl = ref("");

const popupLocation = ref("");

const popupCoordinate: Ref<Map<string, number>> = ref(new Map);

// onLoad(() => {
//     console.log("触发了")
//     setTimeout(() => {
//         let defTime = props.data.getTime() / 20.57
//         console.log('defTime:', defTime)
//         let time = props.data.getDuration() / 20.57
//         console.log("time:", props.data.getDuration())
//         let ss = defTime / 100
//         console.log('ss:', ss)
//         testValue.value = Math.trunc((time / defTime) * 100)
//         console.log('testValue.value1:', testValue.value)

//         setInterval(() => {
//             // console.log("测试进度条动画")
//             if (testValue.value == 100) {

//                 testValue.value = 0
//                 return
//             }
//             testValue.value++
//             console.log(testValue.value)
//         }, ss)
//     }, 1000)
// })

const mm = ref(0);
const ss = ref(0);
let timer = 0;
let timer2 = 0;

const instance = getCurrentInstance();

onReady(()=>{
    console.log("触发了load")
    timer2 = setTimeout(()=>{
        console.log("触发了1",props.data.location,":",props.value)
        let countDown = new Date(Math.floor(props.value / 20.57));
        //    console.log(new Date(Math.floor(7200000 / 20.57)).getTime())
        mm.value = countDown.getUTCMinutes();
        ss.value = countDown.getUTCSeconds();
        clearTimeout(timer2);
        timer2 = 0;
    },1000)
    
    timer = setInterval(() => {
        // console.log("触发了timer");
        if (mm.value == 0) {
            if (ss.value > 0) {
                ss.value--;
            } else {
                console.log("消除timer前",timer)
                clearInterval(timer);
                timer = 0;
                console.log("消除timer后",timer)
            }
        }
        else if (mm.value != 0) {
            if (ss.value > -1) {
                ss.value--;
            }
            if (ss.value == -1) {
                mm.value--;
                ss.value = 59;
            }
        }
    }, 1000)

    // timer = setInterval(()=>{
    //     // 当前时间的时间戳
    //     let nowTime = new Date().getTime()

    //     // console.log(props.value - nowTime)
    //     // 当前倒计时的分钟
    //     mm.value = new Date(new Date().setTime(props.value - nowTime)).getUTCMinutes();
    //     ss.value = new Date(new Date().setTime(props.value - nowTime)).getUTCSeconds();

    // },0)
})

onBeforeMount(() => {
    
//    timer2 = setTimeout(() => {
//         console.log("aaa:", props.value,":",props.data.location)
//         // 解析倒计时
//         let countDown = new Date(Math.floor(props.value / 20.57));
//         //    console.log(new Date(Math.floor(7200000 / 20.57)).getTime())
//         MM.value = countDown.getUTCMinutes();
//         SS.value = countDown.getUTCSeconds();

//     }, 600)

    

})

const collect = ref(false);

function test() {
    console.log("长按了")
    collect.value = !collect.value
}

onBeforeUnmount(() => {
    console.log("触发了2",props.data.location)
    // clearInterval(timer);
    // clearTimeout(timer2);
})


function clickView(imageUrl: string, location: string, coordinate: Map<string, number>) {
    console.log("触发点击事件")
    popupImageUrl.value = imageUrl;
    popupLocation.value = location;
    popupCoordinate.value = coordinate;
    setTimeout(() => { popup.value.open(); }, 300)
}
</script>

<style >
.box {
    height: auto;
    /* background-color: #476FB5; */
    border-radius: 17px;
    /* border: 1px solid #FFFFFF; */
    box-shadow: 7px 7px 5px #23181559;
}

.box-true-show {
    background-color: #476FB5;
    border: 2px solid #FFFFFF;
    color: #FFFFFF;
}

.box-false-show {
    background-color: #FFFFFF;
    border: 2px solid #476FB5;
    color: #000000;
}

.item-text {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%; width: 100%;
    /* white-space: nowrap; */
    /* color: #FFFFFF; */
}

.time-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    /* justify-content: center; */
}

.time-text {
    align-items: center;
    font-size: 14px;
    /* color: #FFFFFF; */
    display: flex;
    justify-content: center;
    height: 100%; width: 100%;
}

.tag-text {
    width: 50px;
    margin-left: auto;
    font-size: 8px;
    border-radius: 10px;
    text-align: center;
    /* color: #ffffff; */
}

.tag-true-show {
    background-color: #F7931E;
}

.tag-false-show {
    background-color: #B3B3B3;
}

.progress-true-color {
    border: 0.5px solid #FFFFFF;
    border-radius: 10px;
}

.progress-false-color {
    border: 0.5px solid #476FB5;
    border-radius: 10px;
}
</style>