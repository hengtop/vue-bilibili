<template>
  <div v-if="detailItem.img" id="detail" @click="pushDetail" ref="img">
    <div class="detail-item">
      <img  v-lazy="detailItem.img" alt  style="width:100%;" />
      <div class="play-info-wrapper">
        <div class="play-info">
          <span class="play-num"><img src="~assets/img/播放数_32.png" /> 666</span>
          <span class="comment-num"><img src="~assets/img/评论.png" /> 666</span>
        </div>
      </div>
    </div>
    <div class="title">{{detailItem.name}}</div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "detail",
  props: ["detailItem"],
  data() {
    return {};
  },
  methods: {
    //判断跳转路径是否相同相同就不跳转
    pushDetail(){
      if(this.$route.path != `/articleItem/${this.detailItem.id}`){
        this.$router.push(`/articleItem/${this.detailItem.id}`)
      }
    },
    //图片加载失败
    errorImg(){
      console.log(this.$refs)
    }
  },
  components: {},
};
</script>

<style scoped>
#detail {
  display: flex;
  flex-wrap: wrap;
  align-content: space-between;
  padding-bottom: 10px;
}

.title {
  font-size: 3.2vw;
  color: #212121;
  margin-top: 3vw;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.detail-item{
  position: relative;
}
.detail-item img{
  width: 100%;
  vertical-align: middle;
}
.play-info-wrapper{
  width: 100%;
  position: absolute;
  bottom: 0;
}
.play-info {
  display: flex;
  justify-content: space-between;
  padding: 10px 12px 0;
  background: linear-gradient(0deg,rgba(0,0,0,.85),transparent);
}
.play-info img{
  width: 16px;
  vertical-align:sub;
  
}
.play-num,
.comment-num {
  color: #fff;
  font-size: 12px;
}
</style>
