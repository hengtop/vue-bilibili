import Vue from 'vue'
import VueRouter from 'vue-router'

//懒加载
const register = () => import('views/register');
const login = () => import('views/login');
const userInfo = () => import('views/userInfo');
const edit = () => import('views/edit');
const home = () => import('views/home');
const articleItem = () => import('views/articleItem');
const editCategory = () => import('views/editCategory');
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    component: home,
    meta:{
      keepalive:true,
    }
  },
  {
    path: '/register',
    component: register,
  },
  {
    path: '/login',
    component: login,
  },
  {
    path: '/userInfo',
    component: userInfo,
    meta: {
      istoken: true,//需要验证
    }
  },
  {
    path: '/edit',
    component: edit,
    meta: {
      istoken: true,
    }
  },
  {
    path:'/articleItem/:id',
    component: articleItem,
  },
  {
    path:'/editCategory',
    component:editCategory,
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
//解决路由重复报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
//路由守卫
router.beforeEach((to, from, next) => {
  //console.log(to);
  if (!localStorage.getItem('token') && !localStorage.getItem('id') && to.meta.istoken == true) {
    router.push('/login');
    Vue.prototype.$msg.fail('请重新登录');
    return;
  }
  next();
})

export default router
