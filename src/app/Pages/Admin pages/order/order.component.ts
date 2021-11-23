import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Order, Product } from 'src/app/shared/models';
import {
  deleteOrder,
  loadOrders,
  updateOrder,
} from 'src/app/store/orders/order.actions';
import { selectAllOrders } from 'src/app/store/orders/order.selectors';
import {
  capitalCase,
  chipColorer,
  nextStatus,
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

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  constructor(
    private ordersStore: Store<{ orders: Order[] }>,
    private dialog: MatDialog
  ) {}

  activeOrdersData: Order[] = [];
  ordersHistoryData: Order[] = [];
  ngOnInit(): void {
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
    dialogRef.afterClosed().subscribe((newOrder) => {
      if (newOrder) {
        console.log(newOrder);
        //TODO DISPATCH NEW ORDER
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
          },
        },
      })
    );
  }

  activeOrdersDisplayedColumns = activeOrdersDisplayedColumns;
  ordersHistoryDisplayedColumns = ordersHistoryDisplayedColumns;
  capitalCase = capitalCase;
  productTypeBeautifier = productTypeBeautifier;
  chipColorer = chipColorer;
  nextStatus = nextStatus;
}
