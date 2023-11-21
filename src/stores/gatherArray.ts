import { defineStore } from 'pinia';
import { ref, type Ref } from 'vue';
import type gatherDao from '@/common/js/dao/gatherDao';

export const useGatherArrayStore = defineStore('gatherArray', ()=>{
    const showIndex = ref<number>(0);

    const collectData = ref<gatherDao[]>()

    const gatherList = ref<gatherDao[]>()

    function setGatherList(data:gatherDao[]) {
        gatherList.value = data;
    }

    function setShowIndex(index:number) {
        showIndex.value = index
    }


    function getShowIndex():number {
        return showIndex.value
    }


    return {
        gatherList,
        setGatherList,

        // 获取当前选择的版本数组索引
        getShowIndex,

        // 存储选择的版本索引
        setShowIndex,
    }
})