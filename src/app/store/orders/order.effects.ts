import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { OrderService } from 'src/app/shared/services/order.service';

@Injectable()
export class OrderEffects {
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

  constructor(private actions$: Actions, private orderService: OrderService) {}
}
