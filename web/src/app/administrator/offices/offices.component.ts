import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { IEnabled } from 'src/app/core/interface/IEnabled';
import { GlobalConstantsService } from 'src/app/core/services/global-constants.service';
import { OfficeHttpService } from './office-http.service';
import { OfficeService } from './office.service';

@Component({
  selector: 'gpc-offices',
  templateUrl: './offices.component.html',
  providers:[OfficeService, OfficeHttpService]
})
export class OfficesComponent implements  AfterViewInit   {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public officeService:OfficeService,public constanService:GlobalConstantsService) { }

  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    this.officeService.initTable(this.sort, this.paginator);
  }

  onChangeEnabled($event:boolean,id:string){
    let ienabled:IEnabled = { id : id,enabled : $event };
     this.officeService.enabled(ienabled);
  }

  onCreate(){
    this.officeService.create();
  }

  onUpdate(id:string){
      this.officeService.update(id);
      this.paginator.firstPage();
  }

  onDelete(id:string){
     this.officeService.delete(id);
  }

  onSearch(filter:string){
    this.officeService.search(filter);
 }


}
