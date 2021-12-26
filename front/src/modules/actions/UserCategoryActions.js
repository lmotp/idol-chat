export const MAIN_CATEGORY_ADD = 'MAIN_CATEGORY_ADD';
export const MAIN_CATEGORY_REMOVE = 'MAIN_CATEGORY_REMOVE';

export const mainCategoryAdd = (value) => ({
  type: MAIN_CATEGORY_ADD,
  value,
});
export const mainCategoryRemove = (value) => ({
  type: MAIN_CATEGORY_REMOVE,
  value,
});
