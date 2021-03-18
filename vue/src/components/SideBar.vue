<template lang='pug'>
.sidebar
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
        icon: "mdi-order-bool-descending",
        route: "/orders",
      },
      {
        text: "Change password",
        icon: "mdi-lock",
        route: "/change-password",
      },
      {
        text: "Contact us",
        icon: "mdi-credit-card-wireless-outline",
        route: "/contact-us",
      },
    ],
  }),
};
</script>

<style lang="scss">
.sidebar {
  position: fixed;
  top: 0;
  bottom: 0;
  background-color: #363636;
  z-index: 10;
  width: 260px;
  padding: {
    top: 50px;
    left: 30px;
  }
  &__item {
    margin-bottom: 30px;
    a {
      display: block;
      text-decoration: none;
      color: #fff !important;
      padding: 5px 0;
      padding-left: 10px;
      transition: .3s;
      i {
        margin-right: 10px;
        color: #fff !important;
      }
    }
    .router-link-exact-active {
      background-color: #fff;
      color: #000 !important;
      border-radius: 15px 0 0 15px;
      i {
        color: #000 !important;
      }
    }
  }
}
</style>