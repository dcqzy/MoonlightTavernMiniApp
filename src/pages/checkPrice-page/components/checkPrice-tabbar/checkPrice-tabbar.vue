<template>
    <view class="tabbar" :style="{ paddingBottom: bottom + 'px' }">
        <view class="box">
            <view style="height: 50px; width: 50px;">
                <image src="@/static/check-price-test-icon.png" mode="aspectFit" style="height: 100%; width: 100%;" />
            </view>
            <view style="display: grid; grid-template: 1fr;">
                <view style="height: 25px; display: grid; grid-template-columns: 70px 70px; gap: 5px;">
                    <button class="settingBottom" hover-class="isSettingBottom" @click="openSettingView">
                        {{ '设 置' }}
                    </button>
                    <button class="serverBottom">
                        {{ useSearchValueStore().getCheckPriceZone() }}</button>
                </view>
                <view style="height: 25px; display: grid; grid-template-columns: 1fr 100px;">
                    <view
                        style="font-size: 15px; height: 25px; color: #476FB5; display: flex; align-items: center; justify-content: flex-start;">
                        {{ useSearchValueStore().getCheckPriceName() }}
                    </view>
                    <view
                        style="height: 25px;display: flex; align-items: flex-end; justify-content: flex-start; margin-left: auto; font-size: 8px; opacity: 0.33;">
                        {{'更新时间：' + useSearchValueStore().getCheckPriceTime()}} </view>
                </view>

            </view>
        </view>
        <!-- 弹窗 -->
        <view>
            <uni-popup ref="popup" type="bottom" is-mask-click="true" safe-area="true">
                <view style="height: 300px; background-color: #ffffff;">
                    <picker-view :value="value" @change="bindChange" style="height: 200px; overflow: hidden;"
                        :indicator-style="indicatorStyle">
                        <picker-view-column>
                            <view class="item" v-for="(item, index) in servers" :key="index">
                                <view :class="value[0] == index ? 'indicatorStyle' : ''">{{ item }}</view>
                            </view>
                        </picker-view-column>
                    </picker-view>
                    <button class="selectBottom" @click="selectClick" hover-class="isSelectBottom">
                        <text>搜 索</text>
                    </button>
                </view>

            </uni-popup>
        </view>
    </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { } from '@dcloudio/uni-app';
import { useSearchValueStore } from '@/stores/searchValue';
import {httpSelectPriceApi, requstHttpCheckPriceData} from '@/common/js/api/httpSelectPriceApi'

const systemInfo = uni.getSystemInfoSync();

let bottom = ref(systemInfo.safeAreaInsets?.bottom);

const popup = ref(null);

const value = ref([0])

const indicatorStyle = ref(`height: 60px; `)

const servers = ref([
    "陆行鸟",
    "莫古力",
    "猫小胖",
    "豆豆柴"
])

const currentServer = ref("");

function openSettingView() {
    console.log("调用设置按钮点击事件")
    popup.value.open();
    currentServer.value = servers.value[value.value[0]];
}

function bindChange(e) {
    value.value = e.detail.value
    currentServer.value = servers.value[value.value[0]];
}


function selectClick() {
    // 向后端请求当前选择内容的数据
    // 更新pinia中的搜索数据
    useSearchValueStore().setCheckPriceZone(currentServer.value);
    // 请求数据
    requstHttpCheckPriceData();
    popup.value.close();
}

</script>

<style >
.tabbar {
    height: 70px;
    box-shadow: 0px -2px 11px #04000026;
    background-color: #FFFFFF;
}

.box {
    height: 50px;
    padding: 10px 20px 10px 20px;
    display: grid;
    grid-template-columns: 50px 1fr;
    gap: 10px;
}

.settingBottom {
    width: 100%;
    padding: 0px;
    font-size: 12px;
    color: #FFFFFF;
    background-color: #476FB5;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    margin-top: 2px;
    margin-bottom: 2px;
}

.isSettingBottom {
    width: 100%;
    padding: 0px;
    font-size: 12px;
    color: #FFFFFF;
    background-color: #476FB5;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    margin-top: 2px;
    margin-bottom: 2px;
    opacity: 0.8;
}

.serverBottom {
    width: 100%;
    padding: 0px;
    font-size: 12px;
    color: #476FB5;
    background-color: #FFFFFF;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    margin-top: 2px;
    margin-bottom: 2px;
    border: 1px solid #476FB5;
}

.item {
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 40px;
    text-align: center;
    font-size: 14px;
}

/deep/ .indicatorStyle {
    font-size: 20px;
}

.selectBottom {
    height: 50px;
    width: auto;
    margin-left: 20px;
    margin-right: 20px;
    margin-top: 25px;
    background-color: #476FB5;
    color: #ffffff;
    border-radius: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
}
.isSelectBottom {
    height: 50px;
    width: auto;
    margin-left: 20px;
    margin-right: 20px;
    margin-top: 25px;
    background-color: #476FB5;
    color: #ffffff;
    border-radius: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    opacity: 0.8;
}
</style>