<template lang='pug'>
v-container
  v-row
    v-col(md="6")
      h2.mb-4 Your Profile
      div
        strong First Name: {{ user.firstName }}
      div
        strong Last Name: {{ user.lastName }}
      div
        strong Email: {{ user.email }}
    v-col(md="6")
      .form-wrapper.d-flex.justify-space-between.align-center
        v-form.col-12(v-on:submit.prevent)
          v-text-field(
            v-model="updatedUser.firstName",
            label="First Name"
          )
          v-text-field(
            v-model="updatedUser.lastName", 
            label="Last Name"
          )
          v-text-field(
            v-model="updatedUser.email",
            label="Email")
          v-btn.mt-10(type="submit", 
            @click="updateUserData") Submit
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    user: {},
    updatedUser: {
      firstName: "",
      lastName: "",
      email: "",
    },
  }),
  name: "Profile",
  methods: {
    updateUserData() {
      axios
        .post("http://localhost:3000/profile", this.updatedUser, {
          withCredentials: true,
        })
        .then((res) => {
          const userName = res.data.user.firstName;
          this.$store.state.userFullName = userName;
          localStorage.setItem("fullname", userName);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    console.log("mounted");
    axios
      .get("http://localhost:3000/profile", {
        withCredentials: true,
      })
      .then((response) => {
        this.user = response.data.user;
      })
      .catch((error) => {
        const payload = {
          router: this.$router,
        };
        this.$store.dispatch("logout", payload);
      });
  },
};
</script>