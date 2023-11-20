<template>
    <view class="tabbar" :style="{ paddingBottom: bottom + 'px' }">
        <view style="height: 100%; display: grid; grid-template-columns: repeat(5,1fr); gap: 5px; margin: 0px 5px;">
            <view v-for="(item, index) in arr" :key="index" @click="swithcTab(index)" style="text-align: center;">
                <!-- <image
                    :src="item.selectedIconPath"
                    mode="aspectFit"
                    v-if="selectedIndex == index"
                    style="height: 50px; width: 50px;"
                /> -->
                <image :src="item.iconPath" mode="aspectFit" style="height: 40px; width: 100%;" />
                <!-- <view style="height: 40px; width: 100%; background-color: chartreuse;"></view> -->
                <view class="iconGuidepostStyle" :class="[selectedIndex == index ? '.selectedIconGuidepostStyle' : '']">
                </view>
            </view>
        </view>
    </view>
</template>
a
<script setup lang="ts">
import { ref, defineProps } from 'vue'
import { } from '@dcloudio/uni-app'

let systemInfo = uni.getSystemInfoSync();

let bottom = systemInfo.safeAreaInsets?.bottom

const props = defineProps<{
    selectedIndex: number
}>();

let arr = ref([
    {
        "pagePath": "pages/huanhua-tabbar/index",
        "iconPath": "/static/icon/icon-1.png",
        "text": "幻化"
    },
    {
        "pagePath": "pages/houses-tabbar/index",
        "iconPath": "/static/icon/icon-2.png",
        "text": "房屋"
    },
    {
        "pagePath": "pages/home-tabbar/index",
        "iconPath": "/static/icon/icon-3.png",
        "text": "首页"
    },
    {
        "pagePath": "pages/gather-tabbar/index",
        "iconPath": "/static/icon/icon-4.png",
        "text": "采集"
    },
    {
        "pagePath": "pages/fishCake-tabbar/index",
        "iconPath": "/static/icon/icon-5.png",
        "text": "鱼糕"
    },
])

function swithcTab(index: number) {
    console.log("点击跳转" + index + '/' + arr.value[index].pagePath)
    uni.switchTab({
        url: '/' + arr.value[index].pagePath
    })
}

</script>

<style >
.tabbar {
    height: 50px;
    box-shadow: 0px -2px 11px #04000026;
    /* background-color: aqua; */
}


.box {
    height: 100%;
}

.iconGuidepostStyle {
    height: 6px;
    width: 100%;
    /* margin: 2px 0px; */
    border-radius: 10px;
}

.selectedIconGuidepostStyle {
    background-color: #476FB5;
}
</style>