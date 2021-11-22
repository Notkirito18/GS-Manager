import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, Action, on } from '@ngrx/store';
import { Product } from 'src/app/shared/models';

import * as ProductActions from './stock.actions';

export interface State extends EntityState<Product> {
  // we have already ids and entities...
  // additional entity state properties
}
export function selectProductId(a: Product): string {
  //In this case this would be optional since primary key is id
  return a.id;
}

export function sortByName(a: Product, b: Product): number {
  return a.type.localeCompare(b.type);
}

export const adapter: EntityAdapter<Product> = createEntityAdapter<Product>({
  selectId: selectProductId,
  sortComparer: false,
});

export const initialState: State = adapter.getInitialState({
  ids: [],
  entities: {},
  // additional entity state properties
});

export const reducer = createReducer(
  initialState,
  on(ProductActions.loadProducts, (state) => {
    return state;
  }),
  on(ProductActions.loadProductsSuccess, (state, { products }) => {
    return adapter.setAll(products, state);
  }),
  on(ProductActions.loadProductsFailure, (state) => {
    // TODO report somehow the a load exception was raised...
    return state;
  }),

  on(ProductActions.addProduct, (state, { product }) => {
    return adapter.addOne(product, state);
  }),
  on(ProductActions.setProduct, (state, { product }) => {
    return adapter.setOne(product, state);
  }),
  on(ProductActions.upsertProduct, (state, { product }) => {
    return adapter.upsertOne(product, state);
  }),
  on(ProductActions.addProducts, (state, { products }) => {
    return adapter.addMany(products, state);
  }),
  on(ProductActions.upsertProducts, (state, { products }) => {
    return adapter.upsertMany(products, state);
  }),
  on(ProductActions.updateProduct, (state, { update }) => {
    return adapter.updateOne(update, state);
  }),
  on(ProductActions.updateProducts, (state, { updates }) => {
    return adapter.updateMany(updates, state);
  }),
  on(ProductActions.mapProduct, (state, { entityMap }) => {
    return adapter.mapOne(entityMap, state);
  }),
  on(ProductActions.mapProducts, (state, { entityMap }) => {
    return adapter.map(entityMap, state);
  }),
  on(ProductActions.deleteProduct, (state, { _id }) => {
    return adapter.removeOne(_id, state);
  }),

  on(ProductActions.deleteProductsByPredicate, (state, { predicate }) => {
    return adapter.removeMany(predicate, state);
  }),

  on(ProductActions.clearProducts, (state) => {
    return adapter.removeAll({ ...state, selectedProductsIds: [] });
  })
);

// set selectors

// get the selectors
const { selectIds, selectEntities, selectAll, selectTotal } =
  adapter.getSelectors();

// select the array of product ids
export const selectProductIds = selectIds;

// select the dictionary of product entities
export const selectProductEntities = selectEntities;

// select the array of products
export const selectAllProducts = selectAll;

// select the total product count
export const selectProductTotal = selectTotal;
