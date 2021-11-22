import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { PRODUCTS_MOCK } from '../PRODUCTS_MOCK';

@Injectable({
  providedIn: 'root',
})
export class StockServiceService {
  // constructor(private http: HttpClient) {}
  constructor() {}

  getAllProducts() {
    // return this.http.get<Product[]>(`${environment.URL}/products`);
    return of(PRODUCTS_MOCK);
  }
}
