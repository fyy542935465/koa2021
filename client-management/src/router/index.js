import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
  
export default new Router({
  routes: [
    {
      path: '/sign',
      component:() => import('../pages/sign'),
      name:'Sign',
    },
    {
      path: '/',
      redirect:'/index'
    },
    {
      path:'/index',
      component:() => import('../pages/index'),
      name:'Index',
      redirect:'/product',
      children:[
        {
          path:'/product',
          name:'Product',
          component:() => import('../pages/product')
        },
        {
          path:'/about',
          name:'About',
          component:() => import('../pages/about')
        },
        {
          path:'/data',
          name:'Data',
          component:() => import('../pages/data')
        },
        {
          path:'/news',
          name:'News',
          component:() => import('../pages/news')
        },
        {
          path:'/editor',
          name:'Editor',
          component:() => import('../pages/editor')
        }
      ]
    }
  ]
})
