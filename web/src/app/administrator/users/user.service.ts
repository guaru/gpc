import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PageRequest } from 'src/app/core/models/page-request.model';
import { PageResponse } from 'src/app/core/models/page-response.model';
import { User } from 'src/app/core/models/user.model';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, delay, map, startWith, switchMap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { UserHttpService } from './user-http.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UserFormComponent } from './user-form/user-form.component';

/**
 * SERVICE LOGIC USERS
 * @author Alejandro Ventura
 * @since  '8-03-2021
 */
@Injectable()
export class UserService {

  private _columns: string[] = ["Nombre", "Usuario","Activo"];// "Sucursal", "Roles"];
  private _users: User[];
  private  _pageRequest :PageRequest;
  private _resultsLength: number;
  private _selectUser!:User;


  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();



  constructor(private userHttpService:UserHttpService
    , private dialog: MatDialog) {
    this._users = [];
    this._pageRequest = new PageRequest();
    this._resultsLength = 0;

  }

  public initTable(sort: MatSort, paginator: MatPaginator){
    merge(sort.sortChange, paginator.page)
      .pipe(
        startWith({}),
        delay(0),
        switchMap(() => {
          return this.getPages(paginator.pageIndex,paginator.pageSize);
        }),
        map((data: PageResponse<User>) => {
          this.loadingSubject.next(false);
          this._resultsLength = data.totalElements || 0;
          return data.content || [];
        }),
        catchError(() => {
          this.loadingSubject.next(false);
          return observableOf([]);
        })
      ).subscribe(data => this._users = data);
  }

  public getPages(offset:number,limit:number){
    this.loadingSubject.next(true);
    this._pageRequest.offset = offset;
    this._pageRequest.limit = limit;
    return this.userHttpService.page(this._pageRequest);
  }


  private openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = this._selectUser;
    const dialogRef = this.dialog.open(UserFormComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      (data: User) => {

      }
    );
  }

  public create(){
    this._selectUser =  new User();
    this.openDialog();
  }


  public get resultsLength(): number {
    return this._resultsLength;
  }

  public get users(): User[] {
    return this._users;
  }

  public get columns(): string[] {
    return this._columns;
  }



}
