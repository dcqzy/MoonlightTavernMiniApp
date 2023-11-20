import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useSearchValueStore = defineStore('searchValue', () => {

    const checkPriceValue = ref({
        imageId: 0,
        value: '',
        zone: '',
        lastUploadTime: 0
    }); // 查价搜索栏数据
    const fflogsValue = ref({
        name: '',
        raidName: '',
        server: ''
    }); // fflogs搜索栏数据

    // 传出查价搜索栏数据
    function getCheckPriceValue(): object {
        return checkPriceValue.value;
    }

    // 传出fflogs搜索栏数据
    function getFFLogsValue(): object {
        return fflogsValue.value;
    }

    function getCheckPriceName(): string {
        return checkPriceValue.value.value;
    }

    function getCheckPriceZone(): string {
        return checkPriceValue.value.zone;
    }

    function getCheckPriceTime(): string {
        let date = new Date(checkPriceValue.value.lastUploadTime);
        let day = '00';
        let month = '00';
        let hours = '00';
        let minutes = '00';
        let seconds = '00';
        console.log(date)
        if (date.getDate() < 10) {
            day = '0' + date.getDate();
        } else {
            day = date.getDate().toString();
        }

        if (date.getMonth() + 1 < 10) {
            month = '0' + date.getMonth() + 1
        } else {
            month = (date.getMonth() + 1).toString();
        }
        console.log(date.getHours())
        if (date.getHours() < 10) {
            hours = '0' + date.getHours();
        } else {
            hours = (date.getHours()).toString();
        }

        if (date.getMinutes() < 10) {
            minutes = '0' + date.getMinutes();
        } else {
            minutes = date.getMinutes().toString();
        }

        if (date.getSeconds() < 10) {
            seconds = '0' + date.getSeconds();
        } else {
            seconds = date.getSeconds().toString();
        }

        return month + '.' + day + ' ' + hours + ':' + minutes + ':' + seconds
    }

    function getCheckPriceImageId(): number {
        return checkPriceValue.value.imageId;
    }

    // 更新查价搜索栏数据
    function setCheckPriceValue(value: string, zone: string, lastUploadTime: number = 0, imageId: number = 0) {
        checkPriceValue.value = {
            imageId: imageId,
            value: value,
            zone: zone,
            lastUploadTime: lastUploadTime
        };
    }

    // 更新查价区域数据
    function setCheckPriceZone(zone: string) {
        checkPriceValue.value.zone = zone;
    }

    // 更新时间
    function setLastUploadTime(time: number) {
        checkPriceValue.value.lastUploadTime = time;
    }

    // 更新fflogs搜索栏数据
    function setfflogsValue(name: string, raidName: string, server: string) {
        fflogsValue.value = {
            name: name,
            raidName: raidName,
            server: server
        };
    }


    return {
        /**
         * 获取查价搜索栏数据
         */
        getCheckPriceValue,
        /**
         * 获取fflogs搜索栏数据
         */
        getFFLogsValue,
        /**
         * 更新查价搜索栏数据
         */
        setCheckPriceValue,
        /**
         * 获取查价数据的物品名
         */
        getCheckPriceName,
        /**
         * 获取查询时间
         */
        getCheckPriceTime,
        /**
         * 获取查询区域
         */
        getCheckPriceZone,
        /**
         * 更新查价数据内的区域信息
         */
        setCheckPriceZone,
        /**
         * 更新查询时间
         */
        setLastUploadTime,
        /**
         * 更新fflogs搜索栏数据
         */
        setfflogsValue
    }
});