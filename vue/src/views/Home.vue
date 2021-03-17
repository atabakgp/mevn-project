<template lang='pug'>
div
  img(:src="`${publicPath}logo.png`")
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      publicPath: process.env.BASE_URL,
    };
  },
};
</script>
