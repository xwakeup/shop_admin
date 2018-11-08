import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login.vue'
import Home from '@/components/Home.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    { path: '/home', component: Home }
  ]
})

router.beforeEach((to, from, next) => {
  // 判断有没有token,有就放行
  const token = localStorage.getItem('token')
  console.log(to, from, next)
  if (to.path === '/login' || token) {
    next()
  } else {
    next('./login')
  }
})

export default router
