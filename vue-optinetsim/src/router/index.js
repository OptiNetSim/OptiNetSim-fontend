import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login/index.vue'
import Layout from '@/views/Layout/index.vue'
import Function from '@/views/Function/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/',
      component:Layout,
    },
    {
      path:'/login',
      component:Login
    },
    {
      path:'/function',
      component:Function
    },
  ],
})

export default router
