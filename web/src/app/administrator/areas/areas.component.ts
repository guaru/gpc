import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { IEnabled } from 'src/app/core/interface/IEnabled';
import { GlobalConstantsService } from 'src/app/core/services/global-constants.service';
import { AreaHttpService } from './area-http.service';
import { AreaService } from './area.service';

@Component({
  selector: 'gpc-areas',
  templateUrl: './areas.component.html',
  providers:[AreaService,AreaHttpService]
})
export class AreasComponent implements AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public areaService: AreaService,
    public contantService:GlobalConstantsService) { }

  ngAfterViewInit():void {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    this.areaService.initTable(this.sort, this.paginator);
  }

  onChangeEnabled($event: boolean,id:string) {
    let ienabled:IEnabled = { id : id,enabled : $event };
     this.areaService.enabled(ienabled);
  }

  onCreate(){
    this.areaService.create();
  }

  onUpdate(id:string){
      this.areaService.update(id);
      this.paginator.firstPage();
  }

  onDelete(id:string){
     this.areaService.delete(id);
  }

  onSearch(filter:string){
    this.areaService.search(filter);
  }

}
