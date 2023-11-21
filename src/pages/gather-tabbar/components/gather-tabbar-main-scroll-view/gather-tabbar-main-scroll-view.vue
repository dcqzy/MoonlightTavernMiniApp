<template>
    <scroll-view class="main" scroll-y :style="{ height: height + 'px' }">
        <view>{{ localTimeStore.nowTime + ' : ' + localTimeStore.getETTime }}</view>
        <view v-for="(item, index) in gatherListSortAfter" :key="index" style="padding: 5px 10px;">
            <gather-tabbar-main-box :id="item.getId()" :key="index" />
        </view>
        <!-- <view v-for="(item, index) in falseArray" :key="index" style="padding: 5px 10px;">
            <gather-tabbar-main-box :value="item.getDuration()" :data="item" />
        </view> -->
    </scroll-view>
</template>

<script setup lang="ts">
import type gatherDao from '@/common/js/dao/gatherDao';
import { useGatherArrayStore } from '@/stores/gatherArray';
import { useLocalTimeStore } from '@/stores/localTime';
import { ref, defineProps, onBeforeUnmount, onMounted, watch, computed } from 'vue'

const localTimeStore = useLocalTimeStore();

const gatherArrayStore = useGatherArrayStore();

// 存储指定的版本的gather数组
const gatherVersionList = ref<gatherDao[]>([]);

const prop = defineProps<{
    version: number
    height: number
}>()

const gatherListSortAfter = computed(() => {
    return gatherVersionList.value.sort(gatherListSort)
});

localTimeStore.$subscribe(() => {
    // console.log("gatherList:", gatherArrayStore.gatherList)
    let tempGatherList: gatherDao[] = [];

    if (prop.version == 1) { // 版本 1 代表着显示已收藏
        gatherArrayStore.gatherList!.forEach((item) =>{
            if (item.getIsCollect()) {
                tempGatherList.push(item);
            }
        })
    } else {
        // 筛选指定版本的gather对象
        gatherArrayStore.gatherList!.forEach((item, index) => {
            if (item.getVersion() == prop.version) {
                tempGatherList.push(item)
            }
        });
    }


    // tempGatherList.sort(gatherListSort)

    // 将数据临时数组的数据转移到正式数组
    gatherVersionList.value = tempGatherList;
    // 进行排序
    // gatherVersionList.value.sort(gatherListSort)
    // debugger;
    // console.log("触发sv：", gatherVersionList.value)
})

// 比较函数
const gatherListSort = function (obj1: gatherDao, obj2: gatherDao) {
    if (obj1.getDuration().getTime() < obj2.getDuration().getTime()) {
        return -1;
    } else if (obj1.getDuration().getTime() > obj2.getDuration().getTime()) {
        return 1;
    } else {
        return 0;
    }
}


</script>

<style></style>