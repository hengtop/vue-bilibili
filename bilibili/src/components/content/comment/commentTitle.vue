<template>
  <div class="comment-title">
    <div class="title">
      <span>评论</span>
      <span>({{commentLenght}})</span>
    </div>
    <div class="user-input">
      <img v-if="model.user_img" :src="model.user_img" alt />
      <img v-else src="~assets/logo.png" alt />
      <input class="input" type="text" v-model="content" placeholder="说点什么吧" ref="input" @focus="focusInput" />
      <button @click="send" class="send-btn">发表</button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "commentTitle",
  props: ["model", "commentLenght"],
  data() {
    return {
      content: "",
    };
  },
  methods: {
    //获取光标的时候检查是否登录
    focusInput() {
      if (!localStorage.getItem("token") && !localStorage.getItem("id")) {
        this.$msg.fail("请先登录");
        this.$router.push("/login");
      }
      return;
    },
    //发送事件
    send() {
      this.content = this.content.trim();//去除前后空格
      this.$emit("editComment", this.content); //向父组件发送事件
      this.content = ""//清空
      this.$refs.input.placeholder="说点什么吧"//恢复为原来的提示文字
    },
    //获取光标
    getFocus(who){
      this.$refs.input.placeholder = '回复 '+who;//显示回复对象
      this.$refs.input.focus();
    }
  },
  components: {},
};
</script>

<style lang="less" scoped>
.comment-title {
  padding: 10px 5px;
  .title {
    span:nth-child(1) {
      padding: 0 10px;
    }
    span:nth-child(2) {
      color: #aaa;
    }
  }
  .user-input {
    padding: 15px 10px;
    display: flex;
    justify-content: space-between;
    flex: 1;
    img {
      width: 26px;
      border-radius: 50%;
      margin-right: 15px;
      vertical-align: top;
    }
    .input {
      outline: none;
      border: 0;
      background-color: #f4f4f4;
      border-radius: 10px;
      color: #212121;
      font-size: 12px;
      padding: 0 10px;
      line-height: 25px;
      width: 60%;
      caret-color: #000; /**光标颜色 */
    }
    /* Safari，Chrome WebKit browsers提示文字颜色 */
    input::-webkit-input-placeholder {
      color: #999;
    }
    /* 火狐 Mozilla Firefox 4 to 18 */
    input:-moz-placeholder {
      color: #999;
    }
    /* 火狐 Mozilla Firefox 19+ */
    input::-moz-placeholder {
      color: #999;
    }
    /* Internet Explorer 10+ */
    input:-ms-input-placeholder {
      color: #999;
    }
    .send-btn {
      background-color: #fb7299;
      font-size: 12px;
      color: #fff;
      border: none;
      border-radius: 15px;
      padding: 5px 12px;
    }
  }
}
</style>
