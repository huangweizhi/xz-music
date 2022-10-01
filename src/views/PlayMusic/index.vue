<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const musicUrl = ref()
const route = useRoute()

musicUrl.value = `https://music.163.com/song/media/outer/url?id=${route.query.musicId}.mp3 `

</script>

<template>
  <audio autoplay :src="musicUrl" controls></audio>
</template>

<style>

</style>