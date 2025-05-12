import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue'
import Home from '@/views/Home.vue'
import NetworkEditor from '@/views/NetworkEditor.vue'
import NetworkList from '@/views/NetworkList.vue'
import Register from '@/views/Register.vue'
import DeviceEditor from '@/views/DeviceEditor.vue'
import EditMode from '@/views/EditMode.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/',
      component:Home,
    },
    {
      path:'/login',
      component:Login
    },
    {
      path:'/networks',
      component:NetworkList
    },
    {
      path: '/network/:networkId',
      name: 'Function2',
      component:NetworkEditor,
      props: true
    },
    {
      path:'/register',
      component:Register
    },
    {
      path:'/device/:deviceId',
      name: 'DeviceEditor',
      component:DeviceEditor,
      meta: {
        keepAlive: true // 启用缓存
      }
    },
    {
      path: '/edit-mode',
      name: 'EditMode',
      component: () => import('../views/EditMode.vue'),
    }
  ],
})



export default router
