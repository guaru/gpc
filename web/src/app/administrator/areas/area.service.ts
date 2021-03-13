import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { BehaviorSubject , merge, of as observableOf} from 'rxjs';
import { catchError, delay, map, startWith, switchMap } from 'rxjs/operators';
import { ApiUri } from 'src/app/core/enums/ApiUri';
import { IEnabled } from 'src/app/core/interface/IEnabled';
import { IFilter } from 'src/app/core/interface/IFilter';
import { Area } from 'src/app/core/models/area.model';
import { PageRequest } from 'src/app/core/models/page-request.model';
import { PageResponse } from 'src/app/core/models/page-response.model';
import { AlertService } from 'src/app/core/services/alert.service';
import { GlobalEnviromentService } from 'src/app/core/services/global-enviroment.service';
import { Util } from 'src/app/core/utils/Util';
import { SpinnerService } from 'src/app/shared/components/spinner/spinner.service';
import { AreaFormComponent } from './area-form/area-form.component';
import { AreaHttpService } from './area-http.service';

@Injectable()
export class AreaService {

  private _columns: string[] = ["name", "key", "enabled","action"];
  private _areas: Area[];

  private _pageRequest: PageRequest;
  private _resultsLength: number;
  public isFormActive:boolean = false;
  public selectedArea: Area;
  private _searchSubject =new   BehaviorSubject<string>('');
  private _search$ = this._searchSubject.asObservable();



  constructor(private areaHttpService: AreaHttpService,
    private dialog: MatDialog,
    private loadingService:SpinnerService,
    private alertService:AlertService) {
    this._areas = [];
    this._pageRequest = new PageRequest();
    this._pageRequest.filters = [{ name: 'filter' }]  as IFilter[];
    this._resultsLength = 0;
    this.selectedArea = new Area();
  }

  public initTable(sort: MatSort, paginator: MatPaginator) {

    merge(sort.sortChange, paginator.page,this._search$)
      .pipe(
        startWith({}),
        delay(0),
        switchMap(() => {

          return this.getPages(paginator.pageIndex, paginator.pageSize);
        }),
        map((data: PageResponse<Area>) => {
          this.loadingService.endLoading();
          this._resultsLength = data.totalElements || 0;
          return data.content || [];
        }),
        catchError(() => {
          this.loadingService.endLoading();
          return observableOf([]);
        })
    ).subscribe(data => this._areas = data);
  }

  public getPages(offset: number, limit: number) {
    this.loadingService.initLoading();
    this._pageRequest.offset = offset;
    this._pageRequest.limit = limit;
    return this.areaHttpService.pages(this._pageRequest);
  }


  private openDialog()
  {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = this.selectedArea;
    const dialogRef = this.dialog.open(AreaFormComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      (data:Area) => {
        if(data){
          this.reload();
        }
      }
    );
  }


  public create(){
    this.selectedArea = new Area();
    this.selectedArea.enabled = true;
    this.openDialog();
  }

  public update(id:string)
  {
    this.selectedArea = this.areas.find(x => x.id === id) || new Area();
    this.openDialog();
  }

  async  delete(id:string)
  {
   if(await this.alertService.confirm('Si elimina el área, las sucursales no podran utilizarla')){
     this.loadingService.initLoading();
     this.areaHttpService.delete(id).subscribe(async response => {
       if(response){
          this.loadingService.endLoading();
          await this.alertService.success();
          this.reload();
       }
     }, error => {
         this.loadingService.endLoading()
         this.alertService.error();
     }
     );
   }
  }

  async enabled(ienabled:IEnabled){
      this.loadingService.initLoading();
      this.areaHttpService.enabled(ienabled).subscribe(response => {
        if (response) {
          this.loadingService.endLoading();
          this.alertService.success();
        }
      }, error => {
        this.loadingService.endLoading()
        this.alertService.error();
      }
      );
  }

  public search(filter:string){
    this._pageRequest.filters![0].value  = filter;
    this._searchSubject.next(filter);
  }

  public reload() {
    this._searchSubject.next('');
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
