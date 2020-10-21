import { SortMethod } from './SortMethod';

export const PriceAscending = {
  ...SortMethod,
  handle: "price-ascending",
  name: "Price, Low to High",
  sort: (collection, variantData) => {
    return variantData.sort((l,r) => {
      return l.price - r.price;
    });
  }
};

export const PriceDescending = {
  ...PriceAscending,
  handle: 'price-descending',
  name: 'Price, High to Low',
  reverse: true
};
