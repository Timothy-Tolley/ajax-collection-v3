import { SortMethod, getCollectionPosition, getVariantPosition } from './SortMethod';

//Manual
export const ManualSort = {
  ...SortMethod,
  handle: 'manual',
  name: 'Featured',
  isVisible: (template) => template.sort.getDefaultSortMethod() === 'manual',
  sort: (template, variants) => {
    return variants.sort((l,r) => {
      if(l.product.id === r.product.id) {
        let indexL = getVariantPosition(l);
        let indexR = getVariantPosition(r);
        return indexL - indexR;
      }

      let posL = getCollectionPosition(template, l);
      let posR = getCollectionPosition(template, r);
      return posL - posR;
    });
  }
};

//Best Selling (Same as featured)
export const BestSelling = {
  ...ManualSort,
  handle: 'best-selling',
  name: 'Featured',
  isVisible: (template) => template.sort.getDefaultSortMethod() === 'best-selling',
};
