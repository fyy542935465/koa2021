import Vue from 'vue'
import Router from 'vue-router'
import Index from '../pages/index'
import Sign from '../pages/sign'
import About from '../pages/about'
import Data from '../pages/data'
import Product from '../pages/product'
import News from '../pages/news'
import Editor from '../pages/editor'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/sign',
      component:Sign,
      name:'Sign',
    },
    {
      path: '/',
      redirect:'/index'
    },
    {
      path:'/index',
      component:Index,
      name:'Index',
      redirect:'/product',
      children:[
        {
          path:'/product',
          name:'Product',
          component:Product
        },
        {
          path:'/about',
          name:'About',
          component:About
        },
        {
          path:'/data',
          name:'Data',
          component:Data
        },
        {
          path:'/news',
          name:'News',
          component:News
        },
        {
          path:'/editor',
          name:'Editor',
          component:Editor
        }
      ]
    }
  ]
})
