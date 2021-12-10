import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../models';

@Injectable({
  providedIn: 'root',
})
export class StockServiceService {
  constructor(private http: HttpClient) {}

  // get all

  getAllProducts(): Observable<Product[]> {
    var subject = new Subject<Product[]>();
    this.http.get<Product[]>(`${environment.URL}products.json`).subscribe(
      (result) => {
        subject.next(Object.values(result));
      },
      (error) => {
        console.log(error);
      }
    );
    return subject.asObservable();
  }

  // add

  addProduct(productToAdd: Product) {
    this.http
      .post<Product>(`${environment.URL}products.json`, productToAdd)
      .subscribe();

    return of(productToAdd);
  }

  addProducts(productsToAdd: Product[]) {
    for (let i = 0; i < productsToAdd.length; i++) {
      this.http
        .post<Product>(`${environment.URL}products.json`, productsToAdd[i])
        .subscribe();
    }

    return of(productsToAdd);
  }

  // update

  updateProduct(updatedProduct: Product) {
    this.http
      .get<Product[]>(`${environment.URL}products.json`)
      .subscribe((result) => {
        let afterUpdateArray = Object.values(result).map((item) => {
          if (item.id === updatedProduct.id) {
            return updatedProduct;
          } else {
            return item;
          }
        });
        this.http
          .put(`${environment.URL}products.json`, afterUpdateArray)
          .subscribe();
      });
    return of(updatedProduct);
  }

  // delete

  deleteProduct(toDeleteProductId: string) {
    this.http
      .get<Product[]>(`${environment.URL}products.json`)
      .subscribe((result) => {
        let afterDeleteArray = Object.values(result).filter((item) => {
          return item.id !== toDeleteProductId;
        });
        this.http
          .put(`${environment.URL}products.json`, afterDeleteArray)
          .subscribe();
      });
    return of(toDeleteProductId);
  }
}
