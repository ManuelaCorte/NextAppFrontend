import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'

import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import ClubsView from '../views/ClubsView.vue'
import RegisterView from '../views/RegisterView.vue'
import ReservationView from '../views/ReservationView.vue'
import NewsView from '../views/NewsView.vue'
import CustomRoom from '../components/customRoom.vue'
import DashBoard from '../views/DashBoard.vue'
import NoAuthenticated from "../views/noAuthenticated.vue"


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/clubs',
    name: 'clubs',
    component: ClubsView 
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
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const isLoggedIn = store.getters.isLoggedIn
  if (isLoggedIn) {
    next()
  } else {
      if(to.name == "home" || to.name == "login" || to.name == "noAuth"){
        next();
      }else{
        next({name: "noAuth"})
      }
    
  }
})
export default router
