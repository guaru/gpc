import { Component, OnInit } from '@angular/core';
import { GlobalConstantsService } from '../core/services/global-constants.service';

@Component({
  selector: 'gpc-public',
  templateUrl: './public.component.html'
})
export class PublicComponent implements OnInit {

  constructor(public globalConstants:GlobalConstantsService) { }

  ngOnInit(): void {

  }

}
