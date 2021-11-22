import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, Action, on } from '@ngrx/store';
import { Order } from 'src/app/shared/models';

import * as OrderActions from './order.actions';

export interface State extends EntityState<Order> {
  // we have already ids and entities...
  // additional entity state properties
}
export function selectOrderId(a: Order): string {
  //In this case this would be optional since primary key is id
  return a.id;
}

export function sortByName(a: Order, b: Order): number {
  return a.productType.localeCompare(b.productType);
}

export const adapter: EntityAdapter<Order> = createEntityAdapter<Order>({
  selectId: selectOrderId,
  sortComparer: false,
});

export const initialState: State = adapter.getInitialState({
  ids: [],
  entities: {},
  // additional entity state properties
});

export const reducer = createReducer(
  initialState,
  on(OrderActions.loadOrders, (state) => {
    return state;
  }),
  on(OrderActions.loadOrdersSuccess, (state, { orders }) => {
    return adapter.setAll(orders, state);
  }),
  on(OrderActions.loadOrdersFailure, (state) => {
    // TODO report somehow the a load exception was raised...
    return state;
  }),

  on(OrderActions.addOrder, (state, { order }) => {
    return adapter.addOne(order, state);
  }),
  on(OrderActions.setOrder, (state, { order }) => {
    return adapter.setOne(order, state);
  }),
  on(OrderActions.upsertOrder, (state, { order }) => {
    return adapter.upsertOne(order, state);
  }),
  on(OrderActions.addOrders, (state, { orders }) => {
    return adapter.addMany(orders, state);
  }),
  on(OrderActions.upsertOrders, (state, { orders }) => {
    return adapter.upsertMany(orders, state);
  }),
  on(OrderActions.updateOrder, (state, { update }) => {
    return adapter.updateOne(update, state);
  }),
  on(OrderActions.updateOrders, (state, { updates }) => {
    return adapter.updateMany(updates, state);
  }),
  on(OrderActions.mapOrder, (state, { entityMap }) => {
    return adapter.mapOne(entityMap, state);
  }),
  on(OrderActions.mapOrders, (state, { entityMap }) => {
    return adapter.map(entityMap, state);
  }),
  on(OrderActions.deleteOrder, (state, { _id }) => {
    return adapter.removeOne(_id, state);
  }),

  on(OrderActions.deleteOrdersByPredicate, (state, { predicate }) => {
    return adapter.removeMany(predicate, state);
  }),

  on(OrderActions.clearOrders, (state) => {
    return adapter.removeAll({ ...state, selectedOrdersIds: [] });
  })
);

// set selectors

// get the selectors
const { selectIds, selectEntities, selectAll, selectTotal } =
  adapter.getSelectors();

// select the array of order ids
export const selectOrderIds = selectIds;

// select the dictionary of order entities
export const selectOrderEntities = selectEntities;

// select the array of orders
export const selectAllOrders = selectAll;

// select the total order count
export const selectOrderTotal = selectTotal;
