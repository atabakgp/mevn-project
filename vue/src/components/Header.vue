<template lang='pug'>
.header.pa-6
  transition(name="fade")
    component(
      is="MiniCart",
      v-show="showMiniCart",
      v-on:closeMiniCart="closeMini"
    )
  v-overlay(:value="showMiniCart")
  nav.navigation
    v-container.d-flex.justify-space-between.align-center.pa-0
      router-link.black--text(to="/") Products
      .d-flex.align-center
        .mr-4.cart(@click="showMiniCart = !showMiniCart")
          v-icon mdi-cart
          .badge {{ badgeQuantity }}
        div(v-if="!isLoggedIn")
          router-link.black--text(to="/login") Login
          router-link.black--text(to="/signup") Signup
        .d-flex.align-center(v-else)
          router-link.black--text(to="/profile") 
            v-icon mdi-account
            span {{ userFullName }}
          v-btn(@click="userLogout") Logout
</template>

<script>
import MiniCart from "./MiniCart";
import EventBus, {ACTIONS} from "../EventBus/index";

export default {
  name: "Header",
  components: {
    MiniCart,
  },
  data: () => ({
    showMiniCart: false,
  }),
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuth;
    },
    userFullName() {
      return this.$store.getters.userFullName;
    },
    badgeQuantity() {
      return this.$store.getters.badgeQuantity;
    },
  },
  methods: {
    userLogout() {
      const payload = {
        router: this.$router,
      };
      this.$store.dispatch("logout", payload);
    },

    closeMini() {
      this.showMiniCart = false;
    },
  },
  created() {
    EventBus.$on(ACTIONS.SHOW_MINI_CART, () => {
      this.showMiniCart = true;
    });
  },
};
</script>

<style scoped lang='scss'>
header {
  height: 30px;
}
.navigation {
  a {
    text-decoration: none;
    color: #000;
    &:not(:last-child) {
      margin-right: 15px;
    }
  }
}
.cart {
  position: relative;
  .badge {
    width: 20px;
    height: 20px;
    background-color: black;
    border-radius: 50%;
    color: white;
    position: absolute;
    top: -10px;
    right: -10px;
    text-align: center;
    font-size: 13px;
    font-weight: bold;
    line-height: 1.5;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>