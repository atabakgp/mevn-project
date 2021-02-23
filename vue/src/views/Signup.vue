<template lang="pug">
.signup
  h1.text-center.mt-10 Sign Up
  div.text-center 
    span.mr-2 already a member?
    router-link(to="/login") Login
  .form-wrapper.d-flex.justify-space-between.align-center
    v-form(v-on:submit.prevent)
      v-text-field(v-model="user.firstName" :error-messages="validationError.firstName" label="First Name")
      v-text-field(v-model="user.lastName" :error-messages="validationError.lastName" label="Last Name")
      v-text-field(v-model="user.email" :error-messages="validationError.email" label="E-mail")
      v-text-field(v-model="user.password" :error-messages="validationError.password" label="Password" type="password")
      v-btn(type="submit" @click="onSubmit" class="mt-10") Submit
</template>


<script>
export default {
  name: "signup",
  data: () => ({
    user: {
      firstName: "",
      lastName: "",
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
      this.$store.dispatch('signup', payload);
      }
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