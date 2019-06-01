import Vue from 'vue'
import Router from 'vue-router'
import Approval from '@/components/Approval'
import newProject from '@/components/newProject'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Approval',
      component: Approval,
    },
    {
      path:'/newProject',
      name:'newProject',
      component:newProject
    }
  ]
})
