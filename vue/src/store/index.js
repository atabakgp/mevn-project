import Vue from 'vue'
import Vuex from 'vuex'
import VueCookies from 'vue-cookies'
import api from '../config/axios';

Vue.use(VueCookies)
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userCheckAuth: localStorage.getItem('fullname') ? true : false,
    userFullName: localStorage.getItem('fullname') ? localStorage.getItem('fullname') : null,
    validationErrors: {},
  },
  mutations: {
    responseError(state, errors) {
      state.validationErrors = errors
    },
    userCheckAuth(state, userIsLoggin) {
      state.userCheckAuth = userIsLoggin
    },
    userFullName(state, userFullName) {
      state.userFullName = userFullName
    },
  },
  actions: {
    signup({
      commit
    }, payload) {
      api.signup(payload.user)
        .then((response) => {
          const errors = response.data.errors;
          const user = response.data.user;
          if (errors) {
            commit('responseError', errors);
          }
          if (user) {
            const router = payload.router;
            const fullName = user.firstName
            commit('userCheckAuth', true);
            commit('userFullName', fullName);
            router.push({
              path: '/'
            });
            localStorage.setItem('fullname', fullName);
          }
        })
        .catch(function (error) {
          console.log('error', error);
        })
    },
    login({
      commit
    }, payload) {
      api.login(payload.user)
        .then((response) => {
          const errors = response.data.errors;
          const user = response.data.user;
          if (errors) {
            commit('responseError', errors);
          }
          if (user) {
            const router = payload.router;
            const fullName = user.firstName
            commit('userCheckAuth', true);
            commit('userFullName', fullName);
            router.push({
              path: '/'
            });
            localStorage.setItem('fullname', fullName);
          }
        })
        .catch(function (error) {
          console.log('error', error);
        })
    },
    logout({
      commit
    }, payload) {
      api.logout()
        .then(() => {
          let router = payload.router;
          commit('userCheckAuth', false);
          router.push('/login');
          localStorage.removeItem('fullname')
        })
        .catch(error => {
          console.log(error);
        })
    },
    userCheckAuth({
      commit
    }) {
      api.checkToken()
        .then(() => {
          commit('userCheckAuth', true);
        })
        .catch((error) => {
          commit('userCheckAuth', false);
        })
    }
  },
  getters: {
    isAuth: state => {
      return !!state.userCheckAuth
    },
    userFullName: state => {
      return state.userFullName
    },
  }
})