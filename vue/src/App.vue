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
};
</script>
