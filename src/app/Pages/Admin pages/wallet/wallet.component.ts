import { Component, OnDestroy, OnInit } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { BalanceEditComponent } from 'src/app/components/dialogs/balance-edit/balance-edit.component';
import { EditRecordComponent } from 'src/app/components/dialogs/edit-record/edit-record.component';
import {
  dateBeautifier,
  editTypeToType,
  IdGenerator,
  recordDescriptionToIcon,
  recordIconChooser,
  recordsColorer,
} from 'src/app/shared/helper';
import { Record } from 'src/app/shared/models';
import {
  addRecord,
  deleteRecord,
  loadRecords,
  updateRecord,
  editBalance,
  setBalance,
  loadBalance,
} from 'src/app/store/records/record.actions';
import {
  selectAllRecords,
  selectAllRecordsAndBalance,
  selectBalance,
} from 'src/app/store/records/record.selectors';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss'],
})
export class WalletComponent implements OnInit, OnDestroy {
  constructor(
    private recordsStore: Store<{ records: Record[] }>,
    private mediaObserver: MediaObserver,
    private dialog: MatDialog
  ) {}

  screenSize = 'lg';
  mediaSubscription!: Subscription;
  balance!: number;
  records!: Record[];
  loading = true;

  ngOnInit(): void {
    // screen Size
    this.mediaSubscription = this.mediaObserver.media$.subscribe(
      (result: MediaChange) => {
        this.screenSize = result.mqAlias;
      }
    );
    // loading records
    this.recordsStore.dispatch(loadRecords());
    this.recordsStore.dispatch(loadBalance());
    this.recordsStore.select(selectAllRecordsAndBalance).subscribe((state) => {
      this.records = state.records;
      this.balance = state.balance;
      this.loading = false;
    });
  }

  ngOnDestroy(): void {
    this.mediaSubscription.unsubscribe();
  }

  openBalanceEditDialog(editType: string) {
    const dialogRef = this.dialog.open(BalanceEditComponent, {
      width: '300px',
      data: editType,
    });
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        if (editType !== 'edit') {
          this.recordsStore.dispatch(
            addRecord({
              record: new Record(
                IdGenerator(),
                editTypeToType(editType),
                data.description,
                new Date(),
                data.value,
                editType === 'financing'
              ),
            })
          );
          if (editType === 'financing') {
            this.recordsStore.dispatch(
              editBalance({ value: data.value, add: true })
            );
          } else {
            this.recordsStore.dispatch(
              editBalance({ value: data.value, add: false })
            );
          }
        } else {
          this.recordsStore.dispatch(
            addRecord({
              record: new Record(
                IdGenerator(),
                'Other',
                data.description,
                new Date(),
                Math.abs(data.value - this.balance),
                data.value > this.balance
              ),
            })
          );
          this.recordsStore.dispatch(setBalance({ value: data.value }));
        }
      }
    });
  }
  openEditRecordDialog(record: Record) {
    const dialogRef = this.dialog.open(EditRecordComponent, {
      width: '450px',
      data: record,
    });
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        if (data.delete) {
          this.recordsStore.dispatch(deleteRecord({ _id: record.id }));
          // fixing balance
          if (record.add) {
            this.recordsStore.dispatch(
              editBalance({ value: record.value, add: false })
            );
          } else {
            this.recordsStore.dispatch(
              editBalance({ value: record.value, add: true })
            );
          }
        } else {
          this.recordsStore.dispatch(
            updateRecord({
              update: {
                id: record.id,
                changes: {
                  ...record,
                  value: data.formValue.amount,
                  description: data.formValue.description,
                  date: data.formValue.date,
                  type: data.formValue.type,
                  add: data.add,
                },
              },
            })
          );
          // fixing balance
          let balanceDifference = 0;
          if (record.add) {
            balanceDifference -= record.value;
          } else {
            balanceDifference += record.value;
          }
          if (data.add) {
            balanceDifference += data.formValue.amount;
          } else {
            balanceDifference -= data.formValue.amount;
          }
          this.recordsStore.dispatch(
            editBalance({
              value: Math.abs(balanceDifference),
              add: balanceDifference > 0,
            })
          );
        }
      }
    });
  }

  dateBeautifier = dateBeautifier;
  recordsColorer = recordsColorer;
  recordIconChooser = recordIconChooser;
  recordDescriptionToIcon = recordDescriptionToIcon;
  IdGenerator = IdGenerator;
  editTypeToType = editTypeToType;
}
