import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";

const filter_reducer = (state, action) => {
  switch (action.type) {
    case LOAD_PRODUCTS:
      const prices = action.payload.map((product) => product.price);
      return {
        ...state,
        filters: {
          ...state.filters,
          price: Math.max(...prices),
          max_price: Math.max(...prices),
        },
        all_products: [...action.payload],
        filtered_products: [...action.payload],
      };
    case SET_LISTVIEW:
      return {
        ...state,
        grid_view: false,
      };
    case SET_GRIDVIEW:
      return {
        ...state,
        grid_view: true,
      };
    case UPDATE_SORT:
      return { ...state, sort: action.payload };
    case SORT_PRODUCTS:
      const { sort, filtered_products } = state;
      let tempProducts = [...filtered_products];
      switch (sort) {
        case "price-lowest":
          tempProducts = tempProducts.sort((a, b) => a.price - b.price);
          break;
        case "price-highest":
          tempProducts = tempProducts.sort((a, b) => b.price - a.price);
          break;
        case "name-a":
          tempProducts = tempProducts.sort((a, b) =>
            a.name.localeCompare(b.name)
          );
          break;
        case "name-z":
          tempProducts = tempProducts.sort((a, b) =>
            b.name.localeCompare(a.name)
          );
          break;
        default:
          throw new Error(`No Matching "${action.type}" - action type`);
      }
      return { ...state, filtered_products: tempProducts };
    case UPDATE_FILTERS:
      const { name, value } = action.payload;
      return { ...state, filters: { ...state.filters, [name]: value } };
    case CLEAR_FILTERS:
      return {
        ...state,
        filters: {
          ...state.filters,
          text: "",
          company: "all",
          category: "all",
          color: "all",
          price: state.filters.max_price,
          shipping: false,
        },
      };
    case FILTER_PRODUCTS:
      const { all_products } = state;
      const { text, company, category, color, price, max_price, shipping } =
        state.filters;

      let filteredProducts = [...all_products];

      // text filter
      if (text) {
        filteredProducts = filteredProducts.filter((product) =>
          product.name.toLowerCase().startsWith(text.toLowerCase())
        );
      }

      // company filter
      if (company !== "all") {
        filteredProducts = filteredProducts.filter(
          (product) => product.company === company
        );
      }

      // category filter
      if (category !== "all") {
        filteredProducts = filteredProducts.filter(
          (product) => product.category === category
        );
      }

      // color filter
      if (color !== "all") {
        filteredProducts = filteredProducts.filter((product) =>
          product.colors.includes(color)
        );
      }

      // max price filter
      if (price < max_price) {
        filteredProducts = filteredProducts.filter(
          (product) => product.price <= price
        );
      }

      // shipping filter
      if (shipping) {
        filteredProducts = filteredProducts.filter(
          (product) => product.shipping
        );
      }

      return { ...state, filtered_products: filteredProducts };
    default:
      throw new Error(`No Matching "${action.type}" - action type`);
  }
};

export default filter_reducer;
