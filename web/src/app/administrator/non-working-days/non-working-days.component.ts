import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { IEnabled } from 'src/app/core/interface/IEnabled';
import { GlobalConstantsService } from 'src/app/core/services/global-constants.service';
import { NonWorkingDayHttpService } from './non-working-day-http.service';
import { NonWorkingDaysService } from './non-working-days.service';

@Component({
  selector: 'gpc-non-working-days',
  templateUrl: './non-working-days.component.html',
  providers:[NonWorkingDaysService,NonWorkingDayHttpService]
})
export class NonWorkingDaysComponent implements AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public months: string[] = ["ENERO","FEBRERO","MARZO","ABRIL","MAYO","JUNIO","JULIO","AGOSTO","SEPTIEMBRE","OCTUBRE","NOVIEMBRE","DICIMBRE"];

  constructor(public nonWorkingDaysService: NonWorkingDaysService,
    public contantService:GlobalConstantsService) { }

  ngAfterViewInit():void {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    this.nonWorkingDaysService.initTable(this.sort, this.paginator);
  }

  onChangeEnabled($event: boolean,id:string) {
    let ienabled:IEnabled = { id : id,enabled : $event };
     this.nonWorkingDaysService.enabled(ienabled);
  }

  onCreate(){
    this.nonWorkingDaysService.create();
  }

  onUpdate(id:string){
      this.nonWorkingDaysService.update(id);
      this.paginator.firstPage();
  }

  onDelete(id:string){
     this.nonWorkingDaysService.delete(id);
  }

  onSearch(filter:string){
    this.nonWorkingDaysService.search(filter);
  }

}
