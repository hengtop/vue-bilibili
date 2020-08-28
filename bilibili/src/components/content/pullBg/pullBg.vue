<template>
  <div v-if="model" class="page" style=" touch-action: none; ">
    <div class="banner">
      <div class="bgimg"></div>
      <div class="info-wrapper">
        <avatarInfo :model="model" @editBtn="show = true"></avatarInfo>

        <!--侧滑组件-->
        <van-popup
          v-model="show"
          position="right"
          duration="0.2"
          @close="userdata"
          :style="{ marginTop:'54px', width: '100%',height:'100vh',backgroundColor:'#f4f4f4' }"
          :overlay-style="{backgroundColor:'#f4f4f4',marginTop:'44px'}"
        >
          <edit @back="show=false"></edit>
        </van-popup>

        <userName :model="model"></userName>
        <navChoose></navChoose>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import betterScroll from "components/common/betterScroll/betterScroll";
import avatarInfo from "components/content/userInfo/avatar";
import userName from "components/content/userInfo/userName";
import navChoose from "components/content/userInfo/navChoose";
import edit from "views/edit";
export default {
  inject:['reload'],//刷新页面函数组件
  props: ["model"],
  data() {
    return {
      startY: 0,
      isTouchStart: false,
      height: "",
      show: false,
    };
  },
  methods: {
    //开始滑动时
    touchStart(e) {
      this.$el.querySelector(".banner").classList.remove("heightback");
      this.$el.querySelector(".bgimg").classList.remove("imgscale");
      this.$el.querySelector(".info-wrapper").classList.remove("topback");
      //判断是否在顶部
      if (window.pageYOffset == 0) {
        this.isTouchStart = true;
        this.startY = e.changedTouches[0].pageY; //获取滑动起始位置
        //console.log(this.startY);
      } else {
        this.isTouchStart = false;
      }
    },
    //滑动过程
    touchMove(e) {
      if (this.isTouchStart) {
        const lastY = e.changedTouches[0].pageY;
        if (lastY - this.startY > 0) {
          e.preventDefault(); //取消默认事件
          this.height = 150 + (lastY - this.startY) / 4 + "px"; //滑动高度
          let max = (150 + (lastY - this.startY) / 4) / 150; //放大系数
          //console.log(_height)
          this.$el.querySelector(".banner").style.height = this.height;
          this.$el.querySelector(".info-wrapper").style.top = this.height;
          this.$el.querySelector(".bgimg").style.transform =
            "scale(" + max + ")";
        }
      }
    },
    //滑动结束的回弹动画动画
    touchEnd(e) {
      //添加过渡
      this.$el.querySelector(".banner").classList.add("heightback");
      this.$el.querySelector(".info-wrapper").classList.add("topback");
      this.$el.querySelector(".bgimg").classList.add("imgscale");
      //修改值
      this.$el.querySelector(".banner").style.height = "150px";
      this.$el.querySelector(".bgimg").style.transform = "scale(1)";
      this.$el.querySelector(".info-wrapper").style.top = "150px";
      this.isTouchStart = false;
    },
    //点击切换样式
    chooseTitle(index) {
      const nowIndex = this.currentIndex; //获取切换前一个索引
      this.currentIndex = index; //保存当前索引
      const titleWidth =
        (this.$el.querySelector(".video-nav").offsetWidth - 40) / 3; //计算得到单位位移距离
      let driftLeft = index * titleWidth + 20; //计算位移距离
      const style = document.createElement("style"); //创建标签节点
      document.head.appendChild(style); //添加节点
      const sheet = style.sheet;
      sheet.addRule(".nav-item::after", "left:" + driftLeft + "px");
      sheet.insertRule(".nav-item::after { left:" + driftLeft + "px}", 0); //添加样式属性
    },
    //样式添加判断
    isStyle(index) {
      return { active: this.currentIndex == index };
    },
    //跳转到编辑界面
    goEdit() {
      this.$router.push("/edit");
    },
    //关闭滑动组件对数据进行更新
    userdata(){
      console.log('更新了');
      this.reload();
    }
  },
  mounted() {
    //dom渲染完后开始监听动作
    this.$nextTick(function () {
      document.body.addEventListener("touchstart", this.touchStart, false);
      document.body.addEventListener("touchmove", this.touchMove, false);
      document.body.addEventListener("touchend", this.touchEnd, false);
    });
  },
  //销毁
  destroyed() {
    document.body.removeEventListener("touchstart", this.touchStart, false);
    document.body.removeEventListener("touchmove", this.touchMove, false);
    document.body.removeEventListener("touchend", this.touchEnd, false);
  },
  components: {
    avatarInfo,
    userName,
    navChoose,
    edit,
  },
};
</script>

<style scoped>
.banner {
  height: 150px;
  background-color: rgba(244, 244, 244, 0.3);
  overflow: hidden;
}
.heightback {
  transition: height 0.5s;
}
.imgscale {
  transition: all 0.5s;
}
.topback {
  transition: top 0.5s;
}
.bgimg {
  width: 100%;
  height: 100%;
  background-image: url("~assets/img/qiyana.jpg");
  background-repeat: no-repeat;
  background-size: 100%;
}
.info-wrapper {
  position: absolute;
  top: 150px;
  width: 100%;
  background-color: #fff;
}
</style>
<style>
</style>
