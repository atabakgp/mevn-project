<template lang="pug">
.change-password
  .col-md-6 Orders
</template>

<script>
import SideBar from "../components/SideBar";
import api from "../config/axios";
export default {
  name: "ChangePassword",
  components: {
    SideBar,
  },

  mounted() {
    console.log('mounted');
    api
      .getProducts()
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>