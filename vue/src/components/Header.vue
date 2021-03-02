<template lang='pug'>
  div.header.pa-6.blue
    nav.navigation
      v-container.d-flex.justify-space-between.align-center.pa-0
        div(v-if="isLoggedIn")
          router-link(to="/" class="white--text") Home
          router-link(to="/profile" class="white--text") Profile
        div(v-if="!isLoggedIn")
          router-link(to="/login" class="white--text") Login
          router-link(to="/signup" class="white--text") Signup
        div.d-flex.align-center(v-else)
          div.white--text.mr-2
          div.white--text.mr-4 Welcome {{ userFullName }}
          v-btn(@click="userLogout") Logout
</template>

<script>

export default {
  name: 'Home',
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuth
    },
    userFullName() {
      return this.$store.getters.userFullName
    }
  },
  methods: {
    userLogout() {
      const payload = {
        router: this.$router
      }
      this.$store.dispatch('logout',payload);
    }
  }
}
</script>

<style scoped lang='scss'>
  header {
    height: 30px;
  }
  .navigation {
    a {
      text-decoration: none;
      &:not(:last-child) {
        margin-right: 15px;
      }
    }
  }
</style>