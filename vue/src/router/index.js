import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Profile from '@/views/Profile.vue'
import Login from '@/views/Login.vue'
import Signup from '@/views/Signup.vue'
import Orders from '@/views/Orders.vue'
import ContactUs from '@/views/ContactUs.vue'
import ChangePassword from '@/views/ChangePassword.vue'
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
  {
    path: '/orders',
    name: 'Orders',
    component: Orders,
    meta: {
      requireAuth: true,
    }
  },
  {
    path: '/change-password',
    name: 'ChangePassword',
    component: ChangePassword,
    meta: {
      requireAuth: true,
    }
  },
  {
    path: '/contact-us',
    name: 'ContactUs',
    component: ContactUs,
    meta: {
      requireAuth: true,
    }
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
