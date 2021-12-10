import { Predicate } from '@angular/core';
import { Update, EntityMapOne, EntityMap } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { Product } from '../../shared/models';

export const loadProducts = createAction('[Product/API] Load Products');
export const loadProductsSuccess = createAction(
  '[Product/API] Load Products Success',
  props<{ products: Product[] }>()
);
export const loadProductsFailure = createAction(
  '[Product/API] Load Products Failure'
);

export const selectingProductIds = createAction(
  '[Product/VIEW] Selecting Products',
  props<{ added: Product[]; removed: Product[] }>()
);

//*set products...
export const setProducts = createAction(
  '[Product/API] Set Products',
  props<{ products: Product[] }>()
);
// add Product + success
export const addProduct = createAction(
  '[Product/API] Add Product',
  props<{ product: Product }>()
);
export const addProductSuccess = createAction(
  '[Product/API] Add Product Success',
  props<{ product: Product }>()
);
export const setProduct = createAction(
  '[Product/API] Set Product',
  props<{ product: Product }>()
);
export const upsertProduct = createAction(
  '[Product/API] Upsert Product',
  props<{ product: Product }>()
);
// add Products + success
export const addProducts = createAction(
  '[Product/API] Add Products',
  props<{ products: Product[] }>()
);
export const addProductsSuccess = createAction(
  '[Product/API] Add Products Success',
  props<{ products: Product[] }>()
);
export const upsertProducts = createAction(
  '[Product/API] Upsert Products',
  props<{ products: Product[] }>()
);
export const updateProduct = createAction(
  '[Product/API] Update Product',
  props<{ update: Update<Product> }>()
);
// delete Product + success
export const updateProducts = createAction(
  '[Product/API] Update Products',
  props<{ updates: Update<Product>[] }>()
);
export const updateProductSuccess = createAction(
  '[Product/API] Update Products Success',
  props<{ update: Update<Product> }>()
);
export const mapProduct = createAction(
  '[Product/API] Map Product',
  props<{ entityMap: EntityMapOne<Product> }>()
);
export const mapProducts = createAction(
  '[Product/API] Map Products',
  props<{ entityMap: EntityMap<Product> }>()
);
// delete pruduct + success
export const deleteProduct = createAction(
  '[Product/API] Delete Product',
  props<{ _id: string }>()
);
export const deleteProductSuccess = createAction(
  '[Product/API] Delete Product Success',
  props<{ _id: string }>()
);
export const deleteSelectedProducts = createAction(
  '[Product/API] Delete Products'
);
export const deleteProductsByPredicate = createAction(
  '[Product/API] Delete Products By Predicate',
  props<{ predicate: Predicate<Product> }>()
);
export const clearProducts = createAction('[Product/API] Clear Products');
