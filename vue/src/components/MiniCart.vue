<template lang="pug">
  div.mini-cart.py-5
    div.mini-cart__header.d-flex.justify-space-between.px-4
      div 
        strong Cart
      v-btn(@click="closeMiniCart" color="error") X
    div.text-center.pt-5(v-if="cartItems.length==0") Your shopping cart is empty 
    div.mini-cart__content.pt-9(v-else)
      div.d-flex.justify-space-between
        div.col-5 
          strong Product name
        div.col-3 
          strong Quantity
        div.col-2
          strong Price
      div(v-for="cartItem in cartItems" class="d-flex justify-space-between")
        div.col-5 {{cartItem.productName}}
        div.col-2.text-center {{ cartItem.quantity }}
        div.col-2.text-center {{ cartItem.price }} $
      div.col-12.d-flex.justify-space-between
        strong Total Price
        strong {{ totalPrice }} $
      hr
      div.mini-cart__links
        v-btn(type="button" @click="closeMiniCart" color="primary") Continue Shopping
        router-link(to="/") Go to cart
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
    },
    totalPrice() {
      let total = 0;
      this.$store.state.cart.map(p=>{
        total += p.price * p.quantity
      })

      return total;
    }
  },
  methods: {
    closeMiniCart() {
      this.$emit('closeMiniCart')
    }
  },
}
</script>

<style scoped lang="scss">
  .mini-cart {
    position: fixed;
    right: 0;
    bottom: 0;
    top: 0;
    width: 400px;
    background-color: #fff;
    z-index: 10;
    box-shadow: 3px 0px 8px 0px rgb(0 0 0 / 40%);
    &__links {
      width: 90%;
      margin: auto;
      text-align: center;
      padding-top: 20px;
      a  {
        display: block;
        text-align: center;
        text-decoration: none;
        padding: 10px 0;
      }
    }
  }
</style>