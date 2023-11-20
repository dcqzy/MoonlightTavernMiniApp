<template>
    <view class="toolsView">
        <view class="toolTitle">
            <view style="height: 16px; width: 5px; margin-right: 5px; background-color: #476FB5;"></view>
            <text style="font-size: small; color: #476FB5;">小工具</text>
        </view>
        <view class="item" v-for="(value, key) in gongjuMap" :key="key">
            <image
                :src="value[1]"
                mode="aspectFit"
            />
            <text>{{value[0]}}</text>
        </view>
    </view>
</template>

<script setup lang="ts">

    let gongjuMap:Map<String, String> = new Map([
        ["金蝶暖暖", "/static/gongju-image/NuanNuan.png"],
        ["渔场列表", "/static/gongju-image/YuChang.png"],
        ["背景故事", "/static/gongju-image/BeiJing.png"],
        ["青魔法书", "/static/gongju-image/QingMo.png"],
        ["天气预报", "/static/gongju-image/TianQi.png"],
        ["风脉泉","/static/gongju-image/FengMai.png"],
        ["服务器状态","/static/gongju-image/FuWuQi.png"],
        ["市价查询","/static/gongju-image/ShiJia.png"]
    ])

    console.log(gongjuMap)
    

</script>

<style>
.toolsView {
    display: grid;
    grid-template-columns: repeat(4, minmax(50px,1fr));
    gap: 5px;
    height: 200px;
    width: 100%;
    background-color: #ffffff;
    border-radius: 15px;
    box-shadow: 0 2.5px 5px #04000080;
    overflow: hidden;
}
.item {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    height: 50px;
    /* margin: 10px 20px; */
    text-align: center;
}
.item image {
    height: 25px;
    width: 100%;
}
.item text {
    font-size: 9px; 
    height: 20px; 
    align-self: center; 
    width: 100%;
}
.toolTitle {
    /* margin-top: 5px; */
    padding-left: 10px;
    width: 100%;
    /* height: 20px; */
    display: flex;
    align-items: center;
    grid-column: 1/ -1;
}
   
</style>