import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/'

Vue.use(VueRouter)

function loadView(view) {
  return () =>
    import(/* webpackChunkName: "view-[request]" */ `@/views/${view}.vue`)
}

const routes = [
  {
    path: '/',
    name: 'main',
    component: loadView('MainBoard'),
    alias: ['/posts']
  },
  {
    path: '/posts/:id',
    name: 'post',
    component: loadView('PostDetail')
  },
  {
    path: '/posting',
    name: 'posting',
    component: loadView('WritePost')
  },
  {
    path: '/posts/mod/:id',
    name: 'modify',
    component: loadView('ModifyPost')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  store.commit('MUT_loading', { loading: true })
  next()
})

router.afterEach(() => {
  setTimeout(() => {
    store.commit('MUT_loading', { loading: false })
  }, 1000)
})

export default router
