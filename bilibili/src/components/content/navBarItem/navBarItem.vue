<template>
  <div class="nav-bar-item">
    <navBar class="nav-bar">
      <div slot="left" class="left" @click="$router.push('/home')">
        <img class="logo" src="~assets/img/bilibili_logo.png" alt />
      </div>
      <div slot="center">
        <div class="input-box">
          <div class="input">
            <span>请输入内容</span>
            <van-icon class="icon" name="search" />
          </div>
        </div>
      </div>
      <div slot="right" class="right">
        <div class="avatar" @click="$router.push('/userInfo')">
          <img v-if="model.user_img" :src="model.user_img" alt />
          <img v-else src="~assets/logo.png" alt />
        </div>
        <span class="download-app">下载app</span>
      </div>
    </navBar>
  </div>
</template>

<script type="text/ecmascript-6">
import navBar from "components/common/navBar/navBar";
export default {
  name: "navBarItem",
  data() {
    return {
      model: {},
    };
  },
  created(){
    if (localStorage.getItem("token")) {
      this.userInfoData();
    }
  },
  methods: {
    //获取用户信息
    async userInfoData() {
      const res = await this.$http.get("/user/" + localStorage.getItem("id"));
      this.model = res.data[0];
    },
  },
  components: {
    navBar,
  },
};
</script>

<style lang="less" scoped>
.nav-bar-item {
  .nav-bar {
    box-shadow: none;
    background-color: #fff;
    .right {
      width: 120px;
      margin-left: -45px;
    }
    .logo {
      width: 85px;
      height: 33px;
      vertical-align: middle;
      margin-bottom: 5px;
      margin-left: 10px;
    }
    .avatar {
      display: inline-block;
    }
    .avatar img {
      width: 22px;
      height: 22px;
      border-radius: 50%;
      vertical-align: middle;
    }
    .download-app {
      margin-left: 10px;
      padding: 5px 14px;
      background-color: #fb7299;
      border-radius: 2px;
      color: #fff;
      font-size: 13px;
    }
    .input-box {
      display: flex;
      width: 100%;
      height: 44px;
      justify-content: center;
      align-items: center;
      .input {
        margin-left: -25px;
        width: 70%;
        height: 20px;
        border-radius: 12px;
        background-color: #f4f4f4;
        position: relative;
        span {
          position: absolute;
          top: -10px;
          left: 30px;
          font-size: 10px;
          color: #aaa;
        }
        .icon {
          position: absolute;
          top: 4px;
          left: 10px;
          font-size: 14px;
          color: #aaa;
        }
      }
    }
  }
}
</style>
