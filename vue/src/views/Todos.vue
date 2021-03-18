<template lang="pug">
  .container
    .todos
      .row
        SideBar
        div.col-md-6 Todos
</template>

<script>
import SideBar from "../components/SideBar";
export default {
  name: "ChangePassword",
  components: {
    SideBar,
  },
  };
</script>