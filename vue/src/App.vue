<template lang='pug'>
  v-app
    Header
    router-view
</template>

<script>
import Header from './components/Header';
import axios  from 'axios';

export default {
  name: 'App',
  components: {
    Header,
  },
   mounted() {
      axios
        .get('http://localhost:3000/profile', {
          withCredentials: true
        })
        .then((response)=> {
          console.log(response)
        })
        .catch(function (error) {
          console.log('error',error);
        })
    }
};
</script>
