import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { RECORDS_MOCK } from '../RECORDS_MOCK';

@Injectable({
  providedIn: 'root',
})
export class RecordService {
  // constructor(private http: HttpClient) {}
  constructor() {}

  getAllRecords() {
    // return this.http.get<Product[]>(`${environment.URL}/products`);
    return of(RECORDS_MOCK);
  }
}
