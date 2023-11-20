<template>
	
	<view class="page">
		<view class="upper">
			<view class="logo">
				<image class="logoImg" src="/static/logo.svg" mode="" alt="image"></image>
			</view>
			<view class="logoTextCN">
				<p class="textCN">月光酒馆</p>
			</view>
			<view class="logoTextEN">
				<p class="textEN">Moonlight Tavern</p>
			</view>
			<p class="upperText">by : 幻影群岛六花花</p>
		</view>
		<view class="tail">
			疲惫的旅行者哟，欢迎来到月光酒馆
		</view>
	</view>
		
	
	
</template>

<script setup lang="ts">
	
</script>

<style>
	.upper{
		top: 0px;
		left: 0px;
		width: 100%;
		height: 70%;
		background: #476FB5 0% 0% no-repeat padding-box;
		opacity: 1;
	}
	.tail{
		top: 0px;
		left: 0px;
		width: 100%;
		height: 30%;
		background-color: #ffffff;
		color: #476FB5;
		text-align: center;
		font-size: 34rpx;
	}
	.page{
		height: 100%;
	}
	.logo{
		padding-top: 20%;
		padding-left: 27.5%;
		width: 45%;
		height: 34%;
		
		background: 0% 0% no-repeat padding-box;
		opacity: 1;
	}
	.logoImg{
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	.logoTextCN{
		width: 100%;
		height: 10%;
		margin: auto;
		position: relative;
	}
	.logoTextEN{
		width: 100%;
		height: 5%;
		margin: auto;
		position: relative;
	}
	.textCN,.textEN{
		position: absolute;
		top: 50%;
		left: 50%;
		margin: 0;
		transform: translate(-50%, -50%);
		color: #ffffff
	}
	.textCN {
		font-size: 60rpx;
	}
	.textEN {
		font-size: 40rpx;
	}
	.upperText {
		font-size: 14rpx;
		margin-top: 45%;
		text-align: center;
		color: #ffffff;
	}
</style>