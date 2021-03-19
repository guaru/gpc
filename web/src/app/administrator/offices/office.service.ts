import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { BehaviorSubject, merge, of as observableOf  } from 'rxjs';
import { catchError, delay, map, startWith, switchMap, tap } from 'rxjs/operators';
import { IEnabled } from 'src/app/core/interface/IEnabled';
import { IFilter } from 'src/app/core/interface/IFilter';
import { Office } from 'src/app/core/models/office.model';
import { PageRequest } from 'src/app/core/models/page-request.model';
import { PageResponse } from 'src/app/core/models/page-response.model';
import { AlertService } from 'src/app/core/services/alert.service';
import { CatalogHttpService } from 'src/app/core/services/catalog-http.service';
import { Util } from 'src/app/core/utils/Util';
import { SpinnerService } from 'src/app/shared/components/spinner/spinner.service';
import { OfficeModalComponent } from './office-modal/office-modal.component';
import { OfficeHttpService } from './office-http.service';

@Injectable()
export class OfficeService {

  private _columns: string[] = ["name", "key","address","state","enabled","action"];
  private _offices: Office[];
  private _pageRequest: PageRequest;
  private _resultsLength: number;
  public selectedOffice!: Office;

  private searchSubject = new BehaviorSubject<string>('');
  public search$ =  this.searchSubject.asObservable();

  paginator!: MatPaginator;


  constructor(private officeHttpService: OfficeHttpService,
    private dialog: MatDialog,
    private loadingService:SpinnerService,
    private alertService:AlertService) {
    this._offices = [];
    this._pageRequest = new PageRequest();
    this._pageRequest.filters = [{ name: 'filter' }] as IFilter[];
    this._resultsLength = 0;

  }

  public initTable(sort: MatSort, paginator: MatPaginator) {
    this.paginator = paginator;
    merge(sort.sortChange, paginator.page,this.search$)
      .pipe(
        startWith({}),
        delay(0),
        switchMap(() => {

          return this.getPages(paginator.pageIndex, paginator.pageSize);
        }),
        map((data: PageResponse<Office>) => {
          this.loadingService.endLoading();
          this._resultsLength = data.totalElements || 0;
          return data.content || [];
        }),
        catchError(() => {
          this.loadingService.endLoading();
          return observableOf([]);
        })
      ).subscribe(data => this._offices = data);
  }

  public getPages(offset: number, limit: number) {
    this.loadingService.initLoading();
    this._pageRequest.offset = offset;
    this._pageRequest.limit = limit;
    return this.officeHttpService.pages(this._pageRequest);
  }

  private openDialog()
  {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = this.selectedOffice;
    const dialogRef = this.dialog.open(OfficeModalComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      (data:Office) => {
        if(data){
          this.reload();
        }
      }
    );
  }

  public create(){
    this.selectedOffice = new Office();
    this.selectedOffice.enabled = true;
    this.openDialog();
  }

  public update(id:string)
  {
    this.selectedOffice = this.offices.find(x => x.id === id) || new Office();
    this.openDialog();
  }

  async  delete(id:string)
  {
   if(await this.alertService.confirm('Si elimina el área, las sucursales no podran utilizarla')){
     this.loadingService.initLoading();
     this.officeHttpService.delete(id).subscribe(response => {
       if(response){
          this.loadingService.endLoading();
          this.alertService.success();
          this._offices = this._offices.filter(x => x.id != id);
       }
     }, error => {
         this.loadingService.endLoading()
         this.alertService.error();
     }
     );
   }
  }



  public reload()
  {
    this.searchSubject.next('');
  }

  async enabled(ienabled:IEnabled){
      this.loadingService.initLoading();
      this.officeHttpService.enabled(ienabled).subscribe(response => {
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

  public search(filter:string)
  {
      debugger;
      this._pageRequest.filters![0].value = filter;
      this.searchSubject.next(filter);
  }

  public get(id:string):Promise<Office>
  {
       this.loadingService.initLoading();
      return  this.officeHttpService.get(id).pipe(tap(_=>this.loadingService.endLoading())).toPromise();
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
