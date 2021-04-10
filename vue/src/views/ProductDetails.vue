<template lang="pug">
.container
  .row.product-details
    .col-md-8
      img(:src="product.imgUrl")
      div {{ product.name }}
      div {{ product.price }}
    .col-md-4
      span Quantity 
      v-text-field(type="number") 
      v-btn(type="button") Add to cart
</template>

<script>
import api from "../config/axios";
export default {
  name: "ProductDetails",
  data: () => ({
    product: {},
    addedProduct: {

    }
  }),
  mounted() {
    console.log(this.$route.params.id);
    const id = this.$route.params.id;
    api
      .getProductDetails(id)
      .then((response) => {
        this.product = response.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style lang="scss" scoped>
.product-details {
  img {
    width: 50%;
    margin: auto;
  }
}
</style>