<template>
  <div class="comment">
  
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name:'comment',
  props:['commentList'],
  data() {
    return {

    }
  },
  methods: {
    async commentData(){
      const res = await this.$http.get('/comment/'+this.$route.params.id)
      console.log(res);
    }
  },
  components: {

  }
}
</script>

<style scoped>
</style>
