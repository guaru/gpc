import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Area } from 'src/app/core/models/area.model';
import { AreaFormService } from './area-form.service';

@Component({
  selector: 'gpc-area-form',
  templateUrl: './area-form.component.html',
  providers:[AreaFormService]
})
export class AreaFormComponent implements OnInit {

  @Input() area : Area | null  = new Area();
  @Output() eventCancel = new EventEmitter<boolean>();

  constructor(public areaFormService:AreaFormService) {

    this.areaFormService._model =  this.area !=null ? this.area :  new Area();
  }

  ngOnInit(): void {
  }


  onCancel(){
      this.eventCancel.emit(true);
  }

}
