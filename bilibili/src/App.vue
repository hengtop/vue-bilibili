<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepalive"></router-view>
    </keep-alive>
    <div v-if="!$route.meta.keepalive">
      <router-view v-if="isRouterAlive"></router-view>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  name: "App",
  provide() {
    return {
      reload: this.reload,
    };
  },
  data() {
    return {
      isRouterAlive: true,
    };
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function () {
        this.isRouterAlive = true;
      });
    },
  },
  components: {},
};
</script>
<style lang="less">
@import "assets/css/normalize.css";
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background-color: #f4f4f4;
}
</style>
