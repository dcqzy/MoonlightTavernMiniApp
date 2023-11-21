import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useLocalTimeStore = defineStore('localTime',()=>{
    const nowTime = ref<Date>();

    // 更新时间
    function setNowTime(date:Date) {
        nowTime.value = date;
    }

    // 获取et_time的时间戳
    const getETTime = computed(()=>{
        let et_time:number = 20.57
        return new Date(new Date().setTime(Math.floor(nowTime.value!.getTime() * et_time)))
    })

    const getNowTime = computed(()=>{
        return nowTime.value!.getTime()
    })

    return {
        nowTime,
        setNowTime,
        getETTime,
        getNowTime,
    }
})