<template lang="pug">
  div.mini-cart.py-5.px-5
    div.mini-cart__header.d-flex.justify-space-between
      div 
        strong Cart
      v-btn(@click="closeMiniCart") X {{ show }}
    div.text-center.pt-5(v-if="cartItems.length==0") Your shopping cart is empty 
    div.mini-cart__content.pt-9(v-else)
      div.d-flex.justify-space-between
        div 
          strong Product name
        div 
          strong Quantity
        div 
          strong Price
      div(v-for="cartItem in cartItems" class="d-flex justify-space-between py-2")
        div {{cartItem.productName}}
        div.text-center {{ cartItem.quantity }}
        div {{ cartItem.price }} $

</template>

<script>
export default {
  props: {
    show: {
      typeof: Boolean
    }
  },
  name: "MiniCart",
  computed: {
    cartItems() {
      return this.$store.state.cart;
    }
  },
  methods: {
    closeMiniCart() {
      this.$emit('closeMiniCart')
    }
  }
}
</script>

<style>
  .mini-cart {
    position: fixed;
    right: 0;
    bottom: 0;
    top: 0;
    width: 400px;
    background-color: #fff;
    z-index: 10;
    box-shadow: 3px 0px 8px 0px rgb(0 0 0 / 40%);
    }
</style>