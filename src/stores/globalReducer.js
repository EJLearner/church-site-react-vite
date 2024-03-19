import constants from '../utils/constants';

function updateCartCookie(cart) {
  const threeDaysInSeconds = 60 * 60 * 24 * 3;

  document.cookie = `${constants.COOKIE_KEYS.CART_DATA}=${encodeURIComponent(
    JSON.stringify(cart),
  )};max-age=${threeDaysInSeconds}`;
}

function globalReducer(state, action) {
  switch (action.type) {
    case 'add-to-cart': {
      const newCart = {...state.cart};
      if (!newCart[action.itemId]) {
        newCart[action.itemId] = {quantity: 0};
      }

      newCart[action.itemId].quantity += action.quantity;

      state = {...state, cart: newCart};

      updateCartCookie(newCart);
      return state;
    }

    case 'set-view-info': {
      state = {...state, viewInfo: action.viewInfo};
      return state;
    }

    case 'remove-item': {
      const newCart = {...state.cart};

      if (newCart[action.itemId]) {
        newCart[action.itemId].quantity = 0;
      }

      state = {...state, cart: newCart};

      updateCartCookie(newCart);
      return state;
    }

    default:
      return state;
  }
}

export default globalReducer;
