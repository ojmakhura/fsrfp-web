import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { switchMap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { AppState } from '@app/store/app-state';
import { SearchObject } from '@app/model/search-object';
import { Page } from '@app/model/page.model';
import { DocumentDTO } from '@app/model/bw/co/roguesystems/fsrfp/document/document-dto';
import { DocumentApi } from '@app/service/bw/co/roguesystems/fsrfp/document/document-api';
import { EntityType } from '@app/model/bw/co/roguesystems/fsrfp/entity-type';

export type DocumentApiState = AppState<DocumentDTO, DocumentDTO> & {};

const initialState: DocumentApiState = {
  data: new DocumentDTO(),
  dataList: [],
  dataPage: new Page<DocumentDTO>(),
  searchCriteria: new SearchObject<any>(),
  error: null,
  loading: false,
  success: false,
  messages: [],
  loaderMessage: '',
};

export const DocumentApiStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store: any) => {
    const documentApi = inject(DocumentApi);
    return {
      reset: () => {
        patchState(store, initialState);
      },
      findByDocumentType: rxMethod<{ documentTypeId: string | any }>(
        switchMap((data: any) => {
          patchState(store, { loading: true, loaderMessage: 'Loading ...' });
          return documentApi.findByDocumentType(data.documentTypeId).pipe(
            tapResponse({
              next: (dataList: DocumentDTO[] | any[]) => {
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
      findById: rxMethod<{ id: string | any }>(
        switchMap((data: any) => {
          patchState(store, { loading: true, loaderMessage: 'Loading ...' });
          return documentApi.findById(data.id).pipe(
            tapResponse({
              next: (data: DocumentDTO | any) => {
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
      findByTarget: rxMethod<{ target: EntityType | any; targetId: string | any }>(
        switchMap((data: any) => {
          patchState(store, { loading: true, loaderMessage: 'Loading ...' });
          return documentApi.findByTarget(data.target, data.targetId).pipe(
            tapResponse({
              next: (dataList: DocumentDTO[] | any[]) => {
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
          return documentApi.getAll().pipe(
            tapResponse({
              next: (dataList: DocumentDTO[] | any[]) => {
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
          return documentApi.getAllPaged(data.pageNumber, data.pageSize).pipe(
            tapResponse({
              next: (dataPage: Page<DocumentDTO> | any) => {
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
          return documentApi.remove(data.id).pipe(
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
      save: rxMethod<{ document: DocumentDTO | any }>(
        switchMap((data: any) => {
          patchState(store, { loading: true, loaderMessage: 'Loading ...' });
          return documentApi.save(data.document).pipe(
            tapResponse({
              next: (data: DocumentDTO | any) => {
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
          return documentApi.search(data.criteria).pipe(
            tapResponse({
              next: (dataList: DocumentDTO[] | any[]) => {
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
      upload: rxMethod<{
        target: EntityType | any;
        targetId: string | any;
        documentTypeId: string | any;
        file: File | any;
      }>(
        switchMap((data: any) => {
          patchState(store, { loading: true, loaderMessage: 'Loading ...' });
          return documentApi.upload(data.target, data.targetId, data.documentTypeId, data.file).pipe(
            tapResponse({
              next: (data: DocumentDTO | any) => {
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
      updateFile: rxMethod<{ id: string | any; file: File | any }>(
        switchMap((data: any) => {
          patchState(store, { loading: true, loaderMessage: 'Loading ...' });
          return documentApi.updateFile(data.id, data.file).pipe(
            tapResponse({
              next: (data: DocumentDTO | any) => {
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
    };
  }),
);
