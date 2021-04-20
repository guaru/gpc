import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Url } from 'src/app/core/enums/Url';
import { Turn } from 'src/app/core/models/turn.model';
import { Util } from 'src/app/core/utils/Util';
import { TurnHtppService } from 'src/app/turnador/turn/turn-htpp.service';
import { PublicTurnService } from './public-turn.service';

@Component({
  selector: 'gpc-public-turn',
  templateUrl: './public-turn.component.html',
  providers:[PublicTurnService,TurnHtppService]
})
export class PublicTurnComponent implements OnInit {


  constructor(public publicTurnService:PublicTurnService) { }

  async ngOnInit() {
      await this.publicTurnService.init();
  }

  onSave($turn: Turn|null){
    this.publicTurnService.publishNewTurn($turn);
  }

}
