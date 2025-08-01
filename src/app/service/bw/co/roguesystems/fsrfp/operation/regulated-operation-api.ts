// Generated by andromda-angular cartridge (service\service.impl.ts.vsl) CAN EDIT
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { RegulatedOperationListDTO } from '@app/model/bw/co/roguesystems/fsrfp/operation/regulated-operation-list-dto';
import { RegulatedOperationDTO } from '@app/model/bw/co/roguesystems/fsrfp/operation/regulated-operation-dto';
import { HttpClient } from '@angular/common/http';
import { Page } from '@app/model/page.model';
import { SearchObject } from '@app/model/search-object';

@Injectable({
  providedIn: 'root',
})
export class RegulatedOperationApi {
  protected path = '/operation';

  private http = inject(HttpClient);

  public findById(id: string | any): Observable<RegulatedOperationDTO | any> {
    return this.http.get<RegulatedOperationDTO | any>(`${this.path}/${id}`);
  }

  public findByRegulator(regulatorId: string | any): Observable<RegulatedOperationListDTO[] | any[]> {
    return this.http.get<RegulatedOperationListDTO[] | any[]>(
      `${this.path}/regulator/{regulatorId}/regulatorId/${regulatorId}`,
    );
  }

  public getAll(): Observable<RegulatedOperationListDTO[] | any[]> {
    return this.http.get<RegulatedOperationListDTO[] | any[]>(`${this.path}`);
  }

  public getAllPaged(
    pageNumber: number | any,
    pageSize: number | any,
  ): Observable<Page<RegulatedOperationListDTO> | any> {
    return this.http.get<Page<RegulatedOperationListDTO> | any>(
      `${this.path}/paged?pageNumber=${pageNumber}&pageSize=${pageSize}`,
    );
  }

  public remove(id: string | any): Observable<boolean | any> {
    return this.http.delete<boolean | any>(`${this.path}/${id}`);
  }

  public save(regulatedOperation: RegulatedOperationDTO | any): Observable<RegulatedOperationDTO | any> {
    return this.http.post<RegulatedOperationDTO | any>(`${this.path}`, regulatedOperation);
  }

  public search(criteria: string | any): Observable<RegulatedOperationListDTO[] | any[]> {
    return this.http.get<RegulatedOperationListDTO[] | any[]>(`${this.path}/search?criteria=${criteria}`);
  }
}
