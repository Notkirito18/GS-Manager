import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Order, Product } from 'src/app/shared/models';
import { loadOrders } from 'src/app/store/orders/order.actions';
import { selectAllOrders } from 'src/app/store/orders/order.selectors';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private ordersStore: Store<{ orders: Order[] }>,
    private productsStore: Store<{ products: Order[] }>
  ) {
    this.matIconRegistry.addSvgIcon(
      `shirt`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/shirt.svg')
    );
    this.matIconRegistry.addSvgIcon(
      `hoody`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/hoody.svg')
    );
    this.matIconRegistry.addSvgIcon(
      `mug`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/mug.svg')
    );
  }

  displayedColumns: string[] = [
    'icon',
    'product',
    'color',
    'size',
    'logoDes',
    'price',
    'date',
    'status',
    'actions',
  ];
  activeOrdersData: Order[] = [];
  ngOnInit(): void {
    this.ordersStore.dispatch(loadOrders());
    this.ordersStore.select(selectAllOrders).subscribe((orders) => {
      this.activeOrdersData = orders;
    });
  }
}
