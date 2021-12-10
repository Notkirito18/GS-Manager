import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, Action, on } from '@ngrx/store';
import { Record } from 'src/app/shared/models';

import * as RecordActions from './record.actions';

export interface State extends EntityState<Record> {
  // we have already ids and entities...
  // additional entity state properties
  balance: number;
}
export function selectRecordId(a: Record): string {
  //In this case this would be optional since primary key is id
  return a.id;
}

export function sortByName(a: Record, b: Record): number {
  if (a.date > b.date) {
    return -1;
  }
  if (a.date < b.date) {
    return 1;
  } else {
    return 0;
  }
}

export const adapter: EntityAdapter<Record> = createEntityAdapter<Record>({
  selectId: selectRecordId,
  sortComparer: sortByName,
});

export const initialState: State = adapter.getInitialState({
  ids: [],
  entities: {},
  // additional entity state properties
  balance: 0,
});

export const reducer = createReducer(
  initialState,
  on(RecordActions.loadRecords, (state) => {
    return state;
  }),
  on(RecordActions.loadRecordsSuccess, (state, { records }) => {
    return adapter.setAll(records, state);
  }),
  on(RecordActions.loadRecordsFailure, (state) => {
    // TODO report somehow the a load exception was raised...
    return state;
  }),

  // load balance
  on(RecordActions.loadBalance, (state) => {
    return state;
  }),
  on(RecordActions.loadBalanceSuccess, (state, { balance }) => {
    return {
      ...state,
      balance: balance,
    };
  }),

  // add record + success
  on(RecordActions.addRecord, (state, { record }) => {
    return state;
  }),

  on(RecordActions.addRecordSuccess, (state, { record }) => {
    return adapter.addOne(record, state);
  }),

  on(RecordActions.setRecord, (state, { record }) => {
    return adapter.setOne(record, state);
  }),
  on(RecordActions.upsertRecord, (state, { record }) => {
    return adapter.upsertOne(record, state);
  }),
  on(RecordActions.addRecords, (state, { records }) => {
    return adapter.addMany(records, state);
  }),
  on(RecordActions.upsertRecords, (state, { records }) => {
    return adapter.upsertMany(records, state);
  }),
  // update record + success
  on(RecordActions.updateRecord, (state, { update }) => {
    return adapter.updateOne(update, state);
  }),

  on(RecordActions.updateRecordSuccess, (state, { update }) => {
    return adapter.updateOne(update, state);
  }),

  on(RecordActions.updateRecords, (state, { updates }) => {
    return adapter.updateMany(updates, state);
  }),
  on(RecordActions.mapRecord, (state, { entityMap }) => {
    return adapter.mapOne(entityMap, state);
  }),
  on(RecordActions.mapRecords, (state, { entityMap }) => {
    return adapter.map(entityMap, state);
  }),
  // delete record + success
  on(RecordActions.deleteRecord, (state, { _id }) => {
    return state;
  }),
  on(RecordActions.deleteRecordSuccess, (state, { _id }) => {
    return adapter.removeOne(_id, state);
  }),

  on(RecordActions.deleteRecordsByPredicate, (state, { predicate }) => {
    return adapter.removeMany(predicate, state);
  }),

  on(RecordActions.clearRecords, (state) => {
    return adapter.removeAll({ ...state, selectedRecordsIds: [] });
  }),
  // balance edit
  on(RecordActions.editBalance, (state, { value, add }) => {
    return state;
  }),

  on(RecordActions.editBalanceSuccess, (state, { value, add }) => {
    if (add) {
      return {
        ...state,
        balance: state.balance + value,
      };
    } else {
      return {
        ...state,
        balance: state.balance - value,
      };
    }
  }),

  on(RecordActions.setBalance, (state, { value }) => {
    return {
      ...state,
      balance: value,
    };
  }),
  on(RecordActions.setBalanceSuccess, (state, { value }) => {
    return {
      ...state,
      balance: value,
    };
  })
);

// set selectors

// get the selectors
const { selectIds, selectEntities, selectAll, selectTotal } =
  adapter.getSelectors();

// select the array of record ids
export const selectRecordIds = selectIds;

// select the dictionary of record entities
export const selectRecordEntities = selectEntities;

// select the array of records
export const selectAllRecords = selectAll;

// select the total record count
export const selectRecordTotal = selectTotal;

export const selectBalance = (state: State) => state.balance;
