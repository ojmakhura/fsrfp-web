import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { switchMap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { AppState } from '@app/store/app-state';
import { SearchObject } from '@app/model/search-object';
import { Page } from '@app/model/page.model';
import { ProcessDTO } from '@app/model/bw/co/roguesystems/fsrfp/process/process-dto';
import { DocumentTypeDTO } from '@app/model/bw/co/roguesystems/fsrfp/document/type/document-type-dto';
import { ProcessApi } from '@app/service/bw/co/roguesystems/fsrfp/process/process-api';

export type ProcessApiState = AppState<any, any> & {};

const initialState: ProcessApiState = {
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

export const ProcessApiStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store: any) => {
    const processApi = inject(ProcessApi);
    return {
      reset: () => {
        patchState(store, initialState);
      },
      findById: rxMethod<{ id: string | any }>(
        switchMap((data: any) => {
          patchState(store, { loading: true, loaderMessage: 'Loading ...' });
          return processApi.findById(data.id).pipe(
            tapResponse({
              next: (data: ProcessDTO | any) => {
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
          return processApi.findByRegulator(data.regulatorId).pipe(
            tapResponse({
              next: (dataList: ProcessDTO[] | any[]) => {
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
      getAll: rxMethod<void>(
        switchMap(() => {
          patchState(store, { loading: true, loaderMessage: 'Loading ...' });
          return processApi.getAll().pipe(
            tapResponse({
              next: (dataList: ProcessDTO[] | any[]) => {
                patchState(store, {
                  dataList: dataList,
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
          return processApi.getAllPaged(data.pageNumber, data.pageSize).pipe(
            tapResponse({
              next: (dataPage: Page<ProcessDTO> | any) => {
                console.log('Data Page:', dataPage);

                dataPage.content = (dataPage.content || []).map((item: any) => {
                  item.regulatorId = item?.regulator?.id;
                  item.regulator = item?.regulator?.name;

                  return item;
                });

                patchState(store, {
                  dataPage: dataPage,
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
          return processApi.remove(data.id).pipe(
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
      save: rxMethod<{ process: ProcessDTO | any }>(
        switchMap((data: any) => {
          patchState(store, { loading: true, loaderMessage: 'Loading ...' });
          return processApi.save(data.process).pipe(
            tapResponse({
              next: (data: ProcessDTO | any) => {
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
          return processApi.search(data.criteria).pipe(
            tapResponse({
              next: (data: ProcessDTO[] | any[]) => {
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
