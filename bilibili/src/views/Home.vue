<template>
  <div id="home" v-if="category">
    <div class="nav-bar-item">
      <navBarItem :model="model"></navBarItem>
    </div>
    <div  class="main-wrapper">
      <div @click="$router.push('/editCategory')"  class="set-icon">
        <van-icon class="icon" name="setting" />
      </div>
      <van-tabs v-model="active" swipeable animated>
        <van-tab v-for="(item,index) in category" :title="item.title" :key="index">
          <van-list
            offset="50"
            :immediate-check="false"
            v-model="item.loading"
            :finished="item.finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <div class="detail-wrapper">
              <detail
                class="detail-items"
                :detailItem="categoryItem"
                v-for="(categoryItem,categoryIndex) in item.list"
                :key="categoryIndex"
              ></detail>
            </div>
          </van-list>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import navBarItem from "components/content/navBarItem/navBarItem";
import detail from "views/detail";
export default {
  name: "home",
  data() {
    return {
      model: {},
      active: 0, //首页横向导航栏初始索引
      category: [],
    };
  },
  created() {
    if (localStorage.getItem("token")) {
      this.userInfoData();
    }
    this.selectCategory();
  },
  methods: {
    //获取用户信息
    async userInfoData() {
      const res = await this.$http.get("/user/" + localStorage.getItem("id"));
      this.model = res.data[0];
    },
    //获取首页横栏信息和详细信息
    async selectCategory() {
      if (localStorage.getItem("newCat")) {
        return;
      }
      const res = await this.$http.get("/category");
      this.categoryData(res.data);
      this.selectDetail(this.category[this.active]);
    },
    //对数据进行处理
    categoryData(data) {
      const newData = data.map((item, index) => {
        item.list = [];
        item.page = 0;
        item.finished = false; //加载完成标识
        item.loading = false; //加载标识
        item.pageSize = 10; //添加设置属性
        item.activeLoad = false; //是否已经切换加载
        return item;
      });
      this.category = newData;
    },
    //获取详细信息
    async selectDetail(item) {
      const res = await this.$http.get("/detail/" + item._id, {
        params: {
          page: item.page,
          pagesize: item.pageSize,
        },
      });
      //如果切换头部导航到已经加载的页码位置就不做处理
      if (item.activeLoad) {
        console.log("已经加载");
        return;
      }

      item.list.push(...res.data);
      item.loading = false; //加载过程不会调用直到获取完数据后才会继续调用
      //所有数据加载完成后就不再加载
      if (res.data.length < item.pageSize) {
        item.finished = true;
      }
    },
    //下拉加载更多
    onLoad() {
      this.category[this.active].page += 1; //加载下一页
      //请求数据
      setTimeout(() => {
        this.selectDetail(this.category[this.active]);
      }, 1000);
    },
  },
  //组件活跃时调用本地保存栏目数据
  activated() {
    if (localStorage.getItem("newCat")) {
      let newCat = JSON.parse(localStorage.getItem("newCat"));
      this.categoryData(newCat);
      this.selectDetail(this.category[this.active]);
    }
  },
  watch: {
    active(newVal, oldVal) {
      this.selectDetail(this.category[newVal]);
      this.category[oldVal].activeLoad = true; //将上一个页面标记为已加载
    },
  },
  components: {
    navBarItem,
    detail,
  },
};
</script>

<style scope lang="less">
#home {
  background-color: #fff;
}
.van-tabs__line {
  height: 2px;
  background-color: #fb7299;
}
.van-tab--active {
  color: #fb7299;
}
.nav-bar-item {
  width: 100%;
  position: fixed;
  top: 0px;
  z-index: 1;
}
.van-tabs__wrap {
  position: sticky; /**这里不能用fixed，会破坏内部flex布局 */
  top: 44px;
  z-index: 100000;
  border-bottom: 1px solid #e7e7e7;
}
/**导航栏最右边按扭设置 */
.main-wrapper {
  position: relative;
  .set-icon {
    color: #757575;
    background-color: #fff;
    width: 40px;
    height: 42px;
    padding-top: 6px;
    text-align: center;
    position: fixed;
    top: 40px;
    right: 0;
    z-index: 200000000;
    .icon {
      line-height: 42px;
    }
  }
}
/**将导航栏左移，给设置按钮腾出位置 */
.van-tabs__wrap--scrollable .van-tabs__nav--complete ,.van-tabs__nav ,.van-tabs__nav--line{
  margin-right: 40px;
}

.detail-wrapper {
  margin-top: 30px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
  padding: 10px 0;
  .detail-items {
    width: 46%;
    padding: 12px 5px;
    display: flex;
    justify-content: center;
  }
}
</style>
