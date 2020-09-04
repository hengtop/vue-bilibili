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
            <span>
              <img src="~assets/img/收藏.png" alt />
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
    <commentTitle :model="model"></commentTitle>
    <comment :commentList="commentList"></comment>
  </div>
</template>

<script type="text/ecmascript-6">
import navBarItem from "components/content/navBarItem/navBarItem";
import detail from "views/detail";
import commentTitle from "components/content/comment/commentTitle";
import comment from "components/content/comment/comment";
export default {
  name: "articleItem",
  data() {
    return {
      model: {},
      articleData: {},
      commendList: {},
      commentList:{},
    };
  },
  created() {
    if(localStorage.getItem('token')){
      this.userInfoData();
    }
    this.articleItem();
    this.commendData();
    this.commentData()
  },
  methods: {
    //获取用户信息
    async userInfoData() {
      const res = await this.$http.get("/user/" + localStorage.getItem("id"));
      this.model = res.data[0];
    },
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
    async commentData(){
      const res = await this.$http.get('/comment/'+this.$route.params.id)
      this.commentList = res.data;
    }
  },
  watch: {
    $route() {
      //监听路由变化，请求数据
      this.articleItem();
      this.commendData();
      this.commentData();
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
}
.video-wrapper {
  width: 100%;
}
.video-box video {
  width: 100%;
}

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

.commend-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding-bottom: 35px;
  border-bottom: 1px solid #e7e7e7;
  .detail {
    width: 46%;
    padding: 8px 5px;
  }
}
</style>