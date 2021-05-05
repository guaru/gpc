import { Component, OnInit } from '@angular/core';
import { RecoverFormService } from './recover-form.service';

@Component({
  selector: 'gpc-recover',
  templateUrl: './recover.component.html',
  styleUrls: ['./recover.component.css'],
  providers: [RecoverFormService]
})
export class RecoverComponent implements OnInit {

  constructor(public recoverService:RecoverFormService){
        this.recoverService.buildFields();
  }

  ngOnInit(): void {
  }

  async onRecover(){
    this.recoverService.recover();
  }

}
