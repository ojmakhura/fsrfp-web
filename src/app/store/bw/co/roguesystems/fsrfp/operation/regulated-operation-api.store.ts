import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { switchMap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { AppState } from '@app/store/app-state';
import { SearchObject } from '@app/model/search-object';
import { Page } from '@app/model/page.model';
import { RegulatedOperationListDTO } from '@app/model/bw/co/roguesystems/fsrfp/operation/regulated-operation-list-dto';
import { RegulatedOperationDTO } from '@app/model/bw/co/roguesystems/fsrfp/operation/regulated-operation-dto';
import { RegulatedOperationApi } from '@app/service/bw/co/roguesystems/fsrfp/operation/regulated-operation-api';

export type RegulatedOperationApiState = AppState<any, any> & {};

const initialState: RegulatedOperationApiState = {
  data: null,
  dataList: [],
  dataPage: new Page<any>(),
  searchCriteria: new SearchObject<any>(),
  error: null,
  loading: false,
  success: false,
  messages: [],
  loaderMessage: '',
};

export const RegulatedOperationApiStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store: any) => {
    const regulatedOperationApi = inject(RegulatedOperationApi);
    return {
      reset: () => {
        patchState(store, initialState);
      },
      findById: rxMethod<{ id: string | any }>(
        switchMap((data: any) => {
          patchState(store, { loading: true, loaderMessage: 'Loading ...' });
          return regulatedOperationApi.findById(data.id).pipe(
            tapResponse({
              next: (data: RegulatedOperationDTO | any) => {
                patchState(store, {
                  data,
                  loading: false,
                  error: false,
                  success: true,
                  messages: [],
                });
              },
              error: (error: any) => {
                patchState(store, {
                  error,
                  loading: false,
                  success: false,
                  messages: [error?.error ? error.error : error],
                });
              },
            }),
          );
        }),
      ),
      findByRegulator: rxMethod<{ regulatorId: string | any }>(
        switchMap((data: any) => {
          patchState(store, { loading: true, loaderMessage: 'Loading ...' });
          return regulatedOperationApi.findByRegulator(data.regulatorId).pipe(
            tapResponse({
              next: (data: RegulatedOperationListDTO[] | any[]) => {
                patchState(store, {
                  dataList: data,
                  loading: false,
                  error: false,
                  success: true,
                  messages: [],
                });
              },
              error: (error: any) => {
                patchState(store, {
                  error,
                  loading: false,
                  success: false,
                  messages: [error?.error ? error.error : error],
                });
              },
            }),
          );
        }),
      ),
      getAll: rxMethod<void>(
        switchMap(() => {
          patchState(store, { loading: true, loaderMessage: 'Loading ...' });
          return regulatedOperationApi.getAll().pipe(
            tapResponse({
              next: (data: RegulatedOperationListDTO[] | any[]) => {
                patchState(store, {
                  dataList: data,
                  loading: false,
                  error: false,
                  success: true,
                  messages: [],
                });
              },
              error: (error: any) => {
                patchState(store, {
                  error,
                  loading: false,
                  success: false,
                  messages: [error?.error ? error.error : error],
                });
              },
            }),
          );
        }),
      ),
      getAllPaged: rxMethod<{ pageNumber: number | any; pageSize: number | any }>(
        switchMap((data: any) => {
          patchState(store, { loading: true, loaderMessage: 'Loading ...' });
          return regulatedOperationApi.getAllPaged(data.pageNumber, data.pageSize).pipe(
            tapResponse({
              next: (data: Page<RegulatedOperationListDTO> | any) => {
                patchState(store, {
                  dataPage: data,
                  loading: false,
                  error: false,
                  success: true,
                  messages: [],
                });
              },
              error: (error: any) => {
                patchState(store, {
                  error,
                  loading: false,
                  success: false,
                  messages: [error?.error ? error.error : error],
                });
              },
            }),
          );
        }),
      ),
      remove: rxMethod<{ id: string | any }>(
        switchMap((data: any) => {
          patchState(store, { loading: true, loaderMessage: 'Loading ...' });
          return regulatedOperationApi.remove(data.id).pipe(
            tapResponse({
              next: (data: boolean | any) => {
                patchState(store, {
                  loading: false,
                  error: false,
                  success: true,
                  messages: [],
                });
              },
              error: (error: any) => {
                patchState(store, {
                  error,
                  loading: false,
                  success: false,
                  messages: [error?.error ? error.error : error],
                });
              },
            }),
          );
        }),
      ),
      save: rxMethod<RegulatedOperationDTO>(
        switchMap((regulatedOperation: RegulatedOperationDTO) => {
          patchState(store, { loading: true, loaderMessage: 'Loading ...' });
          return regulatedOperationApi.save(regulatedOperation).pipe(
            tapResponse({
              next: (data: RegulatedOperationDTO | any) => {
                patchState(store, {
                  data,
                  loading: false,
                  error: false,
                  success: true,
                  messages: [],
                });
              },
              error: (error: any) => {
                patchState(store, {
                  error,
                  loading: false,
                  success: false,
                  messages: [error?.error ? error.error : error],
                });
              },
            }),
          );
        }),
      ),
      search: rxMethod<{ criteria: string | any }>(
        switchMap((data: any) => {
          patchState(store, { loading: true, loaderMessage: 'Loading ...' });
          return regulatedOperationApi.search(data.criteria).pipe(
            tapResponse({
              next: (data: RegulatedOperationListDTO[] | any[]) => {
                patchState(store, {
                  dataList: data,
                  loading: false,
                  error: false,
                  success: true,
                  messages: [],
                });
              },
              error: (error: any) => {
                patchState(store, {
                  error,
                  loading: false,
                  success: false,
                  messages: [error?.error ? error.error : error],
                });
              },
            }),
          );
        }),
      ),
    };
  }),
);
