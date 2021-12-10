import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Record } from '../models';

@Injectable({
  providedIn: 'root',
})
export class RecordService {
  constructor(private http: HttpClient) {}

  // get all

  getAllRecords(): Observable<Record[]> {
    let records: Record[];
    var subject = new Subject<Record[]>();
    this.http.get<Record[]>(`${environment.URL}records.json`).subscribe(
      (result) => {
        records = Object.values(result).map(
          (item: Record) =>
            new Record(
              item.id,
              item.type,
              item.description,
              new Date(item.date),
              item.value,
              item.add,
              item.productSold
            )
        );
        subject.next(records);
      },
      (error) => {
        console.log(error);
      }
    );
    return subject.asObservable();
  }

  // add

  addRecord(recordToAdd: Record) {
    this.http
      .post<Record>(`${environment.URL}records.json`, recordToAdd)
      .subscribe();

    return of(recordToAdd);
  }

  // update

  updateRecord(updatedRecord: Record) {
    this.http
      .get<Record[]>(`${environment.URL}records.json`)
      .subscribe((result) => {
        let afterUpdateArray = Object.values(result).map((item) => {
          if (item.id === updatedRecord.id) {
            return updatedRecord;
          } else {
            return item;
          }
        });
        this.http
          .put(`${environment.URL}records.json`, afterUpdateArray)
          .subscribe();
      });
    return of(updatedRecord);
  }

  // delete

  deleteRecord(toDeleteRecordId: string) {
    this.http
      .get<Record[]>(`${environment.URL}records.json`)
      .subscribe((result) => {
        let afterDeleteArray = Object.values(result).filter((item) => {
          return item.id !== toDeleteRecordId;
        });
        this.http
          .put(`${environment.URL}records.json`, afterDeleteArray)
          .subscribe();
      });
    return of(toDeleteRecordId);
  }

  // Balance

  // get

  loadBalance() {
    let balance: number;
    var subject = new Subject<number>();
    this.http.get<number>(`${environment.URL}balance.json`).subscribe(
      (result: number) => {
        balance = result;
        subject.next(balance);
      },
      (error) => {
        console.log(error);
      }
    );
    return subject.asObservable();
  }

  // edit

  editBalance(value: number, add: boolean) {
    this.http
      .get<number>(`${environment.URL}balance.json`)
      .subscribe((currentBalance) => {
        if (add) {
          this.http
            .put(`${environment.URL}balance.json`, currentBalance + value)
            .subscribe();
        } else {
          this.http
            .put(`${environment.URL}balance.json`, currentBalance - value)
            .subscribe();
        }
      });
    return of({ value: value, add: add });
  }

  // set

  setBalance(value: number) {
    this.http.put(`${environment.URL}balance.json`, value).subscribe();
    return of(value);
  }
}
