<template lang="pug">
  .container
    .change-password
      .row
        SideBar
        div.col-md-6 Change password
</template>

<script>
import SideBar from '../components/SideBar'
export default {
  name: 'ChangePassword',
  components: {
    SideBar
  }
}
</script>