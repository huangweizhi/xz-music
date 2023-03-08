<script setup>
import { toRefs, onMounted, ref } from 'vue'
import { useUserStore, useMusicStore } from '@/stores'
import { logout, loginStatus, getUserPlaylist, createPlaylist, deletePlaylist, subscribePlaylist } from '@/api/user'
import { Dialog, Toast } from 'vant'
import PlaylistList from '@/components/PlaylistList.vue'

const userStore = useUserStore()
const musicStore = useMusicStore()

const { user } = toRefs(userStore)

/**
 * 退出登陆
 */
const doLogout = () => {
  Dialog.confirm({
    title: '退出登录',
    message:
      '退出登录后，将同时为您删除本地缓存，确定继续吗？',
  })
    .then(async () => {
      // on confirm
      const res = await logout()
      if(res.code !== 200) return
      userStore.removeUser()
      musicStore.removePlaying()
    })
    .catch(() => {
      // on cancel
    });
}

/**
 * 检查登录状态
 */
const getLoginStatus = async () => {
  const res = await loginStatus()
  if(res.code !== 200) return 
  // 已登录
  if(res.profile) return
  // 没有登录
  if(user.value.profile) {
    userStore.removeUser()
  }
}

/**
 * 获取用户歌单(喜欢、创建、收藏)
 */
const likelist = ref([])
const createlist = ref([])
const collectlist = ref([])
const getUserPlaylistData = async () => {
  const res = await getUserPlaylist(user.value.account.id)
  if(res.code !== 200) return
  likelist.value = res.playlist.slice(0, 1)
  createlist.value = res.playlist.slice(1).filter(item => {
    return user.value.profile.userId === item.creator.userId
  })
  collectlist.value = res.playlist.slice(1).filter(item => {
    return user.value.profile.userId !== item.creator.userId
  })
}

/**
 * 新建歌单
 */
const showAdd = ref(false)
const playlistName = ref('')
const playlistType = ref(false)
const playlistPrivacy = ref(false)
const clickAdd = () => {
  showAdd.value = true
}
const finishC = async () => {
  if(!playlistName.value.trim()) {
    return Toast('请输入歌单标题')
  } 
  const type = playlistType.value ? 'SHARED' : 'NORMAL'
  const privacy = playlistType.value ? '10' : false
  const res = await createPlaylist(playlistName.value, type, privacy)
  if(res.code !== 200) return Toast(res.message)
  Toast('新建歌单成功')
  showAdd.value = false
  // 刷新数据
  getUserPlaylistData()
}

/**
 * 删除歌单
 */
const clickDelete = ({item, index}) => {
  // 删除歌单
  if(item.creator.userId === user.value.profile.userId) {
    doDeletePlaylist(item.id, index)
  }
  // 取消收藏歌单
  else {
    doSubscribePlaylist(item.id, index)
  }
}
// 删除歌单
const doDeletePlaylist = async (id, index) =>{
  const res = await deletePlaylist(id)
  if(res.code !== 200) return Toast(res.message)
  Toast('删除歌单成功')
  // 刷新数据
  // getUserPlaylistData()
  createlist.value.splice(index, 1)
}
// 取消收藏歌单
const doSubscribePlaylist = async (id, index) =>{
  const res = await subscribePlaylist(id, 2)
  if(res.code !== 200) return Toast(res.message)
  Toast('取消收藏歌单成功')
  // 刷新数据
  // getUserPlaylistData()
  collectlist.value.splice(index, 1)
}

/**
 * 点击更多(创建、收藏)
 */
const showCollect = ref(false)
const showCreate = ref(false)
const clickMore = (type) => {
  if(type === 'create') {
    showCreate.value = true
  }
  if(type === 'collect') {
    showCollect.value = true
  }
}

/**
 * 点击弹出层选项
 */
 const clickAddCell = () => {
  showCreate.value = false
  showAdd.value = true
}
const clickManagerCell = (type) => {
  if(type === 'create') {
    showCreate.value = false
    showManagerCreate.value = true
  }
  if(type === 'collect') {
    showCollect.value = false
    showManagerCollect.value = true
  }
}

/**
 * 管理歌单(创建、收藏)
 */
const showManagerCollect = ref(false)
const showManagerCreate = ref(false)
const finishM = (type) => {
  if(type === 'create') {
    showManagerCreate.value = false
  }
  if(type === 'collect') {
    showManagerCollect.value = false
  }
}

// 下拉刷新
const betterScroll = ref(null)
const pullingDown = async () => {
  await getUserPlaylistData()
  betterScroll.value.refresh()
  betterScroll.value.finishPullDown()
}

onMounted(()=> {
  getLoginStatus()
  getUserPlaylistData()
})

</script>

<template>
  <BetterScroll class="better-scroll" :usePullDown="true" @pullingDown="pullingDown" ref="betterScroll">
    <!-- 用户信息 -->
    <div class="user-info">
      <div class="content" v-if="user && user.profile">
        <van-image
          round
          width="1.6rem"
          height="1.6rem"
          :src="user.profile.avatarUrl"
        />
        <div class="name">
          <h3>{{user.profile.nickname}}</h3>
        </div>
      </div>

      <div class="logout" @click="doLogout">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-logout"></use>
        </svg>
      </div>
    </div>

    <!-- 用户歌单 -->
    <PlaylistList class="playlist" :data="likelist" />
    <PlaylistList class="playlist" :data="createlist" title="创建歌单" :tool="{'add': true}" 
      @clickAdd="clickAdd" @clickMore="clickMore('create')" @clickDelete="clickDelete" />
    <PlaylistList class="playlist" :data="collectlist" title="收藏歌单" :tool="{'add': false}" 
      @clickMore="clickMore('collect')" @clickDelete="clickDelete" />
  </BetterScroll>

  <!-- 创建歌单 -->
  <van-popup
    v-model:show="showCreate"
    round
    position="bottom"
    :style="{ height: '30%' }"
  >
    <div class="popup-top">创建歌单({{createlist.length}})</div>
    <van-divider />
    <van-cell title="创建歌单" icon="add-o" @click="clickAddCell" />
    <van-cell title="管理歌单" icon="orders-o" @click="clickManagerCell('create')" />
  </van-popup>

  <!-- 新建 -->
  <van-popup
    v-model:show="showAdd"
    round
    position="bottom"
    :style="{ height: '30%' }"
  >
    <div class="popup-top">
      <div>创建歌单</div>
      <div class="btn" @click="finishC">完成</div>
    </div>
    <van-field v-model="playlistName" placeholder="请输入歌单标题" />
    <div class="popup-content">
      <van-checkbox v-model="playlistType" checked-color="#57BEAD" name="SHARED">设为共享歌单（和好友一起管理）</van-checkbox>
      <van-checkbox v-model="playlistPrivacy" checked-color="#57BEAD" name="10">设为隐私歌单</van-checkbox>
    </div>
  </van-popup>

  <!-- 收藏歌单 -->
  <van-popup
    v-model:show="showCollect"
    round
    position="bottom"
    :style="{ height: '20%' }"
  >
    <div class="popup-top">收藏歌单({{collectlist.length}})</div>
    <van-divider />
    <van-cell title="管理歌单" icon="orders-o" @click="clickManagerCell('collect')" />
  </van-popup>

  <!-- 管理创建歌单 -->
  <van-popup
    v-model:show="showManagerCreate"
    position="bottom"
    :style="{ height: '100%' }"
  >
    <div class="popup-top">
      <div>全选</div>
      <div>管理歌单</div>
      <div class="btn" @click="finishM('create')">完成</div>
    </div>
    <van-divider />
    
  </van-popup>

  <!-- 管理收藏歌单 -->
  <van-popup
    v-model:show="showManagerCollect"
    position="bottom"
    :style="{ height: '100%' }"
  >
    <div class="popup-top">
      <div>全选</div>
      <div>管理歌单</div>
      <div class="btn" @click="finishM('collect')">完成</div>
    </div>
    <van-divider />
    
  </van-popup>

</template>

<style lang="less" scoped>
.user-info {
  position: relative;
  width: 100%;
  margin: 0.3rem 0 0.4rem 0;
  text-align: center;
  border-radius: 0.2rem;

  .content {
    padding: 0.4rem 0.2rem 0.2rem 0.2rem;
    .name h3 {
      margin: 0.2rem;
    }
  }
  .logout {
    position: absolute;
    top: 0.4rem;
    right: 0.2rem;
    padding: 0.1rem;
    font-size: 0.4rem;
    color: @theme-color;
  }
}

.playlist {
  margin-bottom: 0.3rem;
}

.popup-top {
  margin: 0.2rem 0.4rem 0 0.4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .btn {
    color: @theme-color;
  }
}
.popup-content {
  margin: 0 0.3rem;
  .van-checkbox {
    margin: 0.2rem 0;
    font-size: 12px;
  }
}

.van-divider {
  margin: 0.2rem 0;
}
</style>
    