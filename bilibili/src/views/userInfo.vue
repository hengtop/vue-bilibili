<template>
  <div id="user-info">
    <navBarItem :model="model"></navBarItem>
    <pullBgImg :model="model"></pullBgImg>
  </div>
</template>

<script type="text/ecmascript-6">
import navBarItem from 'components/content/navBarItem/navBarItem'
import pullBgImg from 'components/content/pullBg/pullBg'

export default {
  name: "userInfo",
  data() {
    return {
      model:{},
    };
  },
  created() {
    this.userInfoData();
  },
  methods: {
    async userInfoData(){
      const res = await this.$http.get('/user/'+localStorage.getItem('id'));
      this.model = res.data[0];
      console.log(res.data[0]);
    }
  },
  components: {
    navBarItem,
    pullBgImg,
   
  },
};
</script>

<style scoped>

</style>
