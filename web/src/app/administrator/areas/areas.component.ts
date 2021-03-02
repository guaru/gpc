import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { Url } from 'src/app/core/enums/Url';
import { Area } from 'src/app/core/models/area.model';
import { GlobalConstantsService } from 'src/app/core/services/global-constants.service';
import { SpinnerService } from 'src/app/shared/components/spinner/spinner.service';
import { AreaService } from './area.service';

@Component({
  selector: 'gpc-areas',
  templateUrl: './areas.component.html',
  providers:[AreaService]
})
export class AreasComponent implements AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public areaService: AreaService,
    public contantService:GlobalConstantsService,
    private router:Router,
    private spinnerService:SpinnerService) { }

  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    this.areaService.initTable(this.sort, this.paginator);
  }

  onChangeEnabled($event: boolean) {
    console.log($event);
  }

  onCreate(){
   this.areaService.selectedArea =  new Area();
   this.areaService.isFormActive  = true;
  }

  onCancel(){
    this.areaService.isFormActive =  false;
  }

}
