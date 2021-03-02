import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { GlobalConstantsService } from 'src/app/core/services/global-constants.service';
import { FunctionService } from './function.service';

@Component({
  selector: 'gpc-functions',
  templateUrl: './functions.component.html',
  providers: [FunctionService]
})
export class FunctionsComponent implements AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public functionService:FunctionService,public constantService:GlobalConstantsService) { }

  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    this.functionService.initTable(this.sort, this.paginator);
  }

  onChangeEnabled($event: boolean) {
    console.log($event);
  }

}
