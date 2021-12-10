import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError, exhaustMap } from 'rxjs/operators';
import { Order } from 'src/app/shared/models';
import { OrderService } from 'src/app/shared/services/order.service';
import {
  addOrder,
  addOrderSuccess,
  updateOrder,
  updateOrderSuccess,
  deleteOrder,
  deleteOrderSuccess,
} from './order.actions';

@Injectable()
export class OrderEffects {
  constructor(private actions$: Actions, private orderService: OrderService) {}

  loadOrderss$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Order/API] Load Orders'),
      mergeMap(() =>
        this.orderService.getAllOrders().pipe(
          map((orders) => {
            return {
              type: '[Order/API] Load Orders Success',
              orders,
            };
          }),
          catchError(() => EMPTY)
        )
      )
    )
  );

  addOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addOrder),
      exhaustMap((orderToAdd) =>
        this.orderService.addOrder(orderToAdd.order).pipe(
          map((order) => addOrderSuccess({ order })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  updateOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateOrder),
      exhaustMap((updatedOrder) =>
        this.orderService
          .updateOrder(updatedOrder.update.changes as Order)
          .pipe(
            map((order) =>
              updateOrderSuccess({
                update: { id: order.id, changes: order },
              })
            ),
            catchError(() => EMPTY)
          )
      )
    )
  );

  deleteOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteOrder),
      exhaustMap((idToDelete) =>
        this.orderService.deleteOrder(idToDelete._id).pipe(
          map((orderId) => deleteOrderSuccess({ _id: orderId })),
          catchError(() => EMPTY)
        )
      )
    )
  );
}
