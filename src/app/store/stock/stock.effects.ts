import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { StockServiceService } from '../../shared/services/stock-service.service';

@Injectable()
export class StockEffects {
  loadProductss$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Product/API] Load Products'),
      mergeMap(() =>
        this.StockServiceService.getAllProducts().pipe(
          map((products) => {
            return {
              type: '[Product/API] Load Products Success',
              products,
            };
          }),
          catchError(() => EMPTY)
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private StockServiceService: StockServiceService
  ) {}
}
