<template>
    {{ value }}
</template>

<script setup lang="ts">
    import { onLoad } from '@dcloudio/uni-app'
    import {ref} from 'vue'


    let value = ref('');


    onLoad((options)=>{
        console.log("接收值",options);
        value.value = options!.msg;
        console.log(value.value);
    })

    
</script>

<style >
    
</style>