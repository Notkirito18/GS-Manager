import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Order } from '../models';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}

  // get all

  getAllOrders(): Observable<Order[]> {
    let orders: Order[];
    var subject = new Subject<Order[]>();
    this.http.get<Order[]>(`${environment.URL}orders.json`).subscribe(
      (result) => {
        orders = Object.values(result).map(
          (item: Order) =>
            new Order(
              item.id,
              item.productType,
              item.price,
              item.status,
              new Date(item.statusChangeDate),
              item.logoDescription,
              item.logoImages,
              item.instaProfile,
              item.mugType,
              item.color,
              item.size,
              item.byAdmin
            )
        );
        subject.next(orders);
      },
      (error) => {
        console.log(error);
      }
    );
    return subject.asObservable();
  }

  // add

  addOrder(orderToAdd: Order) {
    this.http
      .post<Order>(`${environment.URL}orders.json`, orderToAdd)
      .subscribe();

    return of(orderToAdd);
  }

  // update

  updateOrder(updatedOrder: Order) {
    this.http
      .get<Order[]>(`${environment.URL}orders.json`)
      .subscribe((result) => {
        let afterUpdateArray = Object.values(result).map((item) => {
          if (item.id === updatedOrder.id) {
            return updatedOrder;
          } else {
            return item;
          }
        });
        this.http
          .put(`${environment.URL}orders.json`, afterUpdateArray)
          .subscribe();
      });
    return of(updatedOrder);
  }

  // delete

  deleteOrder(toDeleteOrderId: string) {
    this.http
      .get<Order[]>(`${environment.URL}orders.json`)
      .subscribe((result) => {
        let afterDeleteArray = Object.values(result).filter((item) => {
          return item.id !== toDeleteOrderId;
        });
        this.http
          .put(`${environment.URL}orders.json`, afterDeleteArray)
          .subscribe();
      });
    return of(toDeleteOrderId);
  }
}
