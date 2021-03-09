<template lang='pug'>
  v-app
    Header
    router-view
</template>

<script>
import Header from './components/Header';

export default {
  name: 'App',
  components: {
    Header,
  },
  mounted() {
    let payload = this.$router;
    this.$store.dispatch('userCheckAuth', payload)
  }
}
</script>
