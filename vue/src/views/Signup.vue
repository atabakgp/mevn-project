<template lang="pug">
.signup
  h1.text-center.mt-10 Sign Up
  .text-center 
    span.mr-2 already a member?
    router-link(to="/login") Login
  .form-wrapper.d-flex.justify-space-between.align-center
    v-form(v-on:submit.prevent, ref="form" enctype="multipart/form-data")
      v-text-field(
        v-model="user.firstName",
        :rules="nameRules",
        label="First Name"
      )
      v-text-field(
        v-model="user.lastName",
        :rules="nameRules",
        label="Last Name"
      )
      v-text-field(
        v-model="user.email",
        :rules="emailRules",
        :error-messages="validationError.email",
        label="E-mail"
      )
      v-text-field(
        v-model="user.password",
        :rules="passwordRules",
        :counter="6",
        label="Password",
        type="password"
      )
      input(
        type="file",
        ref="file",
        name="avatar"
        @change="uploadAvatar"
      )
      v-btn.mt-10(type="submit", @click="onSubmit") Submit
</template>


<script>
export default {
  name: "signup",
  data: () => ({
    nameRules: [(v) => !!v || "This field is required"],
    passwordRules: [
      (v) => !!v || "Password is required",
      (v) => (v && v.length >= 5) || "Password must be more than 6 characters",
    ],
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    user: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      avatar: ""
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
        let formData = new FormData();
        formData.append('firstName', this.user.firstName)
        formData.append('lastName', this.user.lastName)
        formData.append('email', this.user.email)
        formData.append('password', this.user.password)
        formData.append('avatar', this.user.avatar)

        const payload = {
          user: formData,
          router: this.$router,
        };
        this.$store.dispatch("signup", payload);
      }
    },
    uploadAvatar() {
      this.user.avatar = this.$refs.file.files[0]
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