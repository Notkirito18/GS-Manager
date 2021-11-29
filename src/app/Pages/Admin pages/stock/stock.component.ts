import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import {
  capitalCase,
  colorer,
  getCount,
  IdGenerator,
} from 'src/app/shared/helper';
import { Product } from 'src/app/shared/models';
import { addProducts, loadProducts } from 'src/app/store/stock/stock.actions';
import { selectAllProducts } from 'src/app/store/stock/stock.selectors';
import { sizes, sweatColors, tshirtColors } from 'src/app/shared/constants';
import { MatDialog } from '@angular/material/dialog';
import { RestockComponent } from 'src/app/components/dialogs/restock/restock.component';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss'],
})
export class StockComponent implements OnInit, OnDestroy {
  stock: Product[] = [];
  stockRef$!: Subscription;

  constructor(
    private productsStore: Store<{ products: Product[] }>,
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.productsStore.dispatch(loadProducts());
    this.stockRef$ = this.productsStore
      .select(selectAllProducts)
      .subscribe((products) => {
        this.stock = products;
      });
  }

  ngOnDestroy(): void {
    this.stockRef$.unsubscribe();
  }

  openRestockDialog() {
    const dialogRef = this.dialog.open(RestockComponent, {
      width: '600px',
      maxHeight: '600px',
    });
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        let productsToAdd: Product[] = [];
        if (data.productType === 'mug') {
          console.log('mug data', data);
          for (let i = 0; i < data.products.amount; i++) {
            productsToAdd.push(
              new Product(
                this.IdGeneratorIdGenerator(),
                data.productType,
                undefined,
                undefined,
                data.products.mugType
              )
            );
          }

          if (data.products.additionalProducts.length > 0) {
            for (let i = 0; i < data.products.additionalProducts.length; i++) {
              for (
                let j = 0;
                j < data.products.additionalProducts[i].amount;
                j++
              ) {
                productsToAdd.push(
                  new Product(
                    this.IdGeneratorIdGenerator(),
                    data.productType,
                    undefined,
                    undefined,
                    data.products.additionalProducts[i].mugType
                  )
                );
              }
            }
          }
        } else {
          for (let i = 0; i < data.products.amount; i++) {
            productsToAdd.push(
              new Product(
                this.IdGeneratorIdGenerator(),
                data.productType,
                data.products.color,
                data.products.size
              )
            );
          }

          if (data.products.additionalProducts.length > 0) {
            for (let i = 0; i < data.products.additionalProducts.length; i++) {
              for (
                let j = 0;
                j < data.products.additionalProducts[i].amount;
                j++
              ) {
                productsToAdd.push(
                  new Product(
                    this.IdGeneratorIdGenerator(),
                    data.productType,
                    data.products.additionalProducts[i].color,
                    data.products.additionalProducts[i].size
                  )
                );
              }
            }
          }
        }

        // dispatching products
        this.productsStore.dispatch(addProducts({ products: productsToAdd }));
        console.log(productsToAdd);
      }
    });
  }

  sweatColors = sweatColors;
  tshirtColors = tshirtColors;
  sizes = sizes;
  getCount = getCount;
  colorer = colorer;
  capitalCase = capitalCase;
  IdGeneratorIdGenerator = IdGenerator;
}
