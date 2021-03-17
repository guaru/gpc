import { Component, OnInit } from '@angular/core';
import { UserHttpService } from 'src/app/administrator/users/user-http.service';
import { UserService } from 'src/app/administrator/users/user.service';
import { IEnabled } from 'src/app/core/interface/IEnabled';
import { SpinnerService } from 'src/app/shared/components/spinner/spinner.service';
import { OperadorService } from './operador.service';

@Component({
  selector: 'gpc-operador',
  templateUrl: './operador.component.html',
  providers : [OperadorService,UserHttpService]
})
export class OperadorComponent implements OnInit {

  constructor(public operadorService:OperadorService) { }

  async ngOnInit() {
    await this.operadorService.loadOperadores();
  }


  onChangeEnabled($event: boolean, id: string) {
    let ienabled: IEnabled = { id: id, enabled: $event };
    this.operadorService.enabled(ienabled);
  }

  onCreate()
  {
    this.operadorService.create();
  }

  onDelete(id: string) {
    this.operadorService.delete(id);
  }

  onUpdate(id: string) {
    this.operadorService.update(id);
  }

}
