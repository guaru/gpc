import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'gpc-slide-enabled',
  templateUrl: './slide-enabled.component.html',
  styleUrls: ['./slide-enabled.component.css']
})
export class SlideEnabledComponent implements OnInit {

  @Input() disabled : boolean  = false;
  @Input() enabled: boolean = false;
  @Output() checkEvent = new EventEmitter<boolean>();


  constructor() { }

  ngOnInit(): void {
  }


  onChangeEnabled($event:any){
      this.checkEvent.emit($event.checked);
  }

}
