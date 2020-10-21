import { SortMethod } from './SortMethod';
import { liquidToDate } from '@process-creative/pc-slate-tools';

export const CreatedAscending = {
  ...SortMethod,
  name: 'Date, Oldest First',
  sort: (collection, variantData) => {
    return variantData.sort((l,r) => {
      if(!l.published_at_date) l.published_at_date = liquidToDate(l.product.published_at);
      if(!r.published_at_date) r.published_at_date = liquidToDate(r.product.published_at);
      return l.published_at_date - r.published_at_date;
    });
  },
  handle: 'created-ascending'
}

export const CreatedDescending = {
  ...CreatedAscending,
  handle: 'created-descending',
  name: 'Date, Newest First',
  reverse: true
}