<template>
    <view class="main" :style="{ paddingTop: autoHeight + 'px' }">
        <view style="height: 50px; background-color: #476FB5; display: flex; justify-content: center; align-items: center;">
            <text>采集</text>
        </view>
        <view class="select-box">
            <view class="button-box" @click="clickButton(index)" v-for="(item, index) in testArr" :key="index">
                <view class="button-box-text">
                    <text>{{ item.name }}</text>
                </view>

                <view class="button-box-tag" v-if="useGatherArrayStore().getShowIndex() == index"></view>
            </view>
        </view>
        <view class="gather-search">
            <view
                style="box-shadow: 2px 2px 5px #23181559; border-radius: 40px; background-color: #ffffff; height: 100%; width: 100%; display: flex; align-items: center;">
                <input class="searchInput" type="text" :placeholder="placeholder" placeholder-class="inputText"
                    confirm-type="search" v-model="inputValue" @input="searchInputEvent" @confirm="searchEnterEvent" />
                <view style="height: auto; width: 30px; text-align: center; margin-right: 10px; margin-left: 5px;">
                    <uni-icons type="clear" size="24" v-if="showClearIcon" @click="clearIcon"></uni-icons>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">

import { useGatherArrayStore } from '@/stores/gatherArray';
import { ref } from 'vue'

const systemInfo = uni.getSystemInfoSync();
const autoHeight = systemInfo.safeAreaInsets?.top

const testArr = ref([
    {
        name: "重生",
        isShow: true
    },
    {
        name: "苍灭",
        isShow: true
    },
    {
        name: "红莲",
        isShow: true
    },
    {
        name: "暗影",
        isShow: true
    }, {
        name: "晓月",
        isShow: true
    }
])

const inputValue = ref("")

const placeholder = ref("输入搜索")

const showClearIcon = ref(false)

function clickButton(index: number) {
    useGatherArrayStore().setShowIndex(index)
}

function searchInputEvent(e: any) {
    if (e.detail.value.length > 0) {
        showClearIcon.value = true;
    } else {
        showClearIcon.value = false;
    }
}

function searchEnterEvent(e: any) {

}

function clearIcon() {
    inputValue.value = '';
    showClearIcon.value = false;
}

</script>

<style >
.main {
    height: 140px;

}

.select-box {
    padding-left: 10px;
    padding-right: 10px;
    height: 50px;
    background-color: #FFFFFF;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 10px;
    box-shadow: 0px -2px 11px #04000026;
}

.button-box {
    /* margin-left: 5px;
    margin-right: 5px; */
    height: 100%;
    box-shadow: 1px 0px 10px #04000026;
}

.button-box:active {
    box-shadow: none;
    opacity: 0.4;
    transition: 0s;
}

.button-box-text {
    margin-top: 10px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
}

.button-box-tag {
    height: 5px;
    margin-top: 5px;
    background-color: #476FB5;
    border-radius: 10px;
}

.gather-search {
    height: 30px;
    padding-left: 10px;
    padding-right: 10px;
    display: flex;
    align-items: center;
    padding-top: 5px;
    padding-bottom: 5px;
    background-color: #FFFFFF;
}

.searchInput {
    margin-left: 15px;
    height: 100%;
    width: 60rem;
    font-size: small;
}

.inputText {
    font-size: small;
    color: #999999;
    opacity: 0.6;
}</style>