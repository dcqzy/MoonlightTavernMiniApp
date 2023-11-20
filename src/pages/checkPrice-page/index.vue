<template>
    <view class="main">
        <nav-bar :isRedirect="false" :propPlaceholder="searchValue" :searchContent="'checkPrice'" />
        <checkPrice-main />
        <checkPrice-tabbar />
    </view>
</template>

<script setup lang="ts">
    import { onLoad } from '@dcloudio/uni-app'
    import {ref} from 'vue'
    import {useSearchValueStore} from '@/stores/searchValue'

    let searchValue = ref("");

    onLoad(()=>{
        searchValue.value = useSearchValueStore().getCheckPriceValue().value;
        // getHttpCheckPriceData();
    })

</script>

<style >
    .main {
        height: 100%;
    }
   
</style>