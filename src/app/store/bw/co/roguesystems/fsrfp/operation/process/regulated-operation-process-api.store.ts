import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { switchMap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { AppState } from '@app/store/app-state';
import { SearchObject } from '@app/model/search-object';
import { Page } from '@app/model/page.model';
import { DocumentTypeDTO } from '@app/model/bw/co/roguesystems/fsrfp/document/type/document-type-dto';
import { RegulatedOperationProcessDTO } from '@app/model/bw/co/roguesystems/fsrfp/operation/process/regulated-operation-process-dto';
import { RegulatedOperationProcessApi } from '@app/service/bw/co/roguesystems/fsrfp/operation/process/regulated-operation-process-api';

export type RegulatedOperationProcessApiState = AppState<any, any> & {};

const initialState: RegulatedOperationProcessApiState = {
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

export const RegulatedOperationProcessApiStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store: any) => {
    const regulatedOperationProcessApi = inject(RegulatedOperationProcessApi);
    return {
      reset: () => {
        patchState(store, initialState);
      },
      findByRegulatedOperation: rxMethod<{ operationId: string | any }>(
        switchMap((data: any) => {
          patchState(store, { loading: true, loaderMessage: 'Loading ...' });
          return regulatedOperationProcessApi.findByRegulatedOperation(data.operationId).pipe(
            tapResponse({
              next: (data: RegulatedOperationProcessDTO[] | any[]) => {
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
      findById: rxMethod<{ id: string | any }>(
        switchMap((data: any) => {
          patchState(store, { loading: true, loaderMessage: 'Loading ...' });
          return regulatedOperationProcessApi.findById(data.id).pipe(
            tapResponse({
              next: (data: RegulatedOperationProcessDTO | any) => {
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
      getAll: rxMethod<void>(
        switchMap(() => {
          patchState(store, { loading: true, loaderMessage: 'Loading ...' });
          return regulatedOperationProcessApi.getAll().pipe(
            tapResponse({
              next: (data: DocumentTypeDTO[] | any[]) => {
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
          return regulatedOperationProcessApi.getAllPaged(data.pageNumber, data.pageSize).pipe(
            tapResponse({
              next: (data: Page<RegulatedOperationProcessDTO> | any) => {
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
          return regulatedOperationProcessApi.remove(data.id).pipe(
            tapResponse({
              next: (data: boolean | any) => {
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
      save: rxMethod<{ process: RegulatedOperationProcessDTO | any }>(
        switchMap((data: any) => {
          patchState(store, { loading: true, loaderMessage: 'Loading ...' });
          return regulatedOperationProcessApi.save(data.process).pipe(
            tapResponse({
              next: (data: RegulatedOperationProcessDTO | any) => {
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
          return regulatedOperationProcessApi.search(data.criteria).pipe(
            tapResponse({
              next: (data: DocumentTypeDTO[] | any[]) => {
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
