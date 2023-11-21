<template>
  <view class="main">
    <!-- <view :style="{height:autoTopHeight}"></view> -->
    <nav-bar
      :isRedirect="true"
      :propPlaceholder="searchValue"
      :searchContent="'fish'"
    />
    <view :style="{ height: autoViewHeight }"></view>
    <view>现实时间:{{ getHourMinuteToString(timer.timer) }}</view>
    <view
      >艾欧泽亚时间:{{
        getHourMinuteToString(getEorzeaTime(timer.timer))
      }}</view
    >
    <tab-bar :selectedIndex="4" />
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";

// import tabBar from '@/components/tabbar/tabBar.vue';

const systemInfo = uni.getSystemInfoSync();
let autoTopHeight = systemInfo.safeAreaInsets?.top! + 50 + "px";
let autoViewHeight = systemInfo.safeArea?.height! - 100 + "px";
import { getHourMinuteToString, getEorzeaTime } from "@/utils/timeConvert";
import { useUTCTimerStore } from "@/stores/timerStore";
const searchValue = ref("请输入");

const timer = useUTCTimerStore();
</script>

<style >
</style>