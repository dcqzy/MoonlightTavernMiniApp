<template>
  <view class="main">
    <nav-bar :isRedirect="true" :propPlaceholder="navBarInputMsg" :searchContent="'checkPrice'"/>
    <scrollView/>
    <tab-bar :selectedIndex="2"/>
  </view>
    
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { } from '@dcloudio/uni-app'
// import navBar from '@/components/nav-bar/nav-bar.vue'
import scrollView from './components/scroll-view-component/scrollViewComponent.vue'
// import tabBar from '@/components/tabbar/tabBar.vue'

let height = uni.getSystemInfoSync().safeAreaInsets?.bottom + 'px'
let navBarInputMsg = ref("全服价格查询")

</script>

<style>
.main {
  height: 100%;
  background-color: #ffffff;
}

</style>
