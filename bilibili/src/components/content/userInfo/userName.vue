<template>
  <div v-if="model" class="user-name">
    <div class="nick-name">
      <div class="name">{{model.username}}</div>
      <div class="lv_icon">
        <span v-if="model.gender == 1" class="gender">♂</span>
        <span v-else class="gender" style="color:#fb7299;">♀</span>
        <img src="~assets/img/lv_5.png" alt />
      </div>
      <div class="vip">年度大会员</div>
    </div>
    <div class="recommend">
      <div class="detail">{{model.user_desc}}</div>
      <div class="more-btn" @click="moreBtn">{{moreTip}}</div>
    </div>
    <span v-show="isShow" class="uid">uid:1234567</span>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "userName",
  props:["model"],
  data() {
    return {
      isShow:false,
      moreTip:'展开',
    };
  },
  methods: {
    moreBtn(){
      this.isShow = !this.isShow;
      this.isShow ? this.moreTip = '收起':this.moreTip = '展开';
    }
  },
  components: {},
};
</script>

<style scoped>
.user-name {
  margin-top: -10px;
  padding: 12px;
}
.nick-name {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.nick-name .name {
  font-size: 18px;
  color: #212121;
  max-width: 62.66667vw;
  vertical-align: middle;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
}
.gender{
  color: cornflowerblue;
  margin-left: 5px;
}
.lv_icon img {
  width: 25px;
  margin:0 5px 0 10px;
  vertical-align: middle;
}
.vip{
 
  font-size: 10px;
  color: #fff;
  padding: 1px 5px;
  border-radius: 2px;
  background-color: #fb7299;
}
.recommend{
  display: flex;
  justify-content: space-between;
}
.detail{
  color: #999;
  font-size: 13px;
}
.more-btn{
  color:#1389bf;
  font-size: 14px;
}
.uid{
  margin-top: 2px;
  font-size: 10px;
  color: #505050;
  background-color: #f4f4f4;
  padding: 2px 5px;
  border-radius: 2px;
}

</style>
