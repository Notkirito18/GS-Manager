import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError, exhaustMap } from 'rxjs/operators';
import { Record } from 'src/app/shared/models';
import { RecordService } from 'src/app/shared/services/record.service';
import {
  addRecord,
  addRecordSuccess,
  deleteRecord,
  deleteRecordSuccess,
  editBalance,
  editBalanceSuccess,
  setBalance,
  setBalanceSuccess,
  updateRecord,
  updateRecordSuccess,
} from './record.actions';

@Injectable()
export class RecordEffects {
  constructor(
    private actions$: Actions,
    private recordService: RecordService
  ) {}

  loadRecordss$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Record/API] Load Records'),
      mergeMap(() =>
        this.recordService.getAllRecords().pipe(
          map((records) => {
            return {
              type: '[Record/API] Load Records Success',
              records,
            };
          }),
          catchError(() => EMPTY)
        )
      )
    )
  );

  loadBalance$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Balance/API] Load Balance'),
      mergeMap(() =>
        this.recordService.loadBalance().pipe(
          map((balance) => {
            return {
              type: '[Balance/API] Load Balance Success',
              balance,
            };
          }),
          catchError(() => EMPTY)
        )
      )
    )
  );

  addRecord$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addRecord),
      exhaustMap((recordToAdd) =>
        this.recordService.addRecord(recordToAdd.record).pipe(
          map((record) => addRecordSuccess({ record })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  updateRecord$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateRecord),
      exhaustMap((updatedRecord) =>
        this.recordService
          .updateRecord(updatedRecord.update.changes as Record)
          .pipe(
            map((record) =>
              updateRecordSuccess({
                update: { id: record.id, changes: record },
              })
            ),
            catchError(() => EMPTY)
          )
      )
    )
  );

  deleteRecord$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteRecord),
      exhaustMap((idToDelete) =>
        this.recordService.deleteRecord(idToDelete._id).pipe(
          map((recordId) => deleteRecordSuccess({ _id: recordId })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  editBalance$ = createEffect(() =>
    this.actions$.pipe(
      ofType(editBalance),
      exhaustMap((data) =>
        this.recordService.editBalance(data.value, data.add).pipe(
          map((data) =>
            editBalanceSuccess({ value: data.value, add: data.add })
          ),
          catchError(() => EMPTY)
        )
      )
    )
  );

  setBalance$ = createEffect(() =>
    this.actions$.pipe(
      ofType(setBalance),
      exhaustMap((data) =>
        this.recordService.setBalance(data.value).pipe(
          map((value) => setBalanceSuccess({ value: value })),
          catchError(() => EMPTY)
        )
      )
    )
  );
}
