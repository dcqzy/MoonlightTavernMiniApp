<template>
    <view class="videMain">
        <view class="videoScrollViewTitle">
            <view style="height: 16px; width: 5px; margin-right: 5px; background-color: #476FB5; "></view>
            <text style="font-size: small; color: #476FB5; height: 20px;">视频推荐</text>
        </view>
        <scroll-view scroll-x class="videoScrollView" v-if="loading == true">
            <view class="demoItem">
                    <image
                    src="@/static/video-test-cover.png"
                    mode="aspectFill"
                    class="videoImage"
                />
                <text class="videoTitle">【FF14】6.4攻略 万魔殿零式 荒天之狱1 苦茶子攻略 P9S差差差</text>
            </view>
            <view class="demoItem">
                <image
                    src="@/static/video-test-cover.png"
                    mode="aspectFill"
                    class="videoImage"
                />
                <text class="videoTitle">{{msg1}}</text>
            </view>
            <view class="demoItem">
                <image
                    src="@/static/video-test-cover.png"
                    mode="aspectFill"
                    class="videoImage"
                />
                <text class="videoTitle">{{ msg2 }}</text>
            </view>
            <view class="demoItem">
                <image
                    src="@/static/video-test-cover.png"
                    mode="aspectFill"
                    class="videoImage"
                />
                <text class="videoTitle">{{ msg3 }}</text>
            </view>
        </scroll-view>
    </view>
    
</template>

<script setup lang="ts">
    import { ref, type Ref } from 'vue' 

    // let loading:Ref<boolean> = ref(false);

    let videoTitle:String = "【FF14】6.4攻略 万魔殿零式 荒天之狱1 苦茶子攻略 P9S凑字数"
    console.log(videoTitle.length)

    let msg1 = ref(getRandomNum(10,5))
    let msg2 = ref(getRandomNum(20,10))
    let msg3 = ref(getRandomNum(25,15))
    
    function getRandomNum(max:number,min:number) :number {
        let range = max - min;
        let rand = Math.random();
        return (min + Math.round(rand * range));
    }

    defineProps<{
        loading?:boolean
    }>()

</script>

<style>
.videMain {
    height: 100%;
    display: flex;
    flex-direction: column;
}
.videoScrollView {
    white-space: nowrap; 
    overflow: hidden;
    margin: 0px 15px;
    width: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
}
.demoItem {
    display: inline-flex;
    flex-direction: column;
    width: 100px;
    margin: 0px 10px;
    /* height: 200px; */
    background-color: white;
    height: 100%;
    
}
.videoScrollViewTitle {
    padding-left: 10px;
    height: 20px;
    display: flex;
    align-items: center;
}
.videoImage {
    height: 80px;
    border-radius: 15px;
}
.videoTitle {
    display: inline-block;
    white-space: pre-wrap;
    word-wrap: break-word;
    height: auto;
    font-size: 10px;
    color: #666666;
} 
 
</style>