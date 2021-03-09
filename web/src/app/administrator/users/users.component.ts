import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { UserService } from './user.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { GlobalConstantsService } from 'src/app/core/services/global-constants.service';
import { UserHttpService } from './user-http.service';

@Component({
  selector: 'gpc-users',
  templateUrl: './users.component.html',
  providers:[UserService,UserHttpService]
})
export class UsersComponent implements AfterViewInit  {


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public userService:UserService,public constantService:GlobalConstantsService) { }



  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    this.userService.initTable(this.sort,this.paginator);
  }

  onChangeEnabled($event: boolean) {
    console.log($event);
  }

  onCreate(){
    this.userService.create();
  }




}
