<template lang="pug">
  .container
    .contact-us
      .row
        SideBar
        div.col-md-6 Contact Us
</template>

<script>
import SideBar from "../components/SideBar";
export default {
  name: "ContactUs",
  components: {
    SideBar,
  },
};
</script>