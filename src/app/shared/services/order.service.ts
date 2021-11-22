import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { ORDERS_MOCK } from '../ORDERS_MOCK';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  // constructor(private http: HttpClient) {}
  constructor() {}

  getAllOrders() {
    // return this.http.get<Product[]>(`${environment.URL}/products`);
    return of(ORDERS_MOCK);
  }
}
