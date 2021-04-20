import { Component, OnInit } from '@angular/core';
import { OfficeHttpService } from 'src/app/administrator/offices/office-http.service';
import { OfficeService } from 'src/app/administrator/offices/office.service';
import { ConfigurationService } from './configuration.service';

@Component({
  selector: 'gpc-configuration',
  templateUrl: './configuration.component.html',
  providers: [ConfigurationService, OfficeService, OfficeHttpService ]
})
export class ConfigurationComponent implements OnInit {

  constructor(public configurationService:ConfigurationService) {}

  ngOnInit(): void {
    this.configurationService.setOffice();
  }



}
