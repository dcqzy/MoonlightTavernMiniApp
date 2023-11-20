<template>
    <view class="main">
    <!-- <gather-tabbar-title /> -->
    <nav-bar :isRedirect="true" :propPlaceholder="searchValue" :searchContent="'gather'" />
    <gather-tabbar-main />
    <tab-bar :selectedIndex="3"/>
    </view>
    
</template>

<script setup lang="ts">
    // import tabBar from '@/components/tabbar/tabBar.vue';

    import { ref } from 'vue';

    const searchValue = ref("输入搜索采集物")

</script>

<style >
    .main {
        height: 100%;
    }
</style>