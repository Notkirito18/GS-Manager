import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromOrder from './order.reducer';

export const selectOrderState =
  createFeatureSelector<fromOrder.State>('orders');

export const selectOrderIds = createSelector(
  selectOrderState,
  fromOrder.selectOrderIds // shorthand for orderState => fromOrder.selectOrderIds(orderState)
);
export const selectOrderEntities = createSelector(
  selectOrderState,
  fromOrder.selectOrderEntities
);
export const selectAllOrders = createSelector(
  selectOrderState,
  fromOrder.selectAllOrders
);
export const selectOrderTotal = createSelector(
  selectOrderState,
  fromOrder.selectOrderTotal
);
