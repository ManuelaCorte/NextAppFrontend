import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'

import HomeView from '../views/HomeView.vue'
import ClubsView from '../views/ClubsView.vue'
import RegisterView from '../views/RegisterView.vue'
import ReservationView from '../views/ReservationView.vue'
import NewsView from '../views/NewsView.vue'
import CustomRoom from '../components/customRoom.vue'
import CustomClub from '../components/customClub.vue'
import DashBoard from '../views/DashBoard.vue'
import NoAuthenticated from "../views/noAuthenticated.vue"
import SettingsView from '@/views/SettingsView.vue'
import DashboardAdmin from '@/views/DashboardAdmin.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/clubs',
    name: 'clubs',
    component: ClubsView 
  },
  {
    path: '/clubs/:id',
    name: 'club',
    component: CustomClub ,
    props: true
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView 
  },
  {
    path: '/rooms',
    name: 'rooms',
    component: ReservationView 
  },
  {
    path: '/rooms/:id',
    name: 'room',
    component: CustomRoom ,
    props: true
  },
  {
    path: '/news',
    name: 'news',
    component: NewsView 
  },
  {
    path: "/dashboard",
    name: 'dashboard',
    component: DashBoard
  },
  {
    path: "/noAuth",
    name: "noAuth",
    component: NoAuthenticated
  },
  {
    path: "/settings",
    name: "settings",
    component: SettingsView
  },
  {
    path: "/dashboardAdmin",
    name: "dashboardAdmin",
    component: DashboardAdmin
  }
  
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const isLoggedIn = store.getters.isLoggedIn
  const user = store.getters.getUser
  if (isLoggedIn) {
    if(to.name == "home"){
      next({name: "dashboard"})
    }else{
      if((to.name == "dashboardAdmin" && user.role != "admin") ){
        next({name: "dashboard"})
      }else{
        next()
      }  
    }  
  } else {
      if(to.name == "home" || to.name == "login" || to.name == "noAuth" || to.name == "register"){
        next();
      }else{
        next({name: "noAuth"})
      }
    
  }
})
export default router
