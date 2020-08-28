<template>
  <div class="edit" v-if="model">
    <div class="avatar-upload">
      <van-uploader class="upload-demo" preview-size="100vw" :after-read="afterRead" />
      <editBanner left="头像">
        <img v-if="model.user_img" class="avatar" slot="right" :src="model.user_img" alt />
        <img v-else class="avatar" slot="right" src="~assets/logo.png" alt />
      </editBanner>
    </div>
    <editBanner left="昵称" @dialogShow="dialogShow('昵称')">
      <div slot="right">{{model.username}}</div>
    </editBanner>
    <editBanner left="UID">
      <div slot="right">1234567</div>
    </editBanner>
    <editBanner left="性别" @dialogShow="dialogShow('性别')">
      <div slot="right">{{model.gender == 1?"男":"女"}}</div>
    </editBanner>
    <editBanner left="出生日期" @dialogShow="dialogShow('出生日期')"></editBanner>
    <editBanner left="个性签名" @dialogShow="dialogShow('个性签名')">
      <div slot="right">{{model.user_desc}}</div>
    </editBanner>
    <div class="back login-out" @click="loginOut">退出登录</div>
    <div class="back" @click="back">返回空间</div>
    <!--一些弹出组件，随便写在哪-->
    <van-dialog
      v-model="show"
      :title="Title"
      show-cancel-button
      @confirm="clickConfirm()"
      @cancel=" content='' "
    >
      <van-field v-model="content" placeholder autofocus />
    </van-dialog>
    <van-dialog
      v-model="showText"
      :title="Title"
      show-cancel-button
      @confirm="clickConfirmText()"
      @cancel=" content='' "
    >
      <van-field v-model="content" placeholder autofocus type="textarea" />
    </van-dialog>

    <van-action-sheet v-model="gennderShow" cancel-text="取消" :actions="actions" @select="onSelect" />
  </div>
</template>

<script type="text/ecmascript-6">
import navBarItem from "components/content/navBarItem/navBarItem";
import editBanner from "components/content/edit/editBanner";
export default {
  name: "edit",
  data() {
    return {
      show: false, //控制组件弹出
      showText: false, //个性签名编辑框弹出
      model: {}, //用户数据
      content: "", //编辑的内容
      Title: "", //编辑框标题
      gennderShow: false, //性别修改组件弹出
      actions: [
        { name: "女", val: 0 },
        { name: "男", val: 1 },
      ],
    };
  },
  created() {
    this.selectUSer();
  },
  methods: {
    //用户数据请求
    async selectUSer() {
      const res = await this.$http.get("/user/" + localStorage.getItem("id"));
      this.model = res.data[0];
      console.log(res.data[0]);
    },
    //头像上传
    async afterRead(file) {
      // 此时可以自行将文件上传至服务器
      const formdata = new FormData();
      formdata.append("file", file.file);
      const res = await this.$http.post("/upload", formdata);
      this.model.user_img = res.data.url;
      this.userUpData();
      console.log(res);
    },
    //更新后台数据
    async userUpData() {
      const res = await this.$http.post(
        "/update/" + localStorage.getItem("id"),
        this.model
      );
      if (res.data.code == 200) {
        this.$msg.fail("修改成功");
      }
    },
    //用户点击确认,更新数据
    clickConfirm() {
      this.model.username = this.content;
      this.content = ""; //清空
      this.userUpData(); //更新数据
    },
    clickConfirmText() {
      this.model.user_desc = this.content;
      this.content = ""; //清空
      this.userUpData(); //更新数据
    },
    //点击弹出编辑框
    dialogShow(value) {
      this.Title = value;
      if (value == "个性签名") {
        this.showText = true;
        return;
      }
      if (value == "性别") {
        this.gennderShow = true;
        return;
      }
      this.show = true;
    },
    onSelect(data) {
      this.model.gender = data.val;
      this.userUpData(); //更新数据
      this.gennderShow = false;
    },
    //返回空间
    back(){
      this.$emit('back');
    },
    loginOut(){
      localStorage.setItem('token','');//清空
      localStorage.setItem('id','')
      this.$router.push('/login');
      this.$msg.fail('请登录');
    }
  },
  components: {
    navBarItem,
    editBanner,
  },
};
</script>

<style scoped>
.nav-bar-item {
  margin-bottom: 10px;
}
.avatar {
  width: 46px;
  height: 46px;
  border-radius: 50%;
  vertical-align: middle;
}
.avatar-upload {
  position: relative;
  overflow: hidden;
}
.upload-demo {
  position: absolute;
  opacity: 0;
}
.back {
  background-color: #fff;
  font-size: 15px;
  padding: 10px 12px;
  display: flex;
  justify-content: center;
  border-bottom: 1px solid #fafafa;
  color: #505050;
  align-items: center;
}
.login-out{
  margin-top: 20px;
}
</style>

