<template>
    <view style="height: 50px; margin: 5px 30px; background-color: #476FB5; display: flex; flex-direction: row; flex-wrap: wrap; border-radius: 10px;">
    
    <image
    src="@/static/gather-test.png"
    mode="scaleToFill"
    style="width: 40px; height: 40px; margin: 5px; border-radius: 10px;"
/>

<view style="display:flex; flex-grow: 1; height: 100%; flex-direction: column; margin-left: 10px;">
    <view style="display: flex; align-items: center; flex-grow: 1; color: #ffffff;">
        <text>{{ name }}</text>
    </view>
    <view style="display: flex; flex-grow: 1;">
        <view style="align-self: flex-end; font-size: 10px; margin-bottom: 5px; color: #ffffff;">
            <text>{{ location }}</text>
        </view>
        <view style="margin-left: auto; margin-right: 20px; font-size: 15px; color: #ffffff;">
            <text>剩余时间:{{ (MM < 10 ? "0"+MM:MM) + ":" + (SS < 10 ? "0"+SS : SS) }}</text>
        </view>
    </view>
</view>
</view>
</template>

<script setup lang="ts">
    import { onMounted, onBeforeUnmount, defineProps, ref } from 'vue'

    const propsValue = defineProps<{
        value:number
        name:string
        location:string
        imageUrl:string
    }>();

    let timer:number = 0;
    let MM = ref(0);
    let SS = ref(0);

    onMounted( () => {
       // 解析倒计时
       let countDown = new Date(Math.floor((propsValue.value * 1000) / 20.57));
       MM.value = countDown.getUTCMinutes();
       SS.value = countDown.getUTCSeconds();
       timer = setInterval(()=>{
        if ( MM.value == 0) {
            if (SS.value > -1) {
                SS.value--;
            }
        }
         else if ( MM.value != 0) {
            if ( SS.value > -1) {
                SS.value--;
            }
            if (SS.value == -1) {
                MM.value--;
                SS.value = 59;
            }
        }
       },1000)
       
    })

    onBeforeUnmount(() => {
        clearInterval(timer);    
    })

</script>

<style >
    
</style>