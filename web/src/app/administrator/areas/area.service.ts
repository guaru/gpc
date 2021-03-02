import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { BehaviorSubject , merge, of as observableOf} from 'rxjs';
import { catchError, delay, map, startWith, switchMap } from 'rxjs/operators';
import { ApiUri } from 'src/app/core/enums/ApiUri';
import { Area } from 'src/app/core/models/area.model';
import { PageRequest } from 'src/app/core/models/page-request.model';
import { PageResponse } from 'src/app/core/models/page-response.model';
import { GlobalEnviromentService } from 'src/app/core/services/global-enviroment.service';
import { Util } from 'src/app/core/utils/Util';

@Injectable()
export class AreaService {

  private _columns: string[] = ["name", "key", "enabled"];
  private _areas: Area[];

  private _pageRequest: PageRequest;
  private _resultsLength: number;
  public isFormActive:boolean = false;
  public selectedArea: Area | null;


  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();




  constructor(private http: HttpClient, private globalEnv: GlobalEnviromentService) {
    this._areas = [];
    this._pageRequest = new PageRequest();
    this._resultsLength = 0;
    this.selectedArea = null;
  }

  public initTable(sort: MatSort, paginator: MatPaginator) {
    merge(sort.sortChange, paginator.page)
      .pipe(
        startWith({}),
        delay(0),
        switchMap(() => {

          return this.getPages(paginator.pageIndex, paginator.pageSize);
        }),
        map((data: PageResponse<Function>) => {
          this.loadingSubject.next(false);
          this._resultsLength = data.totalElements || 0;
          return data.content || [];
        }),
        catchError(() => {
          this.loadingSubject.next(false);
          return observableOf([]);
        })
    ).subscribe(data => this._areas = data);
  }

  public getPages(offset: number, limit: number) {
    this.loadingSubject.next(true);
    this._pageRequest.offset = offset;
    this._pageRequest.limit = limit;
    return this.pageFunctions(this._pageRequest);
  }


  private pageFunctions(pageRequest: PageRequest) {
    let options: HttpParams = Util.createRequestOption(pageRequest);
    return this.http.get<PageResponse<Function>>(`${this.globalEnv.env.URL_API}${ApiUri.AREAS}`, { params: options });
  }

  public get resultsLength(): number {
    return this._resultsLength;
  }

  public get areas(): Area[] {
    return this._areas;
  }

  public get columns(): string[] {
    return this._columns;
  }
}
