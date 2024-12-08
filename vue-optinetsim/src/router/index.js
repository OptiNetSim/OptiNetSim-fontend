//createRouter:创建router实例对象
//createWebHistory ：创建history模式的路由
import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home/index.vue'
import Login from '@/views/Login/index.vue'
import Function1 from '@/views/Function1/index.vue'
import Function2 from '@/views/Function2/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {//首页
      path: '/',
      component: Home,
      
    },
    {//登录页
      path:'/login',
      component:Login
    },
    {//功能页一：首页点击学习使用跳转
      path:'/function1',
      component:Function1
    },
    {//功能页二：登录页点击登陆后跳转
      path:'/function2',
      component:Function2
    }

  ]
})

export default router
