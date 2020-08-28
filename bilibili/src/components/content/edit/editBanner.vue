<template>
  <div class="edit-banner" @click="dialogShow">
    <div class="edit-list">
     <span>{{left}}</span>
     <span><slot name="right"></slot></span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

export default {
  name:'editBanner',
  props:['left'],
  data() {
    return {

    }
  },
  methods: {
    dialogShow(){
      this.$emit('dialogShow');
    }
  },
  components: {

  }
}
</script>

<style scoped>
.edit-list{
  background-color: #fff;
  font-size: 15px;
  padding:10px 12px;
  display:flex;
  justify-content: space-between;
  border-bottom:1px solid #fafafa ;
  color: #505050;
  align-items: center;
}
</style>
