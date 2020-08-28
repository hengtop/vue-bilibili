
<template>
  <div class="login-input">
    <van-field v-model="text" 
    :label="label" 
    :type="type" 
    :placeholder="placeholder" 
    :rule="rule"
    :autocomplete="autocomplete"
     />
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "loginInput",
  props: ["label", "type", "placeholder", "rule","autocomplete"],
  data() {
    return {
      text: "",
    };
  },
  methods: {
    handleRule(){
      /**
       * 不在这里验证正则，先把数据都传过去，等到发送信息的时候再判断正则
       */
      //const rule = new RegExp(this.rule);//将字符转转换为正则表达式
      //if(rule.test(this.text)){
        this.$emit('inputChange',this.text);//正则验证成功就将事件和值发送出去
     // }

      
    }
  },
  watch: {
    text(){
       this.handleRule();
    }
  },
  components: {},
};
</script>

<style scoped>
</style>
