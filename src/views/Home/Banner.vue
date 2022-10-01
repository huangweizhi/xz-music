<script setup>
import { ref, onBeforeMount } from 'vue'
import { getBanner } from "@/api"

onBeforeMount(() => {
	getBannerData()
})

/*
* 轮播图
*/
const banners = ref()
const getBannerData = async () => {
	const res = await getBanner()
	banners.value = res.banners
}
</script>

<template>
	<!-- 轮播图 -->
  <van-swipe :autoplay="3000" lazy-render indicator-color="#57BEAD">
		<van-swipe-item v-for="item in banners" :key="item.bannerId">
			<img :src="item.pic" />
		</van-swipe-item>
	</van-swipe>
</template>

<style lang="less" scoped>
.van-swipe {
	width: 100%;
	height: 2.9rem;
	border-radius: 0.1rem;
	overflow: hidden;
}
img {
	width: 100%;
	height: 2.9rem;
}
</style>
