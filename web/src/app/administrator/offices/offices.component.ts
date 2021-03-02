import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { GlobalConstantsService } from 'src/app/core/services/global-constants.service';
import { OfficeService } from './office.service';

@Component({
  selector: 'gpc-offices',
  templateUrl: './offices.component.html',
  providers:[OfficeService]
})
export class OfficesComponent implements  AfterViewInit   {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public officeService:OfficeService,public constanService:GlobalConstantsService) { }

  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    this.officeService.initTable(this.sort, this.paginator);
  }

  onChangeEnabled($event:boolean){
    console.log($event);
  }



}
