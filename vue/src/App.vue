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
  computed: {
    showLoading() {
      return this.$store.getters.showLoading
    },
  },
  mounted() {
    let payload = this.$router;
    this.$store.dispatch('userCheckAuth', payload)
  }
}
</script>
