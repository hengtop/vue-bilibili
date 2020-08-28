<template>
  <div id="login">
    <navBar class="nav-bar">
      <div slot="center">登录bilibili</div>
      <div slot="right" class="nav-right" @click="$router.push('/register')">切换到注册</div>
    </navBar>
    <!--通过箭头函数来接收信息，这样的写法很方便-->
    <loginInput
      class="login-input-2"
      label="账号"
      placeholder="请输入账号"
      rule="^.{6,16}$"
      @inputChange="res => {model.username = res}"
      autocomplete="on"
    ></loginInput>
    <form>
      <loginInput
        class="login-input-3"
        label="密码"
        placeholder="请输入密码"
        type="password"
        @inputChange="res => {model.password = res}"
        autocomplete="on"
      ></loginInput>
    </form>
    <loginBtn btnText="登录" @registerSubmit="registerSubmit"></loginBtn>
  </div>
</template>

<script type="text/ecmascript-6">
import navBar from "components/common/navBar/navBar";
import loginInput from "components/content/loginInput/loginInput";
import loginBtn from "components/content/button/loginBtn";
export default {
  name: "login",
  data() {
    return {
      model: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    //注册请求
    async registerSubmit() {
      let rule_1 = /^.{6,16}$/;
      if (rule_1.test(this.model.username) && rule_1.test(this.model.password)) {
        const res = await this.$http.post("/login", this.model);
        this.$msg.fail(res.data.msg);
        if(res.data.code == 301 || res.data.code == 302){
          return;
        }
        localStorage.setItem('token',res.data.token);
        localStorage.setItem('id',res.data.id);
        setTimeout(() => {
          this.$router.push('/userInfo');
        }, 1000);
        console.log(res);
      }
      else{
        this.$msg.fail('格式错误,请重新输入');
      }
    },
  },
  components: {
    navBar,
    loginInput,
    loginBtn,
  },
};
</script>

<style lang='less' scoped>
#login {
  width: 100%;
  .nav-bar {
    box-shadow: none;
    background-color: #fff;
    .nav-right{
      font-size: 12px;
    }
  }
  .login-input-2 {
    margin: 15px 0;
  }
}
</style>
