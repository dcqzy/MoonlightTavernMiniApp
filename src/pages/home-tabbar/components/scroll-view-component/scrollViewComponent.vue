<template>
    <scroll-view
    class="scrollView" 
    scroll-y
    :enable-flex="true"
    :refresher-enabled="isRefresher"
    :refresher-triggered="triggered"
    @refresherpulling="onPulling"
    @refresherrefresh="onRefresh"
    @refresherrestore="onRestore"
    @refresherabort="onAbort"
    @scrolltoupper="scrolltoupper"
    :style="{ height:autoHeight }">
    <view style="height: 10px;"></view>
    <view class="swiperImage">
        <swiperImage />
    </view>
    <view class="toolsView">
        <toolsView/>
    </view>
      
    <view class="fflogs">
        <fflogsSearch/>
    </view>

    <!-- <view class="videoView">
        <videoView :loading="videoLoading"/>
    </view> -->

    <!-- <view class="TimeLimitedAcquisition" >
        <gatherView />
    </view> -->
    </scroll-view>    
</template>

<script setup lang="ts">
    import { ref, onMounted, onBeforeUnmount } from 'vue'
    import {onLoad, } from "@dcloudio/uni-app"
    import swiperImage from '../swiper-component/swiperComponent.vue';
    import toolsView from '../tools-component/toolsComponent.vue';
    import fflogsSearch from '../fflogs-search-component/fflogsSearchComponent.vue'
    // import videoView from '../video-component/videoComponent.vue'
    import gatherView from '../gather-component/gatherComponent.vue'
    import type { Ref } from 'vue';
    import { httpGatherArray } from '@/common/js/api/httpGatherArray';
    import { useGatherArrayStore } from '@/stores/gatherArray'

    
    // console.log("竖屏高度" + (uni.getSystemInfoSync().safeArea?.height - 100))
    // 获取设备高度 设备高度 - (顶部安全位置+navBar高度) - 底部tabbar高度
    const systemInfo = uni.getSystemInfoSync();
    const tabbarHeight = (systemInfo.screenHeight - systemInfo.windowHeight - systemInfo.statusBarHeight!) * systemInfo.pixelRatio
    const autoHeight = ref((systemInfo.safeArea?.height! - 100 )  + 'px');
    console.log("顶部高度:", 50+systemInfo.safeAreaInsets?.top!)

    let triggered:Ref<boolean> = ref(false);

    let _freshing:Ref<boolean> = ref(true);

    let isAllowRefresh:Ref<boolean> = ref(false);

    let isRefresher:Ref<boolean> = ref(true);

    let videoLoading:Ref<boolean> = ref(true);


    console.log("isRefresher",isRefresher);

    let itiem:number = 0;
    const msg:Ref<number> = ref(0);

    async function getHttpData() {
        console.log("触发了http服务")
        try{
            const gatherData:any = await httpGatherArray("meadow")
            forHttpGatherData(gatherData.json)
            // console.log("http请求成功的data数据：", gatherData);
        } catch(e) {
            console.log("请求失败 error：", e);
        }
    }

    // 遍历httpdata 
    function forHttpGatherData(data:any) {
        for (let i = 0; i < data.length; i++) {
            useGatherArrayStore().switchSetData(data[i]);
        }
    }

    onLoad(()=> {
        getHttpData();
    })

    onMounted(() => {
    })

    onBeforeUnmount(()=>{
        
    })

    // 下拉时触发
    function onPulling(e:any) {
       

        if (e.detail.dy < 45) {
            return;
        }
        // if (!isAllowRefresh) {return;}
         console.log("onPulling", e);
        _freshing.value = false;
        triggered.value = true;
    }
    // 刷新时触发
    function onRefresh() {
        console.log("onRefresh触发了")
        if (_freshing.value) {
            return;
        }    
        _freshing.value = true;

        // 刷新数据 清除定时器
        clearInterval(itiem);
        videoLoading.value = !videoLoading.value;
        setTimeout(() => {
            _freshing.value = false;
            triggered.value = false;
        }, 2000);
    }  
    // 下拉被中断
    function onAbort() {
        console.log("下拉被中断");
    } 
    // 下拉复位
    function onRestore() {
        triggered.value = false;
        console.log("下拉被复位");
    }
    function scrolltoupper() {
        console.log("滑到顶了")
        isAllowRefresh.value = true;
    }



</script>

<style>
.scrollView{
    display: flex;
    flex-direction: column;
}
.swiperImage {
    height: 200px;
    opacity: 1;
    /* padding: 10px; */
    margin: 0 0px 5px 0px;
    border-radius: 20px;
    /* box-shadow: 0 2.5px 5px #04000080; */
    flex-grow: 0;
  /* background-color: #ffffff; */
}
.toolsView {
    margin: 2px 10px;
    padding: 5px;
    flex-grow: 0;
}
.fflogs {
    height: 50px;
    padding: 5px;
    margin: 2px 10px;
    flex-grow: 0;
}
.videoView {
    height: 150px;
    margin: 10px 15px;
}
.TimeLimitedAcquisition {
    height: 300px;
    margin-top: 10px;
    margin-bottom: 10px;
    /* background-color: #FFFFFF; */
    flex-grow: 1;
}

</style>