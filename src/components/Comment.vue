<script setup>
import { ref, onMounted, defineProps } from 'vue'
import { getCommentMusic } from '@/api'
import BetterScroll from '@/components/BetterScroll.vue'

const props = defineProps({id: Number, type: String})

// 获取音乐评论
const comments = ref([])
const hotComments = ref([])
const getCommentMusicData = async () => {
  const res = await getCommentMusic(props.id, 50)
  if(res.code !== 200) return
  comments.value = res.comments
  hotComments.value = res.hotComments
  // console.log(comments.value)
}

onMounted(()=> {
  getCommentMusicData()
})
</script>

<template>
  <div class="comment">
    <BetterScroll class="better-scroll">
      <div class="item" v-for="item in comments">
        <!-- 头像 -->
        <div class="left">
          <van-image
            round
            width="0.7rem"
            height="0.7rem"
            :src="item.user.avatarUrl + '?imageView&thumbnail=50y50' "
          />
        </div>
        <div class="right">
          <div class="right-top">
            <!-- 用户名 -->
            <div>
              <div class="nickname">{{item.user.nickname}}</div>
              <div class="time"><span>{{item.timeStr}}</span><span>{{item.ipLocation.location}}</span></div>
            </div>
            <div>
              {{item.likedCount}}
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-zanxiao"></use>
              </svg>
            </div>
          </div>
          <div>
            {{item.content}}
          </div>
        </div>
      </div>
    </BetterScroll>
  </div>
</template>

<style lang="less" scoped>
.comment {
  width: 100%;
  height: 100%;
  .item {
    display: flex;
    flex-wrap: nowrap;
    margin: 0.3rem 0.2rem;

    .left {
      width: 0.7rem;
    }
    .right {
      width: 6.4rem;
      padding-left: 0.2rem;
      .right-top {
        height: 0.7rem;
        width: 100%;
        margin-bottom: 0.1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .nickname {
          color: #000;
        }
        .time {
          span {
            margin-right: 0.1rem;
          }
        }
        .icon {
          vertical-align: 0.01rem;
        }
      }
    }
  }
}
</style>
    