import { Predicate } from '@angular/core';
import { Update, EntityMapOne, EntityMap } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { Record } from '../../shared/models';

export const loadRecords = createAction('[Record/API] Load Records');
export const loadRecordsSuccess = createAction(
  '[Record/API] Load Records Success',
  props<{ records: Record[] }>()
);
export const loadRecordsFailure = createAction(
  '[Record/API] Load Records Failure'
);

export const selectingRecordIds = createAction(
  '[Record/VIEW] Selecting Records',
  props<{ added: Record[]; removed: Record[] }>()
);

//*set records...
export const setRecords = createAction(
  '[Record/API] Set Records',
  props<{ records: Record[] }>()
);
export const addRecord = createAction(
  '[Record/API] Add Record',
  props<{ record: Record }>()
);
export const setRecord = createAction(
  '[Record/API] Set Record',
  props<{ record: Record }>()
);
export const upsertRecord = createAction(
  '[Record/API] Upsert Record',
  props<{ record: Record }>()
);
export const addRecords = createAction(
  '[Record/API] Add Records',
  props<{ records: Record[] }>()
);
export const upsertRecords = createAction(
  '[Record/API] Upsert Records',
  props<{ records: Record[] }>()
);
export const updateRecord = createAction(
  '[Record/API] Update Record',
  props<{ update: Update<Record> }>()
);
export const updateRecords = createAction(
  '[Record/API] Update Records',
  props<{ updates: Update<Record>[] }>()
);
export const mapRecord = createAction(
  '[Record/API] Map Record',
  props<{ entityMap: EntityMapOne<Record> }>()
);
export const mapRecords = createAction(
  '[Record/API] Map Records',
  props<{ entityMap: EntityMap<Record> }>()
);
export const deleteRecord = createAction(
  '[Record/API] Delete Record',
  props<{ _id: string }>()
);
export const deleteSelectedRecords = createAction(
  '[Record/API] Delete Records'
);
export const deleteRecordsByPredicate = createAction(
  '[Record/API] Delete Records By Predicate',
  props<{ predicate: Predicate<Record> }>()
);
export const clearRecords = createAction('[Record/API] Clear Records');

export const editBalance = createAction(
  '[Record/API] Edit Balance',
  props<{ value: number; add: boolean }>()
);
export const setBalance = createAction(
  '[Record/API] Set Balance',
  props<{ value: number }>()
);
