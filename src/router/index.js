import Vue from 'vue'
import Router from 'vue-router'
import SprintCalendar from '@/components/SprintCalendar'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'SprintCalendar',
    component: SprintCalendar
  }]
})
