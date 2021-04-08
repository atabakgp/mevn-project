<template lang='pug'>
v-app
  SideBar(v-if="this.$store.state.userCheckAuth")
  div(:class="{ main: this.$store.state.userCheckAuth }")
    Header
    transition(name="animate")
      router-view
  v-snackbar(v-model="snackbar", timeout="3000", top) {{ snackbarMessage }}
</template>

<script>
import Header from "./components/Header";
import EventBus, { ACTIONS } from "./EventBus/index";
import SideBar from "./components/SideBar";

export default {
  name: "App",
  components: {
    Header,
    SideBar,
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
.main {
  margin-left: 260px;
}
</style>
