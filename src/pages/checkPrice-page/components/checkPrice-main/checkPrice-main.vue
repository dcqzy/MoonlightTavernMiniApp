<template>
    <scroll-view class="main" scroll-y :style="{ height: autoHeight + 'px' }">

        <view class="box" v-for="(item, index) in usePriceArrayStore().getData()" :key="index">
            <view class="box-image-view ">
                <image src="@/static/gold-icon.png" mode="aspectFit" class="box-image-view-item" />
                <text style="font-size: 13px;" >{{item.getUnitPrice()}}</text>
            </view>
            <view class="box-price-view">
                <view class="item">
                    <text class="item-text">{{item.getServer()}}</text>
                </view>
                <view class="item" v-if="item.getIsHq()">
                                    <text class="item-text">HQ</text>
                </view>
                <view class="item">
                    <text class="item-text">{{ 'x' + item.getQuantity() }}</text>
                </view>
            </view>
            <view class=".date-issued-style">
                <text class="text">{{'上架时间' + item.getDateIssued()}}</text>
            </view>
            <view class="name-style">
                <text class="text">{{item.getName()}}</text>
            </view>
        </view>

    </scroll-view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { } from "@dcloudio/uni-app";
import priceDao from '@/common/js/dao/priceDao';
import { usePriceArrayStore } from '@/stores/priceArray';


const systemInfo = uni.getSystemInfoSync();

const autoHeight = ref(systemInfo.safeArea?.height! - 50 - 70);

// const arr = usePriceArrayStore().getData();

// const testArr = ref([
//     new priceDao("abaabababababababa ababababababababababa", 99990000000, 99, 1699843999000, 'Pandaemoniume', false),
//     new priceDao("abaabababababababa ababababababababababa", 99990000000, 66, 1699843999000, 'Pandaemoniume', false),
//     new priceDao("abaabababababababa ababababababababababa", 99990000000, 33, 1699843999000, 'Pandaemoniume', true),
//     new priceDao("abaabababababababa ababababababababababa", 99990000000, 22, 1699843999000, 'Pandaemoniume', true),
//     new priceDao("abaabababababababa ababababababababababa", 99990000000, 11, 1699843999000, 'Pandaemoniume', false),
//     new priceDao("abaabababababababa ababababababababababa", 99990000000, 1, 1699843999000, 'Pandaemoniume', true),
//     new priceDao("abaabababababababa ababababababababababa", 99990000000, 1, 1699843999000, 'Pandaemoniume', true),
//     new priceDao("abaabababababababa ababababababababababa", 99990000000, 1, 1699843999000, 'Pandaemoniume', true),
//     new priceDao("abaabababababababa ababababababababababa", 99990000000, 1, 1699843999000, 'Pandaemoniume', true),
//     new priceDao("abaabababababababa ababababababababababa", 99990000000, 1, 1699843999000, 'Pandaemoniume', true),
//     new priceDao("abaabababababababa ababababababababababa", 99990000000, 1, 1699843999000, 'Pandaemoniume', true),
//     new priceDao("abaabababababababa ababababababababababa", 99990000000, 1, 1699843999000, 'Pandaemoniume', true),
//     new priceDao("abaabababababababa ababababababababababa", 99990000000, 1, 1699843999000, 'Pandaemoniume', true),
//     new priceDao("abaabababababababa ababababababababababa", 99990000000, 1, 1699843999000, 'Pandaemoniume', true),
//     new priceDao("abaabababababababa ababababababababababa", 99990000000, 1, 1699843999000, 'Pandaemoniume', true),
//     new priceDao("abaabababababababa ababababababababababa", 99990000000, 1, 1699843999000, 'Pandaemoniume', true),
// ]);


</script>

<style >
.main {
    background-color: #FFFFFF;
}

.box {
    height: 60px;
    width: auto;
    margin-left: 20px;
    margin-right: 20px;
    padding-top: 20px;
    display: grid;
    grid-template-columns: 130px 1fr;
    border-bottom: 1px solid #CCCCCC;
}

.box-image-view {
    height: 30px;
    display: flex;
    flex-direction: row;
    align-items: center;
}

.box-image-view-item {
    height: 20px;
    width: 20px;
    margin-right: 10px;
}

.box-price-view {
    height: 30px;
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
}

.date-issued-style {
    height: 20px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
}

.name-style {
    height: 20px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
}

.text {
    font-size: 10px;
    opacity: 0.55;
    white-space: nowrap;
}

.item {
    margin-left: 5px;
    height: 30px;
    border: 1px solid #476FB5;
    white-space: nowrap;
    width: auto;
    font-size: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    color: #476FB5;
}

.item-text {
    margin-left: 10px;
    margin-right: 10px;
}</style>