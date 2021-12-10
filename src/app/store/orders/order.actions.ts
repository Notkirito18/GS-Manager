import { Predicate } from '@angular/core';
import { Update, EntityMapOne, EntityMap } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { Order } from '../../shared/models';

export const loadOrders = createAction('[Order/API] Load Orders');
export const loadOrdersSuccess = createAction(
  '[Order/API] Load Orders Success',
  props<{ orders: Order[] }>()
);
export const loadOrdersFailure = createAction(
  '[Order/API] Load Orders Failure'
);

export const selectingOrderIds = createAction(
  '[Order/VIEW] Selecting Orders',
  props<{ added: Order[]; removed: Order[] }>()
);

//*set orders...
export const setOrders = createAction(
  '[Order/API] Set Orders',
  props<{ orders: Order[] }>()
);

// add Order + success
export const addOrder = createAction(
  '[Order/API] Add Order',
  props<{ order: Order }>()
);
export const addOrderSuccess = createAction(
  '[Order/API] Add Order Success',
  props<{ order: Order }>()
);
export const setOrder = createAction(
  '[Order/API] Set Order',
  props<{ order: Order }>()
);
export const upsertOrder = createAction(
  '[Order/API] Upsert Order',
  props<{ order: Order }>()
);
export const addOrders = createAction(
  '[Order/API] Add Orders',
  props<{ orders: Order[] }>()
);
export const upsertOrders = createAction(
  '[Order/API] Upsert Orders',
  props<{ orders: Order[] }>()
);

// Update Order + success

export const updateOrder = createAction(
  '[Order/API] Update Order',
  props<{ update: Update<Order> }>()
);
export const updateOrderSuccess = createAction(
  '[Order/API] Update Order Success',
  props<{ update: Update<Order> }>()
);
export const updateOrders = createAction(
  '[Order/API] Update Orders',
  props<{ updates: Update<Order>[] }>()
);
export const mapOrder = createAction(
  '[Order/API] Map Order',
  props<{ entityMap: EntityMapOne<Order> }>()
);
export const mapOrders = createAction(
  '[Order/API] Map Orders',
  props<{ entityMap: EntityMap<Order> }>()
);

// Update Order + success
export const deleteOrder = createAction(
  '[Order/API] Delete Order',
  props<{ _id: string }>()
);
export const deleteOrderSuccess = createAction(
  '[Order/API] Delete Order Success',
  props<{ _id: string }>()
);
export const deleteSelectedOrders = createAction('[Order/API] Delete Orders');
export const deleteOrdersByPredicate = createAction(
  '[Order/API] Delete Orders By Predicate',
  props<{ predicate: Predicate<Order> }>()
);
export const clearOrders = createAction('[Order/API] Clear Orders');
