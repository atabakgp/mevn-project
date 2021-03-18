<template lang="pug">
  transition(name="slide")
    .signup
      h1.text-center.mt-10 Login
      .text-center
        span.mr-2 not a member?
        router-link(to="/signup") Register
      .form-wrapper.d-flex.justify-space-between.align-center
        v-form(v-on:submit.prevent, ref="form")
          v-text-field(
            v-model="user.email",
            :rules="emailRules",
            :error-messages="validationError.email",
            label="E-mail"
          )
          v-text-field(
            v-model="user.password",
            :rules="passwordRules",
            :error-messages="validationError.password",
            :counter="6"
            label="Password",
            type="password"
          )
          v-btn.mt-10(type="submit", @click="onSubmit") Login
</template>
<script>
export default {
  name: "login",
  data: () => ({
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    passwordRules: [
      (v) => !!v || "Password is required",
      (v) => (v && v.length >= 5) || "Password must be more than 6 characters",
    ],
    user: {
      email: "",
      password: "",
    },
  }),
  computed: {
    validationError() {
      return this.$store.state.validationErrors;
    },
  },

  methods: {
    onSubmit() {
      if (this.$refs.form.validate()) {
        const payload = {
          user: this.user,
          router: this.$router,
        };
        this.$store.dispatch("login", payload);
      }
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