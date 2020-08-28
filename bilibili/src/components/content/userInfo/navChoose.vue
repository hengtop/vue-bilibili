<template>
  <div class="nav-item">
    <div
      v-for="(item,index) in chooseList"
      :key="index"
      @click="isActive(index)"
      :class="{active:nowIndex==index}"
    >{{item}}</div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "navChoose",
  data() {
    return {
      nowIndex: 0,
      chooseList: ["动态", "视频", "相薄"],
    };
  },
  methods: {
    isActive(index) {
      this.nowIndex = index;
    },
  },
  components: {},
};
</script>

<style scoped>
.nav-item {
  display: flex;
  height: 40px;
  line-height: 40px;
  border-top: 1px solid #e7e7e7;
  border-bottom: 1px solid #e7e7e7;
  padding-left: 12px;
}
.nav-item div {
  color: #757575;
  font-size: 13px;
}
.nav-item > div:nth-child(2) {
  padding: 0 30px;
}
.nav-item .active {
  color: #fb7299;
}
</style>
