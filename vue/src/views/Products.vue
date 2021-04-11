<template lang="pug">
.products
  .row
    .products__item.col-md-3(v-for="product in allProducts")
      router-link(:to="'product-details/' + product._id")
        .px-2.pb-3
          img.products__item-img(:src="product.imgUrl")
          .products__item-name {{ product.name }}
          .products__item-price {{ product.price }} $
</template>

<script>
export default {
  name: "Products",
  mounted() {
    this.$store.dispatch("getAllProducts");
  },
  computed: {
    allProducts() {
      return this.$store.state.allProducts;
    },
  },
};
</script>

<style lang="scss" scoped>
.products {
  > .row {
    margin: 0;
  }
  &__item {
    > a {
      border: 1px solid;
      display: block;
    }
    &-img {
      width: 100%;
      height: 200px;
      object-fit: cover;
    }
  }
}
</style>