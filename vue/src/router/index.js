import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Profile from '@/views/Profile.vue'
import Login from '@/views/Login.vue'
import Signup from '@/views/Signup.vue'
import Cart from '@/views/Cart.vue'
import Store from '@/store/index';


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
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
  {
    path: '/cart',
    name: 'Cart',
    component: Cart
  }
]

const router = new VueRouter({
  routes
})


router.beforeEach((to, from, next) => {
  const auth = Store.getters.isAuth
  if(!auth) {
    if(to.name!=='Login' && to.name!=='Signup') {
      Store.dispatch('userCheckAuth', router)
    }
  }
  if(auth) {
    if(to.name=='Login' || to.name=='Signup') {
      next('/')
    }
  }
  next()
})
export default router
