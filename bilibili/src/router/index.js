import Vue from 'vue'
import VueRouter from 'vue-router'

//懒加载
const register = () => import('views/register');
const login = () => import('views/login');
const userInfo = () => import('views/userInfo');
const edit = () => import('views/edit')
Vue.use(VueRouter)

const routes = [
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
    path:'/edit',
    component:edit,
    meta:{
      istoken:true,
    }
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

//路由守卫
router.beforeEach((to, from, next) => {
  console.log(to);
  if (!localStorage.getItem('token') && !localStorage.getItem('id') && to.meta.istoken == true) {
    router.push('/login');
    Vue.prototype.$msg.fail('请重新登录');
    return;
  }
  next();
})

export default router
