<template>
    <view class="box" :class="(gather.isAppear ? 'box-true-show' : 'box-false-show')"
        @click="clickView(gather.imageUrl, gather.location, gather.coordinate)" @longpress="longPress">
        <view>
            <view
                style="display: grid; grid-template-columns: 1fr 1px 100px 1px 50px; padding-top: 10px; padding-bottom: 10px; gap: 5px;">
                <view class="item-text" :style="systemWidth >= 350 ? boxTextSystemWidth400 : boxTextSystemWidth300">
                    <view style="margin-top: 2px; margin-bottom: 2px;" v-for="(names, index) in gather.name" :key="index">
                        <text>{{ names }}</text>
                    </view>

                </view>
                <view style="height: 100%; opacity: 0.41;"
                    :style="{ backgroundColor: (gather.isAppear ? '#FFFFFF' : '#000000') }">
                </view>
                <view class="item-text">
                    <view style="text-align: center;">
                        <view :style="systemWidth >= 350 ? boxTextSystemWidth400 : boxTextSystemWidth300">
                            <text>{{ gather.location }}</text>
                        </view>
                        <view style="opacity: 0.59;"
                            :style="systemWidth >= 350 ? boxTagSystemWidth400 : boxTagSystemWidth300">
                            <text>{{ "x:" + gather.coordinate.get('x') + "y:" + gather.coordinate.get('y') }}</text>
                        </view>
                    </view>
                    <view style="text-align: center; margin-top: 10px;">
                        <view :style="systemWidth >= 350 ? boxTextSystemWidth400 : boxTextSystemWidth300">
                            <text>{{ "等级" + gather.level }}</text>
                        </view>
                        <view style="opacity: 0.59;"
                            :style="systemWidth >= 350 ? boxTagSystemWidth400 : boxTagSystemWidth300">
                            <text>{{ gather.job }}</text>
                        </view>
                    </view>

                </view>
                <view style="height: 100%; opacity: 0.41;"
                    :style="{ backgroundColor: (gather.isAppear ? '#FFFFFF' : '#000000') }">
                </view>
                <view class="time-box">

                    <view style="height: 0; width: 0; position: relative; top: -5px;" v-if="gather.getIsCollect()">
                        <image src="@/static/collect-true-icon.png" mode="aspectFit" style="height: 20px; width: 20px;" />
                    </view>
                    <view style="height: 0px; width: 0px; position: relative; top: -5px;" v-else>
                        <image src="@/static/collect-false-icon.png" mode="aspectFit" style="height: 20px; width: 20px;" />
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
import { ref, type Ref, defineProps, onMounted, onBeforeUnmount, getCurrentInstance, onBeforeMount } from 'vue'
import { onLoad, onShow, onReady } from '@dcloudio/uni-app';
import type gatherDao from '@/common/js/dao/gatherDao'
import { useLocalTimeStore } from '@/stores/localTime';
import { useGatherArrayStore } from '@/stores/gatherArray';
import { isTemplateElement } from '@babel/types';

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
    id: number
}>()

const localTimeStore = useLocalTimeStore();

const gatherArrayStore = useGatherArrayStore();

const popup = ref(null)

const popupImageUrl = ref("");

const popupLocation = ref("");

const popupCoordinate: Ref<Map<string, number>> = ref(new Map);

const gather = searchGatherListById(props.id);

// 监听现实时间来计算倒计时
localTimeStore.$subscribe(() => {
    // gather.value = searchGatherListById(props.id)
    // 获取现实时间的毫秒数
    let nowTimeMillisecond = localTimeStore.nowTime?.getTime();
    // 获取采集物的endTime的毫秒数
    let endTimeMillisecond = gather.getDuration().getTime();

    if (endTimeMillisecond - nowTimeMillisecond! > 0) {
        // 计算时间
        let duration = new Date(new Date().setTime(endTimeMillisecond - nowTimeMillisecond!))
        console.log(endTimeMillisecond - nowTimeMillisecond!)
        mm.value = duration.getMinutes();
        ss.value = duration.getSeconds();
    } else {
        // 将倒计时清零
        deleteGatherDuartion(props.id)
        console.log("zoule:",gatherArrayStore.gatherList)
        mm.value = 0;
        ss.value = 0;
    }


})

// 根据id从采集数组里获取指定采集物的结束时间
function searchGatherListById(id: number): gatherDao {

    let gather;

    gatherArrayStore.gatherList?.forEach((item, index) => {
        if (item.getId() == props.id) {
            gather = item;
        }
    })
    return gather;
}

function deleteGatherDuartion(id: number) {
    gatherArrayStore.gatherList?.forEach((item, index) => {
        if (item.getId() == props.id) {
            item.setDuration(undefined);
        }
    })
}


const mm = ref(0);
const ss = ref(0);


const collect = ref(false);

function longPress() {
    let list = uni.getStorageSync("gatherCollectList")
    // 循环数组 修改收藏变量
    gatherArrayStore.gatherList?.forEach((item)=>{
        // debugger;
        if (item.getId() == props.id) {
            item.setIsCollect(!item.getIsCollect());
            if (item.getIsCollect()) {
                if (list == '') {
                    uni.setStorageSync("gatherCollectList",[props.id]);
                } else {
                    list.push(props.id)
                    uni.setStorageSync("gatherCollectList", list);
                }
            } else {
                if (list != '') {
                    list.forEach((item, index) => {
                        if( list[index] == props.id) {
                            list.splice(index,1);
                        }
                    });
                    uni.setStorageSync("gatherCollectList", list)
                }
            }
        }
    })

    collect.value = !collect.value
}




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
    height: 100%;
    width: 100%;
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
    height: 100%;
    width: 100%;
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