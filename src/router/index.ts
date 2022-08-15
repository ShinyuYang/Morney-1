import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Money from '@/views/Money.vue'
import Labels from '@/views/Labels.vue'
import Details from '@/views/Details.vue'
import Statistic from '@/views/Statistic.vue'

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect:'/money'
  },
  {
    path:'/money',
    component:Money
  },
  {
    path:'/labels',
    component:Labels
  },
  {
    path:'/details',
    component:Details
  },
  {
    path:'/statistic',
    component:Statistic
  }
 /* {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/!* webpackChunkName: "about" *!/ '../views/About.vue')
  }*/
]

const router = new VueRouter({
  routes
})

export default router