import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromProduct from './stock.reducer';

export const selectProductState =
  createFeatureSelector<fromProduct.State>('products');

export const selectProductIds = createSelector(
  selectProductState,
  fromProduct.selectProductIds // shorthand for productState => fromProduct.selectProductIds(productState)
);
export const selectProductEntities = createSelector(
  selectProductState,
  fromProduct.selectProductEntities
);
export const selectAllProducts = createSelector(
  selectProductState,
  fromProduct.selectAllProducts
);
export const selectProductTotal = createSelector(
  selectProductState,
  fromProduct.selectProductTotal
);
