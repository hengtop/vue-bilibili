<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
export default {
  name:'betterScroll',
  data() {
    return {
      scroll:null,
    }
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper,{
      click:true,//设置类似div元素的点击（默认为false）
      probeType:2,//传一个number值，0和1表示不监听，2表示监听但不包括惯性滚动监听，3包括了惯性滚动监听
      pullUpLoad:this.pullUpLoad,//监听滚动加载
      bounce: {
        bottom:false,
      }
    });
     this.scroll.on('scroll' , (position) => {
       this.$emit('scroll',position);
    });
    
    
  },
  components: {

  }
}
</script>

<style scoped>
 
</style>
