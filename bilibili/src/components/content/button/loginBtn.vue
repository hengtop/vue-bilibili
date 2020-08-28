<template>
  <div id="login-btn" @click="registerClick">
    <div class="btn">
      <div class="login">{{btnText}}</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name:'loginBtn',
  props:['btnText'],
  data() {
    return {

    }
  },
  methods: {
    registerClick(){
      this.$emit('registerSubmit')
    }
  },
  components: {

  }
}
</script>

<style lang="less" scoped>
#login-btn{
  .btn{
    padding: 15px 10px;
     .login{
       height: 45px;
       background: #ff9db5;
       color: #fff;
       text-align: center;
       line-height: 45px;
       border-radius: 6.25vw;
       font-size: 16px;
     }
  }
}
</style>
