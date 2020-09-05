<template>
  <div class="comment-parent">
    <div
      class="comment-wrapper"
      v-for="parentItem in commentChildList"
      :key="parentItem.comment_id"
    >
      <div class="comment-item">
        <div class="avatar" V-if="parentItem.userinfo">
          <img v-if="parentItem.userinfo.user_img" v-lazy="parentItem.userinfo.user_img" alt />
          <img v-else src="~assets/logo.png" alt />
        </div>
        <div class="main-wrapper">
          <div class="title">
            <span v-if="parentItem.userinfo.name">{{parentItem.userinfo.name}}</span>
            <span v-else>此用户没有设置昵称（官方）</span>
            <span>{{parentItem.comment_date}}</span>
          </div>
          <div class="content">
            <span v-show="replyWhoFlag" style="color:#478ef0">{{'回复 '+parentItem.parent_user_info.name+':'}}</span>
            {{parentItem.comment_content}}
            <span class="reply" @click="replyWho(parentItem)">喷</span>
          </div>
        </div>
      </div>
      <!-- 组件的递归使用实现评论递归 -->
      <commentChild :commentChildList="parentItem.child" replyWhoFlag="true" @replyWhoChild="replyWhoChild"></commentChild>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "commentChild",
  props: ["commentChildList", "replyWhoFlag"], //replyWho表示二级以上的评论（不含二级）要加上谁谁回复谁的标志
  data() {
    return {};
  },
  methods: {
    //下面是递增式进行组件自下而上传值     
    replyWho(item){
      this.$emit('replyWhoChild',item);
    },
    replyWhoChild(item){
      this.replyWho(item);//类递归调用
    }
  },
  components: {},
};
</script>

<style lang="less" scoped>
.comment-parent {
  .comment-wrapper {
    .comment-item {
      display: flex;
      padding: 12px 0;
      .avatar {
        margin-right: 15px;
        img {
          width: 35px;
          height: 35px;
          border-radius: 50%;
        }
      }
      .main-wrapper {
        flex: 1;
        .title {
          font-size: 13px;
          color: #555;
          display: flex;
          justify-content: space-between;
          margin-bottom: 5px;
        }
        .content {
          padding-top:5px;
          word-break: break-all; //换行
          font-size: 13px;
          position: relative;
          .reply{
            position: absolute;
            right: 8px;
            font-size: 14px;
            color:#fb7299;
          }
        }
      }
    }
  }
}
</style>
