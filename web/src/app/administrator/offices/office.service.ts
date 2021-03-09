import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { BehaviorSubject, merge, of as observableOf  } from 'rxjs';
import { catchError, delay, map, startWith, switchMap } from 'rxjs/operators';
import { IEnabled } from 'src/app/core/interface/IEnabled';
import { Office } from 'src/app/core/models/office.model';
import { PageRequest } from 'src/app/core/models/page-request.model';
import { PageResponse } from 'src/app/core/models/page-response.model';
import { AlertService } from 'src/app/core/services/alert.service';
import { GlobalEnviromentService } from 'src/app/core/services/global-enviroment.service';
import { Util } from 'src/app/core/utils/Util';
import { SpinnerService } from 'src/app/shared/components/spinner/spinner.service';
import { OfficeFormComponent } from './office-form/office-form.component';
import { OfficeHttpService } from './office-http.service';

@Injectable()
export class OfficeService {

  private _columns: string[] = ["Nombre", "Clave","Direccion","Estado","Activa"];
  private _offices: Office[];
  private _pageRequest: PageRequest;
  private _resultsLength: number;
  public selectedOffice: Office;


  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();




  constructor(private officeHttpService: OfficeHttpService,
    private dialog: MatDialog,
    private loadingService:SpinnerService,
    private alertService:AlertService) {
    this._offices = [];
    this._pageRequest = new PageRequest();
    this._resultsLength = 0;
    this.selectedOffice = new Office();
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
    return this.officeHttpService.pages(this._pageRequest);
  }

  private openDialog()
  {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = this.selectedOffice;
    const dialogRef = this.dialog.open(OfficeFormComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      (data:Office) => {
        if(data){
          this._offices = this._offices.filter(x => x.id != data.id);
          this._offices.push(data);
        }
      }
    );
  }

  public create(){
    this.selectedOffice = new Office();
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
