import { Component, OnDestroy, OnInit } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { BalanceEditComponent } from 'src/app/components/dialogs/balance-edit/balance-edit.component';
import {
  capitalCase,
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
  editBalance,
  loadRecords,
  setBalance,
} from 'src/app/store/records/record.actions';
import {
  selectAllRecords,
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

  ngOnInit(): void {
    // screen Size
    this.mediaSubscription = this.mediaObserver.media$.subscribe(
      (result: MediaChange) => {
        this.screenSize = result.mqAlias;
      }
    );
    // loading records
    this.recordsStore.dispatch(loadRecords());
    this.recordsStore.select(selectAllRecords).subscribe((records) => {
      this.records = records;
    });
    // loading balance
    this.recordsStore.select(selectBalance).subscribe((balance) => {
      this.balance = balance;
    });
  }

  ngOnDestroy(): void {
    this.mediaSubscription.unsubscribe();
  }

  openBalanceEditDialog(editType: string) {
    const dialogRef = this.dialog.open(BalanceEditComponent, {
      width: '350px',
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
                data.value
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
                undefined,
                data.value > this.balance
              ),
            })
          );
          this.recordsStore.dispatch(setBalance({ value: data.value }));
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
