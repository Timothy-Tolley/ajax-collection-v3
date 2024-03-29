import { COLOR_OPTIONS } from './../../constant/Constants';
import { FirstAvailableVariant } from './First';

export const AllColors = (product,template,selectVariant) => {
  let colorIndex = template.getOptionIndex(product, COLOR_OPTIONS);
  if(colorIndex === -1) return FirstAvailableVariant(product,template);
  let doneColors = [];

  return product.variants.filter(v => {
    let color = v.options[colorIndex];
    if(doneColors.indexOf(color) !== -1) return false;
    if(selectVariant && !selectVariant(v)) return false;
    doneColors.push(color);
    return true;
  });
}

export const AllAvailableColors = (product,template) => {
  return AllColors(product,template, v => template.isVariantAvailable(v));
};

export const AllSaleColors = (product,template) => {
  return AllColors(product,template,v => template.isVariantOnSale(v));
};

export const AllNonSaleColors = (product,template) => {
  return AllColors(product,template, v => !template.isVariantOnSale(v));
};

export const AllAvailableSaleColors = (product,template) => {
  return AllColors(product,template,v => template.isVariantAvailable(v) && template.isVariantOnSale(v));
}

export const AllAvailableNonSaleColors = (product,template) => {
  return AllColors(product,template,v => template.isVariantAvailable(v) && !template.isVariantOnSale(v));
}
