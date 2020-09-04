<template>
  <div class="comment-title">
    <div class="title">
      <span>评论</span>
      <span>(4070)</span>
    </div>
    <div class="user-input">
      <img v-if="model.user_img" :src="model.user_img" alt="" />
      <img v-else src="~assets/logo.png" alt="" />
      <input class="input" type="text" placeholder="说点什么吧" @focus="focusInput">
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name:'commentTitle',
  props:['model'],
  data() {
    return {

    }
  },
  methods: {
    focusInput(){
      if(!localStorage.getItem('token') && !localStorage.getItem('id')){
        this.$msg.fail('请先登录');
        this.$router.push('/login')
      }
      return;
    }
  },
  components: {

  }
}
</script>

<style lang="less" scoped>
.comment-title{
  padding: 10px 5px;
  .title{
    span:nth-child(1){
      padding:0 10px ;
    }
    span:nth-child(2){
      color:#aaa;
    }
  }
  .user-input{
    padding: 15px 10px;
    display: flex;
    justify-content: space-between;
    flex: 1;
    img{
      width: 26px;
      border-radius: 50%;
      margin-right: 15px;
      vertical-align: top;
    }
    .input{
      outline: none;
      border: 0;
      background-color: #f4f4f4;
      border-radius: 10px;
      color: #e7e7e7;
      font-size: 12px;
      padding: 0 10px;
      line-height: 25px;
      width: 80%;
      caret-color:#000;/**光标颜色 */
    }
  }

}
</style>
