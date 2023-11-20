<template>
    <view class="swiperImageView">
        <swiper
            class="ImageView"
            indicator-dots
            autoplay
            circular
            :indicator-active-color="'#ffffff'"
        >
            <swiper-item v-for="item, index in images" :key="index" class="ImageView">
                <image
                    :src="item"
                    mode="aspectFill"
                />
            </swiper-item>
        </swiper>
    </view>

    
</template>

<script setup lang="ts">

   let images:String[] = [
		"/static/image/1.jpg",
		"/static/image/2.jpg",
		"/static/image/3.jpg"
	]
</script>

<style >
 .swiperImageView {
    height: 200px;
    /* border-radius: 20px; */
    box-shadow: 0px 1px 5px #04000080;
    overflow: hidden;
	}
	.ImageView {
		height: 100%;
        /* border-radius: 20px; */
        overflow: hidden;
	}
	image {
		height: 100%;
        width: 100%;
	}
</style>