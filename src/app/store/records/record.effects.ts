import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { RecordService } from 'src/app/shared/services/record.service';

@Injectable()
export class RecordEffects {
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

  constructor(
    private actions$: Actions,
    private recordService: RecordService
  ) {}
}
