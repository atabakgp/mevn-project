import Vue from 'vue'
import Vuex, { mapGetters } from 'vuex'
import axios from 'axios'
import VueCookies from 'vue-cookies'

Vue.use(VueCookies)
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userCheckAuth: false,
    Loading: false,
    validationErrors: {}
  },
  mutations: {
    responseError(state, errors) {
      state.validationErrors = errors
    },
    userCheckAuth(state,userIsLoggin) {
      state.userCheckAuth = userIsLoggin
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
            let router = payload.router;
            router.push({path: '/'});
            commit('userCheckAuth',true);
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
            let router = payload.router;
            router.push({path: '/'});
            commit('userCheckAuth',true);
          }
        })
        .catch(function (error) {
          console.log('error',error);
        })
      },
    userLogout({commit},payload) {
      axios
        .get('http://localhost:3000/users/logout', {
          withCredentials: true
        }).then(response=>{
            let router = payload.router;
            commit('userCheckAuth', false);
            router.push('/login')
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
          console.log(response.status)
          commit('userCheckAuth',true);
        })
        .catch(function (error) {
          // let router = payload.router;
          // router.push('/login');
          commit('userCheckAuth',false);

        })
      }  
    },
    getters: {
      isAuth: state => {
        return !!state.userCheckAuth
      },
    }
})
