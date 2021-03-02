import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { BehaviorSubject, merge, of as observableOf  } from 'rxjs';
import { catchError, delay, map, startWith, switchMap } from 'rxjs/operators';
import { Office } from 'src/app/core/models/office.model';
import { PageRequest } from 'src/app/core/models/page-request.model';
import { PageResponse } from 'src/app/core/models/page-response.model';
import { GlobalEnviromentService } from 'src/app/core/services/global-enviroment.service';
import { Util } from 'src/app/core/utils/Util';

@Injectable()
export class OfficeService {

  private _columns: string[] = ["Nombre", "Clave","Direccion","Estado","Activa"];
  private _offices: Office[];
  private _pageRequest: PageRequest;
  private _resultsLength: number;


  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();




  constructor(private http: HttpClient, private globalEnv: GlobalEnviromentService) {
    this._offices = [];
    this._pageRequest = new PageRequest();
    this._resultsLength = 0;

  }

  public initTable(sort: MatSort, paginator: MatPaginator) {
    merge(sort.sortChange, paginator.page)
      .pipe(
        startWith({}),
        delay(0),
        switchMap(() => {

          return this.getPages(paginator.pageIndex, paginator.pageSize);
        }),
        map((data: PageResponse<Office>) => {
          this.loadingSubject.next(false);
          this._resultsLength = data.totalElements || 0;
          return data.content || [];
        }),
        catchError(() => {
          this.loadingSubject.next(false);
          return observableOf([]);
        })
      ).subscribe(data => this._offices = data);
  }

  public getPages(offset: number, limit: number) {
    this.loadingSubject.next(true);
    this._pageRequest.offset = offset;
    this._pageRequest.limit = limit;
    return this.pageUsers(this._pageRequest);
  }


  private pageUsers(pageRequest: PageRequest) {
    let options: HttpParams = Util.createRequestOption(pageRequest);
    return this.http.get<PageResponse<Office>>(`${this.globalEnv.env.URL_API}offices`, { params: options });
  }

  public get resultsLength(): number {
    return this._resultsLength;
  }

  public get offices(): Office[] {
    return this._offices;
  }

  public get columns(): string[] {
    return this._columns;
  }
}
