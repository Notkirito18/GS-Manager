import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRecord from './record.reducer';

export const selectRecordState =
  createFeatureSelector<fromRecord.State>('records');

export const selectRecordIds = createSelector(
  selectRecordState,
  fromRecord.selectRecordIds // shorthand for recordState => fromRecord.selectRecordIds(recordState)
);
export const selectRecordEntities = createSelector(
  selectRecordState,
  fromRecord.selectRecordEntities
);
export const selectAllRecords = createSelector(
  selectRecordState,
  fromRecord.selectAllRecords
);
export const selectRecordTotal = createSelector(
  selectRecordState,
  fromRecord.selectRecordTotal
);
export const selectBalance = createSelector(
  selectRecordState,
  fromRecord.selectBalance
);
