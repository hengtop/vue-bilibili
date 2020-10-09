<template>
  <div v-if="articleData" id="articleItem">
    <navBarItem :model="model"></navBarItem>
    <div class="video-wrapper">
      <div class="video-box">
        <video controls="controls" :src="articleData.content"></video>
      </div>
      <div v-if="articleData.category" class="title">
        <span class="category">{{articleData.category.title}}</span>
        <span class="title-text">{{articleData.name}}</span>
        <div class="up-info">
          <img class="up-icon" src="~assets/img/up.png" alt />
          <span class="name">{{articleData.userinfo.name}}</span>
          <span class="play-num">142.6W次观看</span>
          <span class="danmu-num">9999弹幕</span>
          <span class="time">{{articleData.date}}</span>
        </div>
        <div class="play-hot">
          <div class="left">
            <span @click="collection">
              <img v-show="isCollection" src="~assets/img/收藏red.png" alt />
              <img v-show="!isCollection" src="~assets/img/收藏.png" alt="">
              收藏
            </span>
            <span>
              <img src="~assets/img/下载 .png" alt />
              缓存
            </span>
            <span>
              <img src="~assets/img/分享.png" alt />
              分享
            </span>
          </div>
          <div class="right">
            <span>
              <img src="~assets/img/评论-player.png" alt />
              评论
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="commend-wrapper">
      <detail class="detail" v-for="(item,index) in commendList" :key="index" :detailItem="item"></detail>
    </div>
    <commentTitle
      :model="model"
      :commentLenght="commentLength"
      @editComment="editComment"
      ref="commentTitle"
    ></commentTitle>
    <comment class="comment-wrapper" :commentList="commentList" @replyWho="replyWho"></comment>

    <!-- 弹窗组件 -->
    <van-dialog
      v-model="show"
      title
      @confirm="this.isCollection = false"
      @cancel="this.isCancel = true"
      show-cancel-button
    >
      <div class="dialog-text">是否取消收藏</div>
    </van-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import navBarItem from "components/content/navBarItem/navBarItem";
import detail from "views/detail";
import commentTitle from "components/content/comment/commentTitle";
import comment from "components/content/comment/comment";
import { getDate } from "common/tool";
export default {
  name: "articleItem",
  data() {
    return {
      model: {}, //用户信息
      articleData: {}, //视频详情数据
      commendList: {}, //推荐视频列表
      commentList: {}, //评论列表
      commentLength: 0, //获取的评论条数
      sendComment: {
        //发送的评论对象
        comment_content: "",
        comment_date: "",
        parent_id: null,
        article_id: null,
      },
      isCollection: null, //文章收藏状态
      show: false, //弹窗标识
      isCancel: false, //弹窗取消标识
    };
  },
  created() {
    if (localStorage.getItem("token")) {
      this.collectionFlag();
    }
    this.articleItem();
    this.commendData();
    this.commentData();
  },
  methods: {
    //获取本页详细数据
    async articleItem() {
      const res = await this.$http.get("/article/" + this.$route.params.id);
      this.articleData = res.data[0];
    },
    //获取视频下方推荐数据
    async commendData() {
      const res = await this.$http.get("/commend");
      this.commendList = res.data;
    },
    //获取评论数据
    async commentData() {
      const res = await this.$http.get("/comment/" + this.$route.params.id);
      this.commentLength = res.data.length; //获取总的评论个数
      this.changeCommentData(res.data); //处理得到的评论结构
    },
    //处理改造评论数据方法
    changeCommentData(list) {
      function fn(temp) {
        let arr1 = [];
        for (let item of list) {
          if (item.parent_id == temp) {
            arr1.push(item);
            item.child = fn(item.comment_id); //递归处理多级评论嵌套
          }
        }
        return arr1;
      }
      const res = fn(null);
      this.commentList = res;
    },
    //发送评论
    async editComment(content) {
      this.sendComment.comment_content = content;
      this.sendComment.comment_date = getDate();
      this.sendComment.article_id = this.$route.params.id; //上述三个属性是每级评论都有的
      const res = await this.$http.post(
        "/comment_post/" + localStorage.getItem("id"),
        this.sendComment
      );
      //再次获取评论
      await this.commentData();
      //清空评论对象id，避免下次回复的为同一对象
      this.sendComment.parent_id = null;
      if (res.status == 200) {
        this.$msg.fail("评论发表成功"); //弹窗提示
      }
    },
    //获取到回复对象的评论信息
    replyWho(item) {
      this.$refs.commentTitle.getFocus(item.userinfo.name); //获得焦点，修改提示文字为回复对象
      this.sendComment.parent_id = item.comment_id; //设置评论等级
    },
    //收藏功能
    async collection() {
      if (localStorage.getItem("token")) {
        const res = await this.$http.post("/collection/" + localStorage.getItem("id"),{ article_id: this.$route.params.id });
        if(res.data.msg == "收藏成功"){
          this.isCollection = true;
          this.$msg.success(res.data.msg);
        }
        else{
          this.isCollection = false;
          this.$msg.fail(res.data.msg);
        }
        console.log(res);
      }
    },
    //进入页面获取收藏状态
    async collectionFlag() {
      const res = await this.$http.get("/collection/" + localStorage.getItem("id"),
        {
          params: {
            article_id: this.$route.params.id,
          },
        }
      );
      this.isCollection = res.data.success;//获取状态
    },
  },
  watch: {
    $route() {
      //监听路由变化，请求数据
      this.articleItem();
      this.commendData();
      this.commentData();
      this.collectionFlag() ;
    },
  },
  components: {
    navBarItem,
    detail,
    commentTitle,
    comment,
  },
};
</script>

<style lang="less" scoped>
#articleItem {
  width: 100%;
  background-color: #fff;
  padding-bottom: 200px;
}
.video-wrapper {
  width: 100%;
}
.video-box video {
  width: 100%;
}

//视频播放样式
.title {
  width: 100%;
  padding: 10px 12px;
  box-sizing: border-box;
  .category {
    font-size: 3.2vw;
    display: inline-block;
    height: 6.4vw;
    line-height: 6.4vw;
    color: #fb7299;
    background-color: #f4f4f4;
    border-radius: 10px;
    padding: 0 10px;
    margin-right: 10px;
    vertical-align: top;
  }
  .title-text {
    font-size: 4.26667vw;
    font-weight: 400;
    display: inline-block;
    color: #212121;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 80%;
    height: 6.4vw;
    line-height: 6.4vw;
  }
  .up-info {
    font-size: 12px;
    .up-icon {
      width: 16px;
      vertical-align: middle;
      margin-top: -6px;
      margin-right: 3px;
    }
    .name,
    .play-num,
    .danmu-num,
    .time {
      height: 30px;
      line-height: 30px;
      display: inline-block;
      margin-right: 10px;
      color: #999;
    }
    .name {
      color: #212121;
      margin-right: 20px;
    }
  }
  .play-hot {
    height: 24px;
    font-size: 12px;
    line-height: 24px;
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    img {
      width: 22px;
      vertical-align: top;
    }
    .left span {
      margin-right: 20px;
    }
  }
}
//推荐样式
.commend-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  border-bottom: 1px solid #e7e7e7;
  .detail {
    width: 46%;
    padding: 8px 5px;
  }
}

//评论样式
.comment-wrapper {
  margin: 10px 15px 9px;
}

.dialog-text {
  line-height: 110px;
  text-align: center;
}
</style>