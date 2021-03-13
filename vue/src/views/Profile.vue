<template lang='pug'>
  .container
    .row
      SideBar
      div.col-md-9
        div.col-md-12
        h2.mb-4 Your Information
        div.pa-2
          span.mr-4
            strong.mr-2 First Name:
            span {{ user.firstName }}
          span.mr-4
            strong.mr-2 Last Name:
            span {{ user.lastName }}
          span.mr-4
            strong.mr-2 Email:
            span {{ user.email }}
        v-divider    
        h2.pt-3 Edit your profile    
        div.form-wrapper.d-flex.justify-space-between.align-center
          v-form.col-12(v-on:submit.prevent)
            v-text-field(v-model="updatedUser.firstName", label="First Name")
            v-text-field(v-model="updatedUser.lastName", label="Last Name")
            v-text-field(v-model="updatedUser.email", label="Email")
            v-btn.mt-10(type="submit", @click="") Update
</template>

<script>
import SideBar from "../components/SideBar"
import {getProfile} from '../config/axios'

export default {
  components: {
    SideBar
  },
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
    // updateUserData() {
    //   axios
    //     .post("http://localhost:3000/user/profile", this.updatedUser, {
    //       withCredentials: true,
    //     })
    //     .then((res) => {
    //       const userName = res.data.user.firstName;
    //       this.$store.state.userFullName = userName;
    //       localStorage.setItem("fullname", userName);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // },
  },
  mounted() {
    getProfile()
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