import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from "../actions";

const cart_reducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const { id, color, amount, product } = action.payload;

      const tempItem = state.cart.find((i) => i.id === id + color);

      if (tempItem) {
        const tempCart = [...state.cart];
        tempCart.map((cartItem, index) => {
          if ((cartItem.id = id + color)) {
            let newAmount = cartItem.amount + amount;
            if (newAmount > cartItem.max) {
              newAmount = cartItem.max;
            }
            return { ...cartItem, amount: newAmount };
          } else {
            return cartItem;
          }
        });
        return { ...state, cart: tempCart };
      } else {
        const newItem = {
          id: id + color,
          name: product.name,
          color,
          amount,
          image: product.images[0].url,
          price: product.price,
          max: product.stock,
        };
        return { ...state, cart: [...state.cart, newItem] };
      }
    case REMOVE_CART_ITEM:
      const tempCart = state.cart.filter((item) => item.id !== action.payload);
      return { ...state, cart: tempCart };
    case TOGGLE_CART_ITEM_AMOUNT:
      const { itemId, value } = action.payload;
      const toggledCart = state.cart.map((product) => {
        if (product.id === itemId && value <= product.max && value > 0) {
          return { ...product, amount: value };
        } else {
          return product;
        }
      });
      return { ...state, cart: toggledCart };
    case CLEAR_CART:
      return { ...state, cart: [] };
    case COUNT_CART_TOTALS:
      const { total_items, total_amount } = state.cart.reduce(
        (accumulator, currentValue) => {
          const { amount, price } = currentValue;
          accumulator.total_items += amount;
          accumulator.total_amount += price * amount;
          return accumulator;
        },
        {
          total_items: 0,
          total_amount: 0,
        }
      );
      return { ...state, total_items, total_amount };
    default:
      throw new Error(`No Matching "${action.type}" - action type`);
  }
};

export default cart_reducer;
