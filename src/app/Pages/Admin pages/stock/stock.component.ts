import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { capitalCase, colorer, getCount } from 'src/app/shared/helper';
import { Product } from 'src/app/shared/models';
import { loadProducts } from 'src/app/store/stock/stock.actions';
import { selectAllProducts } from 'src/app/store/stock/stock.selectors';
import { sizes, sweatColors, tshirtColors } from 'src/app/shared/constants';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss'],
})
export class StockComponent implements OnInit, OnDestroy {
  stock: Product[] = [];
  stockRef$!: Subscription;

  constructor(private productsStore: Store<{ products: Product[] }>) {}
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
  sweatColors = sweatColors;
  tshirtColors = tshirtColors;
  sizes = sizes;
  getCount = getCount;
  colorer = colorer;
  capitalCase = capitalCase;
}
