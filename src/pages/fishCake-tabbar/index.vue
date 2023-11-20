<template>
    <view class="main">
    <!-- <view :style="{height:autoTopHeight}"></view> -->
    <nav-bar :isRedirect="true" :propPlaceholder="searchValue" :searchContent="'fish'" />
    <view :style="{height:autoViewHeight}"></view>
    <tab-bar :selectedIndex="4"/>
    </view>
    
</template>

<script setup lang="ts">
import { ref } from 'vue';

    // import tabBar from '@/components/tabbar/tabBar.vue';
    
    const systemInfo = uni.getSystemInfoSync();
    let autoTopHeight = systemInfo.safeAreaInsets?.top! + 50 + 'px'
    let autoViewHeight = systemInfo.safeArea?.height! - 100 + 'px'
    const searchValue = ref("请输入")

</script>

<style >
    
</style>