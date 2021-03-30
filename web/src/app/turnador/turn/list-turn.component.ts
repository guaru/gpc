import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth/auth.service';
import { Turn } from 'src/app/core/models/turn.model';
import { TurnHtppService } from './turn-htpp.service';
import { TurnService } from './turn.service';

@Component({
  selector: 'gpc-list-turn',
  templateUrl: './list-turn.component.html',
  providers:  [TurnService,TurnHtppService]
})
export class ListTurnComponent implements OnInit, OnDestroy {

   constructor(public turnService:TurnService,private authService:AuthService) {}

    ngOnInit(): void {
      this.turnService.init(this.authService.user?.office?.id || '');
      this.turnService.initSocket();
    }

    ngOnDestroy(): void {
       this.turnService.endSocket();
    }

    onCreate():void {
        this.turnService.create();
    }

    onAttented($turn:Turn |null){
      console.log($turn?.id);
    }

    onToAttention($turn:Turn|null){
      console.log($turn?.id);
    }

}
