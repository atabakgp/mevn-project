import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Profile from '@/views/Profile.vue'
import Login from '@/views/Login.vue'
import Signup from '@/views/Signup.vue'
import Store from '@/store/index';


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: {
      requireAuth: true,
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  const isAuth = Store.getters.isAuth;
  if(to.matched.some((record)=> record.meta.requireAuth)) {
    if(isAuth) {
      next() 
    } else {
      next('/login')
    }
  }
  if(isAuth) {
    if(to.name=='Login' || to.name=="Signup") {
      next('/')
    }
  }
  next()
})
export default router
