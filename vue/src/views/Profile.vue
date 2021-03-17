<template lang='pug'>
  div
    .container
      .row
        SideBar
        div.col-md-9
          div.col-md-12
          h2.mb-4 Your Information
          div.d-flex.justify-space-between.align-center.pb-3
            div.pa-2
              div.mr-4
                strong.mr-2 First Name:
                span {{ user.firstName }}
              div.mr-4
                strong.mr-2 Last Name:
                span {{ user.lastName }}
              div.mr-4
                strong.mr-2 Email:
                span {{ user.email }}
            div
              v-avatar(size="150" v-if="user.avatar")
                img(:src="publicPath + user.avatar")
              v-avatar(size="150" v-else)
                img(:src="defaultImgPath")
          v-divider    
          h2.pt-3 Edit your profile    
          div.form-wrapper.d-flex.justify-space-between.align-center
            v-form.col-12(v-on:submit.prevent)
              v-text-field(v-model="updatedUser.firstName", label="First Name")
              v-text-field(v-model="updatedUser.lastName", label="Last Name")
              v-text-field(v-model="updatedUser.email", label="Email")
              v-btn.mt-10(type="submit", @click="updateUserData") Update
</template>

<script>
import SideBar from "../components/SideBar"
import {getProfile, updateProfile} from '../config/axios'

export default {
  components: {
    SideBar,
  },
  data: () => ({
    user: {},
    updatedUser: {
      firstName: "",
      lastName: "",
      email: "",
    },
    publicPath: `${process.env.BASE_URL}uploads/avatars/`,
    defaultImgPath: `${process.env.BASE_URL}uploads/avatars/default/user.png`,

  }),
  name: "Profile",
  methods: {
    updateUserData() {
      updateProfile(this.updatedUser)
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