<template>
  <div v-if="model" class="user-set">
    <div class="avatar">
      <img v-if="model.user_img" :src="model.user_img" alt="" />
      <img v-else src="~assets/img/qiyana.jpg" alt="" />
    </div>
    <div class="set"> 
      <div class="user-focus">
        <div class="fans">
          <span class="number">0</span>
          <span class="item">粉丝</span>
        </div>
        <div class="focus">
          <span class="number">11110</span>
          <span class="item">关注</span>
        </div>
        <div class="likes">
          <span class="number">2121</span>
          <span class="item">获赞</span>
        </div>
      </div>
      <div class="info-set"
      @click="editBtn" >
        编辑资料
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name:'avatar',
  props:["model"],
  data() {
    return {};
  },
  methods: {
    editBtn(){
      this.$emit('editBtn');
    }
  },
  components: {},
};
</script>

<style scoped>
.user-set {
  margin-top: -18px;
  display: flex;
  width: 100%;
  height: 110px;
  justify-content: space-between;
  align-items: center;
}
.avatar img {
  width: 84px;
  height: 84px  ;
  border-radius: 50%;
  margin-left: 10px;
}
.set {
  display: flex;
  flex-direction:column;
  align-items: center;
  margin-top: 8px;
}
.info-set {
  margin-right: 5px;
  width: 220px;
  height: 30px;
  border: 1px solid #fb7299;
  border-radius: 1.06667vw;
  background-color:#fff;
  color: #fb7299;
  text-align: center;
  line-height: 30px;
}
.data-full {
  margin-left: 5px;
  color: #ccc;
  font-size: 14px;
}
.user-focus{
  display: flex;
  width: 220px;
  justify-content: space-around;
  margin-right: 20px;
  position: relative;
 
}
.user-focus .item{
  font-size: 11px;
  color:#999;
}
.user-focus .number{
  font-size: 14px;
  margin-bottom: 3px;
}
.fans ,.focus,.likes{
  padding:0 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
}
.focus::after{
  content: '';
  width: 1px;
  height: 15px;
  background-color: #e7e7e7;
  position: absolute;
  top: 6px;
  left: 145px;
}
.focus::before{
  content: '';
  width: 1px;
  height: 15px;
  background-color: #e7e7e7;
  position: absolute;
  top: 7px;
  left: 75px;
}
</style>
