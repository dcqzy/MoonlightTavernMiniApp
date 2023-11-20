import { defineStore } from 'pinia';
import { ref, type Ref } from 'vue';
import type gatherDao from '@/common/js/dao/gatherDao';

export const useGatherArrayStore = defineStore('gatherArray', ()=>{
    const showIndex = ref(0);

    const collectDataFalse:Ref<gatherDao[]> = ref([])

    const dataFalse2:Ref<gatherDao[]> = ref([])

    const dataFalse3:Ref<gatherDao[]> = ref([])

    const dataFalse4:Ref<gatherDao[]> = ref([])

    const dataFalse5:Ref<gatherDao[]> = ref([])

    const dataFalse6:Ref<gatherDao[]> = ref([])

    const collectDataTrue:Ref<gatherDao[]> = ref([])

    const dataTrue2:Ref<gatherDao[]> = ref([])

    const dataTrue3:Ref<gatherDao[]> = ref([])

    const dataTrue4:Ref<gatherDao[]> = ref([])

    const dataTrue5:Ref<gatherDao[]> = ref([])

    const dataTrue6:Ref<gatherDao[]> = ref([])

    function setShowIndex(index:number) {
        showIndex.value = index
    }

    function setDataTrue2(data:gatherDao[]) {
        dataTrue2.value = data
    }

    function setDataFalse2(data:gatherDao[]) {
        dataFalse2.value = data
    }
    
    function setDataTrue3(data:gatherDao[]) {
        dataTrue3.value = data
    }

    function setDataFalse3(data:gatherDao[]) {
        dataFalse3.value = data
    }

    function setDataTrue4(data:gatherDao[]) {
        dataTrue4.value = data
    }

    function setDataFalse4(data:gatherDao[]) {
        dataFalse4.value = data
    }

    function setDataTrue5(data:gatherDao[]) {
        dataTrue5.value = data
    }

    function setDataFalse5(data:gatherDao[]) {
        dataFalse5.value = data
    }

    function setDataTrue6(data:gatherDao[]) {
        dataTrue6.value = data
    }

    function setDataFalse6(data:gatherDao[]) {
        dataFalse6.value = data
    }

    function setCollectDataTrue(data:gatherDao[]) {
        collectDataTrue.value = data
    }

    function setCollectDataFalse(data:gatherDao[]) {
        collectDataFalse.value = data
    }

    function getShowIndex():number {
        return showIndex.value
    }

    function getDataTrue2():gatherDao[] {
        return dataTrue2.value
    }

    function getDataFalse2():gatherDao[] {
        return dataFalse2.value
    }

    function getDataTrue3():gatherDao[] {
        return dataTrue3.value
    }

    function getDataFalse3():gatherDao[] {
        return dataFalse3.value
    }

    function getDataTrue4():gatherDao[] {
        return dataTrue4.value
    }

    function getDataFalse4():gatherDao[] {
        return dataFalse4.value
    }

    function getDataTrue5():gatherDao[] {
        return dataTrue5.value
    }

    function getDataFalse5():gatherDao[] {
        return dataFalse5.value
    }

    function getDataTrue6():gatherDao[] {
        return dataTrue6.value
    }

    function getDataFalse6():gatherDao[] {
        return dataFalse6.value
    }

    function getCollectDataTrue():gatherDao[] {
        return collectDataTrue.value
    }

    function getCollectDataFalse():gatherDao[] {
        return collectDataFalse.value
    }

    // 根据版本号存储单个数据
    function addArray(version:string, isShow:number, gatherDao:gatherDao) {
        if (isShow) {
            switch(version) {
                case "1.0": 
                    collectDataTrue.value.unshift(gatherDao)
                    break;
                case "2.0":
                    dataTrue2.value.unshift(gatherDao)
                    break;
                case "3.0":
                    dataTrue3.value.unshift(gatherDao)
                    break;
                case "4.0" :
                    dataTrue4.value.unshift(gatherDao)
                    break;
                case "5.0" :
                    dataTrue5.value.unshift(gatherDao)
                    break;
                case "6.0":
                    dataTrue6.value.unshift(gatherDao)
                    break;
            }
        } else {
            switch(version) {
                case "1.0": 
                    collectDataFalse.value.push(gatherDao)
                    break;
                case "2.0":
                    dataFalse2.value.push(gatherDao)
                    break;
                case "3.0":
                    dataFalse3.value.push(gatherDao)
                    break;
                case "4.0" :
                    dataFalse4.value.push(gatherDao)
                    break;
                case "5.0" :
                    dataFalse5.value.push(gatherDao)
                    break;
                case "6.0":
                    dataFalse6.value.push(gatherDao)
                    break;
            }
        }
    }

    function deleteArray(version:string, isShow:number, index:number) {
        if (isShow) {
            switch(version) {
                case "1.0": 
                    collectDataTrue.value.splice(index,1)
                    break;
                case "2.0":
                    dataTrue2.value.splice(index,1)
                    break;
                case "3.0":
                    dataTrue3.value.splice(index,1)
                    break;
                case "4.0" :
                    dataTrue4.value.splice(index,1)
                    break;
                case "5.0" :
                    dataTrue5.value.splice(index,1)
                    break;
                case "6.0":
                    dataTrue6.value.splice(index,1)
                    break;
            }
        } else {
            switch(version) {
                case "1.0": 
                    collectDataFalse.value.splice(index,1)
                    break;
                case "2.0":
                    dataFalse2.value.splice(index,1)
                    break;
                case "3.0":
                    dataFalse3.value.splice(index,1)
                    break;
                case "4.0" :
                    dataFalse4.value.splice(index,1)
                    break;
                case "5.0" :
                    dataFalse5.value.splice(index,1)
                    break;
                case "6.0":
                    dataFalse6.value.splice(index,1)
                    break;
            }
        }
    }

    return {
        // 获取收藏已出现数据
        getCollectDataTrue,
        // 获取收藏未出现数据
        getCollectDataFalse,
        // 获取2.0版本已出现数据
        getDataTrue2,
        // 获取2.0版本未出现数据
        getDataFalse2,
        // 获取3.0版本已出现数据
        getDataTrue3,
        // 获取3.0版本未出现数据
        getDataFalse3,
        // 获取4.0版本已出现数据
        getDataTrue4,
        // 获取4.0版本未出现数据
        getDataFalse4,
        // 获取5.0版本已出现数据
        getDataTrue5,
        // 获取5.0版本未出现数据
        getDataFalse5,
        // 获取6.0版本已出现数据
        getDataTrue6,
        // 获取6.0版本未出现数据
        getDataFalse6,
        // 获取当前选择的版本数组索引
        getShowIndex,

        // 存储收藏已出现数据
        setCollectDataTrue,
        // 存储收藏未出现数据
        setCollectDataFalse,
        // 存储2.0版本已出现数据
        setDataTrue2,
        // 存储2.0版本未出现数据
        setDataFalse2,
        // 存储3.0版本已出现数据
        setDataTrue3,
        // 存储3.0版本未出现数据
        setDataFalse3,
        // 存储4.0版本已出现数据
        setDataTrue4,
        // 存储4.0版本未出现数据
        setDataFalse4,
        // 存储5.0版本已出现数据
        setDataTrue5,
        // 存储5.0版本未出现数据
        setDataFalse5,
        // 存储6.0版本已出现数据
        setDataTrue6,
        // 存储6.0版本未出现数据
        setDataFalse6,
        // 存储选择的版本索引
        setShowIndex,


        // 指定版本 指定是否出现 追加数组元素
        addArray,

        // 指定版本 指定是否出现 删除数组元素
        deleteArray,
    }
})