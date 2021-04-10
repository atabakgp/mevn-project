<template lang='pug'>
v-app
  div(:class="{ main: this.$store.state.userCheckAuth }")
    Header
    router-view
  v-snackbar(v-model="snackbar", timeout="3000", top) {{ snackbarMessage }}
</template>

<script>
import Header from "./components/Header";
import EventBus, { ACTIONS } from "./EventBus/index";

export default {
  name: "App",
  components: {
    Header,
  },
  data: () => ({
    snackbar: false,
    snackbarMessage: "",
  }),
  mounted() {
    let payload = this.$router;
    this.$store.dispatch("userCheckAuth", payload);
    EventBus.$on(ACTIONS.SNACKBAR, (message) => {
      this.snackbarMessage = message;
      this.snackbar = true;
    });
  },
};
</script>

<style lang="scss">
</style>
