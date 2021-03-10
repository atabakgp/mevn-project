<template lang='pug'>
.sidebar.col-3
  .sidebar__item(v-for="(item, i) in items", :key="i")
    router-link(:to="item.route")
      v-icon(v-text="item.icon")
      span {{ item.text }}
</template>

<script>
export default {
  name: "SideBar",
  data: () => ({
    items: [
      {
        text: "Orders",
        icon: "mdi-folder",
        route: "/orders",
      },
      {
        text: "Change password",
        icon: "mdi-account-multiple",
        route: "/change-password",
      },
      {
        text: "Contact us",
        icon: "mdi-star",
        route: "/contact-us",
      },
    ],
  }),
};
</script>

<style lang="scss">
.sidebar {
  &__item {
    margin-bottom: 20px;
    a {
      display: block;
      text-decoration: none;
      i {
        margin-right: 10px;
      }
    }
  }
}
</style>