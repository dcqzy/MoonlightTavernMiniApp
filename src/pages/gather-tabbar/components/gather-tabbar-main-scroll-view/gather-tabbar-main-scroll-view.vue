<template>
  <view>现实时间:{{ getHourMinuteToString(timer.timer) }}</view>
  <view
    >艾欧泽亚时间:{{ getHourMinuteToString(getEorzeaTime(timer.timer)) }}</view
  >

  <scroll-view
    class="main"
    scroll-y
    :style="{ height: 0 + 'px' }"
    v-if="useGatherArrayStore().getShowIndex() == 0"
  >
    <!-- <view v-for="(item, index) in trueArray" :key="index" style="padding: 5px 10px;" v-if="trueArray.length != 0">
            <gather-tabbar-main-box :value="item.getDuration()" :data="item" v-if="item.getIsAppear()"/>
        </view> -->
    <!-- <view
      v-for="(item, index) in falseArray"
      :key="index"
      style="padding: 5px 10px"
    >
      <gather-tabbar-main-box :value="item.getDuration()" :data="item" />
    </view> -->
  </scroll-view>
</template>

<script setup lang="ts">
import type gatherDao from "@/common/js/dao/gatherDao";
import { useGatherArrayStore } from "@/stores/gatherArray";
import { useUTCTimerStore } from "@/stores/timerStore";
import { ref, defineProps, onBeforeUnmount, onMounted } from "vue";
import { getHourMinuteToString, getEorzeaTime } from "@/utils/timeConvert";
const timer = useUTCTimerStore();
</script>

<style ></style>