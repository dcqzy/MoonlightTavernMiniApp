<template>
    <view class="main">
    <view :style="{height:autoTopHeight}"></view>
    <view :style="{height:autoViewHeight}"></view>
    <tab-bar :selectedIndex="1"/>
    </view>
    
</template>

<script setup lang="ts">
    // import tabBar from '@/components/tabbar/tabBar.vue';
    const systemInfo = uni.getSystemInfoSync();
    let autoTopHeight = systemInfo.safeAreaInsets?.top! + 50 + 'px'
    let autoViewHeight = systemInfo.safeArea?.height! - 100 + 'px'

</script>

<style >
    
</style>