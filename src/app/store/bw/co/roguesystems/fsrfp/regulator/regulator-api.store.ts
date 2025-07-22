import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { switchMap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { AppState } from '@app/store/app-state';
import { SearchObject } from '@app/model/search-object';
import { Page } from '@app/model/page.model';
import { RegulatorDTO } from '@app/model/bw/co/roguesystems/fsrfp/regulator/regulator-dto';
import { DocumentTypeDTO } from '@app/model/bw/co/roguesystems/fsrfp/document/type/document-type-dto';
import { RegulatorApi } from '@app/service/bw/co/roguesystems/fsrfp/regulator/regulator-api';

export type RegulatorApiState = AppState<any, any> & {};

const initialState: RegulatorApiState = {
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

export const RegulatorApiStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store: any) => {
    const regulatorApi = inject(RegulatorApi);
    return {
      reset: () => {
        patchState(store, initialState);
      },
      findById: rxMethod<{ id: string | any }>(
        switchMap((data: any) => {
          patchState(store, { loading: true, loaderMessage: 'Loading ...' });
          return regulatorApi.findById(data.id).pipe(
            tapResponse({
              next: (data: RegulatorDTO | any) => {
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
          return regulatorApi.getAll().pipe(
            tapResponse({
              next: (dataList: DocumentTypeDTO[] | any[]) => {
                patchState(store, {
                  dataList,
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
          return regulatorApi.getAllPaged(data.pageNumber, data.pageSize).pipe(
            tapResponse({
              next: (dataPage: Page<RegulatorDTO> | any) => {
                patchState(store, {
                  dataPage,
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
          return regulatorApi.remove(data.id).pipe(
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
      save: rxMethod<{ regulator: RegulatorDTO | any }>(
        switchMap((data: any) => {
          patchState(store, { loading: true, loaderMessage: 'Loading ...' });
          return regulatorApi.save(data.regulator).pipe(
            tapResponse({
              next: (data: RegulatorDTO | any) => {
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
          return regulatorApi.search(data.criteria).pipe(
            tapResponse({
              next: (dataList: DocumentTypeDTO[] | any[]) => {
                patchState(store, {
                  data: dataList,
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
