<template lang="pug">
.products
  .row
    .products__item.col-md-3(v-for="product in products")
      router-link(:to="'product-details/' + product._id")
        .px-2.pb-3
          img.products__item-img(:src="product.imgUrl")
          .products__item-name {{ product.name }}
          .products__item-price {{ product.price }} $
</template>

<script>
import api from "../config/axios";
export default {
  name: "Products",
  data: () => ({
    products: [],
  }),
  mounted() {
    api
      .getProducts()
      .then((response) => {
        this.products = response.data;
      })
      .catch((err) => {
        console.log(err);
      });
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