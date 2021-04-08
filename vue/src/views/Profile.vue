<template lang='pug'>
.row.profile.mx-4.my-4
  .col-md-7
    v-card.px-4
      .title.success.white--text.py-5.pl-3 Edit your profile
      .form-wrapper.d-flex.justify-space-between.align-center
        v-form.col-12(v-on:submit.prevent)
          v-text-field(v-model="updatedUser.firstName", label="First Name")
          v-text-field(v-model="updatedUser.lastName", label="Last Name")
          v-text-field(v-model="updatedUser.email", label="Email")
          v-btn.mt-10(type="submit", @click="updateUserData") Update
  .col-md-5.text-center
    v-card
      div(class="profile__avatar")
        img(:src="user.avatar ? publicPath + user.avatar : defaultImgPath")
      v-divider 
      .pa-5.text-center
        .username.d-flex.justify-center
          div {{ showName }}
        span {{ user.email }}
</template>

<script>
import SideBar from "../components/SideBar";
import { getProfile, updateProfile } from "../config/axios";

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
  computed: {
    showName() {
      return this.user.firstName +' '+ this.user.lastName
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

<style lang="scss">
.profile {
  .title {
    position: relative;
    top: -30px;
    border-radius: 5px;
  }
  &__avatar {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    overflow: hidden;
    margin: auto;
    position: relative;
    top: -30px;
    margin-bottom: -10px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        object-fit: cover;

      }
  }
  .username {
    div {
      text-transform: capitalize;
    }
  }
}
</style>