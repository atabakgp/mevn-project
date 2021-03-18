<template lang='pug'>
  div.header.pa-6
    nav.navigation
      v-container.d-flex.justify-space-between.align-center.pa-0
        router-link(to="/" class="black--text") LOGO
        div(v-if="!isLoggedIn")
          router-link(to="/login" class="black--text") Login
          router-link(to="/signup" class="black--text") Signup
        div.d-flex.align-center(v-else)
          div.black--text.mr-4 Hello {{ userFullName }}
          router-link(to="/profile" class="black--text") Profile
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
      color: #000;
      &:not(:last-child) {
        margin-right: 15px;
      }
    }
  }
</style>