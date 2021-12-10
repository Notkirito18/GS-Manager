import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError, exhaustMap } from 'rxjs/operators';
import { Product } from 'src/app/shared/models';
import { StockServiceService } from '../../shared/services/stock-service.service';
import {
  addProduct,
  addProducts,
  addProductsSuccess,
  addProductSuccess,
  deleteProduct,
  deleteProductSuccess,
  updateProduct,
  updateProductSuccess,
} from './stock.actions';

@Injectable()
export class StockEffects {
  constructor(
    private actions$: Actions,
    private productService: StockServiceService
  ) {}

  loadProductss$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Product/API] Load Products'),
      mergeMap(() =>
        this.productService.getAllProducts().pipe(
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

  addProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addProduct),
      exhaustMap((productToAdd) =>
        this.productService.addProduct(productToAdd.product).pipe(
          map((product) => addProductSuccess({ product })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  addProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addProducts),
      exhaustMap((productsToAdd) =>
        this.productService.addProducts(productsToAdd.products).pipe(
          map((products) => addProductsSuccess({ products })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  updateProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateProduct),
      exhaustMap((updatedProduct) =>
        this.productService
          .updateProduct(updatedProduct.update.changes as Product)
          .pipe(
            map((product) =>
              updateProductSuccess({
                update: { id: product.id, changes: product },
              })
            ),
            catchError(() => EMPTY)
          )
      )
    )
  );

  deleteProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteProduct),
      exhaustMap((idToDelete) =>
        this.productService.deleteProduct(idToDelete._id).pipe(
          map((productId) => deleteProductSuccess({ _id: productId })),
          catchError(() => EMPTY)
        )
      )
    )
  );
}
