import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
// 路由表
const routes = [
  {
    path: '/',
    // name: 'layout',
    component: () => import('@/views/Layout'),
    children: [
      { path: '', redirect: 'home' },
      { path: 'home', name: 'home', component: () => import('@/views/Home') },
      { path: 'qa', name: 'qa', component: () => import('@/views/Qa') },
      { path: 'my', name: 'my', component: () => import('@/views/My') },
      { path: 'video', name: 'video', component: () => import('@/views/Video') }
    ]
  },
  { path: '/search', name: 'search', component: () => import('@/views/search') },
  { path: '/login', name: 'login', component: () => import('@/views/Login') },
  { path: '/article/:id', name: 'article', component: () => import('@/views/Article'), props: true },
  { path: '/user/profile', name: 'user-profile', component: () => import('@/views/user-profile') }
]

const router = new VueRouter({
  routes
})

export default router
