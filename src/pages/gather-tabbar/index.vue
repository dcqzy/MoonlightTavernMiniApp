<template>
  <view class="main">
    <!-- <gather-tabbar-title /> -->
    <nav-bar
      :isRedirect="true"
      :propPlaceholder="searchValue"
      :searchContent="'gather'"
    />
    <gather-tabbar-main />
    <tab-bar :selectedIndex="3" />
  </view>
</template>

<script setup lang="ts">
// import tabBar from '@/components/tabbar/tabBar.vue';
import { onMounted, ref } from "vue";
import { useUTCTimerStore } from "@/stores/timerStore";
import { onUnload } from "@dcloudio/uni-app";

const searchValue = ref("输入搜索采集物");

const TIME_OUT_INTERVAL = 300;

const timer = useUTCTimerStore();
const interval: any = null;

// 初始化页面时开始设置系统定时任务

onMounted(() => {
  setInterval(() => {
    timer.$patch({
      timer: new Date(),
    });
  }, TIME_OUT_INTERVAL);
});

// 页面注销时取消更新UTC_timer
onUnload(() => {
  clearInterval(interval);
});
</script>

<style >
.main {
  height: 100%;
}
</style>