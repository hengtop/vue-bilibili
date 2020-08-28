<template>
  <div id="register">
    <navBar class="nav-bar">
      <div slot="center">注册bilibili</div>
      <div slot="right" class="nav-right" @click="$router.push('/login')">切换到登录</div>
    </navBar>
    <!--通过箭头函数来接收信息，这样的写法很方便-->
    <loginInput
      class="login-input-1"
      label="姓名"
      placeholder="请输入姓名"
      rule="^.{2,16}$"
      @inputChange="res => {model.name = res}"
      autocomplete="on"
    ></loginInput>
    <loginInput
      class="login-input-2"
      label="账号"
      placeholder="请输入账号(长度为6至16个字符)"
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
    <loginBtn btnText="注册" @registerSubmit="registerSubmit"></loginBtn>
  </div>   
</template>

<script type="text/ecmascript-6">
import navBar from "components/common/navBar/navBar";
import loginInput from "components/content/loginInput/loginInput";
import loginBtn from "components/content/button/loginBtn";
export default {
  name: "register",
  data() {
    return {
      model: {
        name: "",
        username: "",
        password: "",
      },
    };
  },
  methods: {
    //注册请求
    async registerSubmit() {
      let rule_1 = /^.{6,16}$/,rule_2 = /^.{2,16}$/;
      if (rule_2.test(this.model.name) && rule_1.test(this.model.username) && rule_1.test(this.model.password)) {
        const res = await this.$http.post("/register", this.model);
        this.$msg.fail(res.data.msg);
        if(res.data.code == 302){
          this.$msg.fail(res.data.msg);
          return;
        }
        localStorage.setItem('id',res.data.id);
        localStorage.setItem('token',res.data.objtoken);
        console.log(res);
        setTimeout(() => {
          this.$router.push('/userInfo');
        }, 1000);
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
#register {
  width: 100%;
  .nav-bar {
    box-shadow: none;
    background-color: #fff;
    .nav-right{
      font-size: 12px;
    }
  }
  .login-input-1 {
    margin: 15px 0;
  }
}
</style>
