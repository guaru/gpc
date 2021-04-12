import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Url } from 'src/app/core/enums/Url';
import { Util } from 'src/app/core/utils/Util';
import { PublicTurnService } from './public-turn.service';

@Component({
  selector: 'gpc-public-turn',
  templateUrl: './public-turn.component.html',
  providers:[PublicTurnService]
})
export class PublicTurnComponent implements OnInit {


  constructor(public publicTurnService:PublicTurnService) { }

  async ngOnInit() {
      await this.publicTurnService.init();
  }

}
