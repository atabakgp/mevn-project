<template lang="pug">
.container
  .row.product-details(v-if="singleProduct")
    .col-md-8
      img(:src="singleProduct.imgUrl")
    .col-md-4
      div
        h2 {{ singleProduct.name }}
        div
          strong ${{ singleProduct.price }}
        v-text-field(type="number", value=0, v-model="productQuantity")
        v-btn(type="button", @click="addToCart") Add to cart
</template>

<script>
export default {
  name: "ProductDetails",
  data: () => ({
    productQuantity: 0,
  }),
  methods: {
    addToCart() {
      const price = this.singleProduct.price;
      const productId = this.singleProduct._id;
      const productName = this.singleProduct.name;
      const quantity = parseInt(this.productQuantity);
      const cartItem= {
        price,
        productId,
        quantity,
        productName
      }
      this.$store.dispatch("addProductToCart", cartItem);
      this.$emit("showMiniCart")
    },
  },
  mounted() {
    const id = this.$route.params.id;
    this.$store.dispatch("getProductDetails", id);
  },
  computed: {
    singleProduct() {
      return this.$store.state.singleProduct;
    },
  },
};
</script>

<style lang="scss" scoped>
.product-details {
  img {
    width: 100%;
    margin: auto;
  }
}
</style>