<template lang='pug'>
v-container
  v-row
    v-col(md="6")
      h2.mb-4 Your Profile
      div
        strong Full Name: {{user.firstName +' '+ user.lastName}}
      div
        strong Email: {{user.email}}    
      
    v-col(md="6")
      div.form-wrapper.d-flex.justify-space-between.align-center
        v-form(v-on:submit.prevent)
          v-text-field(v-model="updatedUser.firstName" label="First Name")
          v-text-field(v-model="updatedUser.lastName" label="Last Name")
          v-text-field(v-model="updatedUser.email" label="Email")
          v-btn(type="submit" class="mt-10") Submit
</template>

<script>
import axios from 'axios'

export default {
  data: () => ({
    user: {},
    updatedUser:{
      firstName: '',
      lastName: '',
      email: ''
    }
  }),
  name: 'Profile',
  mounted() {
    axios
      .get('http://localhost:3000/profile', {
        withCredentials: true
      })
      .then((response)=> {
        this.user = response.data.user;
        })
      .catch(error=> {
        const payload = {
          router: this.$router
        }
        this.$store.dispatch('logout',payload);
      })
    }
  }
</script>