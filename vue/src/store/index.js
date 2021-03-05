import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueCookies from 'vue-cookies'

Vue.use(VueCookies)
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userCheckAuth: false,
    userFullName: localStorage.getItem('fullname') ? localStorage.getItem('fullname') : null,
    validationErrors: {}
  },
  mutations: {
    responseError(state, errors) {
      state.validationErrors = errors
    },
    userCheckAuth(state,userIsLoggin) {
      state.userCheckAuth = userIsLoggin
    },
    userFullName(state,userFullName) {
      state.userFullName = userFullName
    }
  },
  actions: {
    signup({commit},payload) {
      axios
        .post('http://localhost:3000/users/register', payload.user,{
          withCredentials: true
        })
        .then((response)=> {
          const errors = response.data.errors;
          const user = response.data.user;
          if(errors) {
            commit('responseError', errors);
          }
          if(user) {
            const router = payload.router;
            const fullName = `${user.firstName} ${user.lastName}`
            commit('userCheckAuth',true);
            commit('userFullName', fullName);
            router.push({path: '/'});
            localStorage.setItem('fullname', fullName);
          }
        })
        .catch(function (error) {
          console.log('error',error);
        })
      },
    login({commit}, payload) {
      axios
        .post('http://localhost:3000/users/login', payload.user, {
          withCredentials: true
        })
        .then((response)=> {
          const errors = response.data.errors;
          const user = response.data.user;
          if(errors) {
            commit('responseError', errors);
          }
          if(user) {
            const router = payload.router;
            const fullName = `${user.firstName}`
            commit('userCheckAuth',true);
            commit('userFullName', fullName);
            router.push({path: '/'});
            localStorage.setItem('fullname', fullName);
          }
        })
        .catch(function (error) {
          console.log('error',error);
        })
      },
    logout({commit},payload) {
      axios
        .get('http://localhost:3000/users/logout', {
          withCredentials: true
        }).then(response=>{
            let router = payload.router;
            commit('userCheckAuth', false);
            router.push('/login');
            localStorage.removeItem('fullname')
          })
          .catch(error=>{
            console.log(error);
          })
        },
      userCheckAuth({commit}, payload) {
        axios
        .get('http://localhost:3000/users/checkToken', {
          withCredentials: true
        })
        .then((response)=> {
          commit('userCheckAuth',true);
        })
        .catch(function (error) {
          let router = payload;
          router.push('/login');
          console.log(error)
          commit('userCheckAuth',false);
        })
      }  
    },
    getters: {
      isAuth: state => {
        return !!state.userCheckAuth
      },
      userFullName: state => {
        return state.userFullName
      }
    }
})
