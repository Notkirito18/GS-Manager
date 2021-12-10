import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Order, Product, Record } from 'src/app/shared/models';
import {
  addOrder,
  deleteOrder,
  loadOrders,
  updateOrder,
} from 'src/app/store/orders/order.actions';
import { selectAllOrders } from 'src/app/store/orders/order.selectors';
import {
  capitalCase,
  checkAvailability,
  checkAvailabilityMug,
  chipColorer,
  colorer,
  dateBeautifier,
  IdGenerator,
  nextStatus,
  productOrderedId,
  productTypeBeautifier,
} from 'src/app/shared/helper';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmComponent } from 'src/app/components/dialogs/delete-confirm/delete-confirm.component';
import { ChangeStatusComponent } from 'src/app/components/dialogs/change-status/change-status.component';
import { NewOrderComponent } from 'src/app/components/dialogs/new-order/new-order.component';
import {
  activeOrdersDisplayedColumns,
  ordersHistoryDisplayedColumns,
} from 'src/app/shared/constants';
import {
  addProduct,
  deleteProduct,
  loadProducts,
} from 'src/app/store/stock/stock.actions';
import { selectAllProducts } from 'src/app/store/stock/stock.selectors';
import { NotInStockComponent } from 'src/app/components/dialogs/not-in-stock/not-in-stock.component';
import { addRecord, editBalance } from 'src/app/store/records/record.actions';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  constructor(
    private mediaObserver: MediaObserver,
    private ordersStore: Store<{ orders: Order[] }>,
    private productsStore: Store<{ products: Product[] }>,
    private recordsStore: Store<{ records: Record[] }>,
    private dialog: MatDialog
  ) {}

  screenSize = 'lg';
  mediaSubscription!: Subscription;
  activeOrdersData: Order[] = [];
  ordersHistoryData: Order[] = [];
  ngOnInit(): void {
    // screen Size
    this.mediaSubscription = this.mediaObserver.media$.subscribe(
      (result: MediaChange) => {
        this.screenSize = result.mqAlias;
      }
    );
    // loading data
    this.productsStore.dispatch(loadProducts());
    this.ordersStore.dispatch(loadOrders());
    this.ordersStore.select(selectAllOrders).subscribe((orders) => {
      this.activeOrdersData = orders.filter((item) => {
        return item.status !== 'delivered';
      });
      this.ordersHistoryData = orders.filter((item) => {
        return item.status === 'delivered';
      });
    });
  }

  openCancelOrderDialog(order: Order): void {
    const dialogRef = this.dialog.open(DeleteConfirmComponent, {
      width: '250px',
      data: order,
    });

    dialogRef.afterClosed().subscribe((id) => {
      if (id) {
        this.productsStore.dispatch(
          addProduct({
            product: new Product(
              IdGenerator(),
              order.productType,
              order.color,
              order.size,
              order.mugType
            ),
          })
        );
        this.ordersStore.dispatch(deleteOrder({ _id: id }));
      }
    });
  }
  openStatusChangeDialog(order: Order): void {
    const dialogRef = this.dialog.open(ChangeStatusComponent, {
      width: '350px',
      data: order,
    });

    dialogRef.afterClosed().subscribe((order) => {
      if (order) {
        this.changeStatus(order);
      }
    });
  }

  openNewOrderDialog(): void {
    const dialogRef = this.dialog.open(NewOrderComponent, {
      width: '600px',
      maxHeight: '600px',
      data: new Order('', '', 0, 'new', new Date(), ''),
    });
    dialogRef.afterClosed().subscribe((data) => {
      let stock: Product[] = [];

      if (data) {
        // adding mug order
        this.productsStore.select(selectAllProducts).subscribe((products) => {
          stock = products;
        });
        if (data.productType === 'mug') {
          if (checkAvailabilityMug(stock, data.newOrder.mugType)) {
            const newOrder = new Order(
              this.IdGenerator(),
              data.productType,
              data.newOrder.price,
              'new',
              new Date(),
              data.newOrder.description,
              [data.newOrder.image],
              undefined,
              data.newOrder.mugType,
              undefined,
              undefined,
              true
            );
            this.ordersStore.dispatch(addOrder({ order: newOrder }));
          } else {
            this.dialog.open(NotInStockComponent, {
              width: '250px',
            });
          }
        } else {
          // adding sweat/shirt order
          if (
            checkAvailability(
              stock,
              data.productType,
              data.newOrder.color,
              data.newOrder.size
            )
          ) {
            const newOrder = new Order(
              this.IdGenerator(),
              data.productType,
              data.newOrder.price,
              'new',
              new Date(),
              data.newOrder.withLogo ? data.newOrder.logoDes : 'no-logo',
              [data.newOrder.logoImage],
              '',
              undefined,
              data.newOrder.color,
              data.newOrder.size,
              true
            );
            this.ordersStore.dispatch(addOrder({ order: newOrder }));
            this.productsStore.dispatch(
              deleteProduct({
                _id: productOrderedId(
                  stock,
                  data.productType,
                  data.newOrder.color,
                  data.newOrder.size
                ),
              })
            );
          } else {
            this.dialog.open(NotInStockComponent, {
              width: '250px',
            });
          }
        }
      }
    });
  }
  openEditOrderDialog(orderToEdit: Order): void {
    const dialogRef = this.dialog.open(NewOrderComponent, {
      width: '600px',
      maxHeight: '600px',
      data: orderToEdit,
    });
    dialogRef.afterClosed().subscribe((data) => {
      let stock: Product[] = [];
      let available = false;
      if (data) {
        // check availability
        this.productsStore.select(selectAllProducts).subscribe((products) => {
          stock = products;
        });
        if (orderToEdit.productType === 'mug') {
          available = checkAvailabilityMug(stock, data.newOrder.mugType);
        } else {
          available = checkAvailability(
            stock,
            data.productType,
            data.newOrder.color,
            data.newOrder.size
          );
        }
        if (available) {
          this.ordersStore.dispatch(
            updateOrder({
              update: {
                id: orderToEdit.id,
                changes: {
                  ...orderToEdit,
                  color: data.newOrder.color,
                  logoDescription: data.newOrder.logoDes,
                  logoImages: [data.newOrder.logoImage],
                  price: data.newOrder.price,
                  size: data.newOrder.size,
                },
              },
            })
          );
        } else {
          this.dialog.open(NotInStockComponent, {
            width: '250px',
          });
        }
      }
    });
  }

  changeStatus(order: Order) {
    const changedStatus = nextStatus(order.status);
    this.ordersStore.dispatch(
      updateOrder({
        update: {
          id: order.id,
          changes: {
            ...order,
            status: changedStatus,
            statusChangeDate: new Date(),
          },
        },
      })
    );
    if (changedStatus === 'delivered') {
      this.recordsStore.dispatch(
        addRecord({
          record: new Record(
            IdGenerator(),
            'Product Sale',
            order.productType,
            new Date(),
            order.price,
            true,
            order.productType === 'tshirt' ? 'shirt' : order.productType
          ),
        })
      );
      // dispatching balance edit
      this.recordsStore.dispatch(
        editBalance({ value: order.price, add: true })
      );
    }
  }

  activeOrdersDisplayedColumns = activeOrdersDisplayedColumns;
  ordersHistoryDisplayedColumns = ordersHistoryDisplayedColumns;
  capitalCase = capitalCase;
  productTypeBeautifier = productTypeBeautifier;
  chipColorer = chipColorer;
  nextStatus = nextStatus;
  IdGenerator = IdGenerator;
  colorer = colorer;
  checkAvailability = checkAvailability;
  checkAvailabilityMug = checkAvailabilityMug;
  productOrderedId = productOrderedId;
  dateBeautifier = dateBeautifier;
}
