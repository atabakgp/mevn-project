import Vue from 'vue';

export const ACTIONS = {
  SNACKBAR: 'snackbar',
  SHOW_MINI_CART: 'show_mini_cart'
};

const EventBus = new Vue();

export default EventBus;
