import EventBus, { ACTIONS } from '../EventBus/index';

export const showSnackbar = message => {
  EventBus.$emit(ACTIONS.SNACKBAR, message);
};

export const showMiniCart = () => {
  EventBus.$emit(ACTIONS.SHOW_MINI_CART);
};