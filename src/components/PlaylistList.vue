<script setup>
import { defineProps, defineEmits } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const props = defineProps({ data: Array, title: String, tool: Object })

const emits = defineEmits(['clickAdd', 'clickMore', 'clickDelete'])

// 点击歌单
const clickPlaylist = async (item) => {
  const {id} = item
  router.push(`/playlist/${id}`)
}

// 点击添加
const clickAdd = () => {
  emits('clickAdd')
}

// 点击更多
const clickMore = () => {
  emits('clickMore')
}

// 点击删除
const clickDelete = (item, index) => {
  emits('clickDelete', {item, index})
}

</script>

<template>
  <div class="play-list">
    <!-- 头部标题&&按钮 -->
    <div class="top" v-if="props.title">
      <div>{{props.title}}</div>
      <div class="btn" v-if="props.tool">
        <svg v-if="props.tool.add" class="icon" aria-hidden="true" @click="clickAdd">
          <use xlink:href="#icon-tianjia1"></use>
        </svg>
        <svg class="icon" aria-hidden="true" @click="clickMore">
          <use xlink:href="#icon-gengduo-10"></use>
        </svg>
      </div>
    </div>

    <!-- 内容 -->
    <van-swipe-cell v-for="(item, index) in props.data" :key="item.id">
      <div class="item">
        <div class="left" @click="clickPlaylist(item)">
          <van-image
            width="1rem"
            height="1rem"
            radius="0.1rem"
            :src="item.coverImgUrl + '?imageView&thumbnail=50y50'"
          />
        </div>

        <div class="right">
          <div class="right-name" @click="clickPlaylist(item)">
            <div class="name">{{item.name}}</div>
            <div class="tips">
              {{item.trackCount}}首
            </div>
          </div>
          <div class="right-btn">
            
          </div>
        </div>
      </div>
      <!-- 删除 -->
      <template #right v-if="props.title">
        <van-button style="margin-left: 1px;" square type="danger" text="删除" @click="clickDelete(item, index)" />
      </template>
    </van-swipe-cell>
  </div>
</template>

<style lang="less" scoped>
.play-list {
  width: 100%;
  display: flex;
  justify-content: start;
  flex-wrap: wrap;
  background-color: #fff;
  border-radius: 0.2rem;
  padding: 0.2rem;
  box-sizing: border-box;

  .top {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .btn {
      .icon {
        margin-left: 0.3rem;
      }
    }
  }

  .van-swipe-cell {
    width: 100%;
  }
  .item {
    display: flex;
    width: 100%;
    min-height: 1rem;
    margin: 0.1rem 0;

    .left {
      width: 1rem;
      height: 1rem;
    }

    .right {
      width: calc(100% - 1rem);
      height: 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.1rem 0.2rem;
      box-sizing: border-box;

      .right-name {
        .name {
          color: @textHightColor;
          font-size: 0.3rem;

          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          word-break: break-all;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        }
        .tips {
          color: @textColor;
        }
      }

      .right-btn {
        display: flex;
        flex-wrap: nowrap;
        font-size: 0.4rem;
        color: @textColor;
        * {
          margin-left: 0.2rem;
        }
      }
    }
  }
}
</style>
  