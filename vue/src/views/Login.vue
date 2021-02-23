<template lang="pug">
.signup
  h1.text-center.mt-10 Login
  div.text-center
    span.mr-2 not a member?
    router-link(to="/signup") Register
  .form-wrapper.d-flex.justify-space-between.align-center
    v-form(v-on:submit.prevent)
      v-text-field(v-model="user.email" :error-messages="validationError.email" label="E-mail")
      v-text-field(v-model="user.password" :error-messages="validationError.password" label="Password" type="password")
      v-btn(type="submit" @click="onSubmit" class="mt-10") Login
</template>


<script>

export default {
  name: "login",
  data: () => ({
    user: {
      email: "",
      password: ""
    },
  }),
  computed: {
    validationError() {
      return this.$store.state.validationErrors
    },
  },

  methods: {
    onSubmit() {
      const payload = {
        user: this.user,
        router: this.$router
      }
      this.$store.dispatch('login', payload);
      },
    },
  };
</script>


<style scoped lang="scss">
.form-wrapper {
  height: 100%;
  form {
    width: 40vw;
    margin: auto;
  }
}
</style>