import { Component, OnInit } from '@angular/core';
import { Turn } from 'src/app/core/models/turn.model';
import { TurnService } from './turn.service';

@Component({
  selector: 'gpc-list-turn',
  templateUrl: './list-turn.component.html'
})
export class ListTurnComponent implements OnInit {

   constructor(public turnService:TurnService) {}

    ngOnInit(): void {

    }

    onCreate():void {

    }

    onAttented($turn:Turn){
      console.log($turn.id);
    }


    onToAttention($turn:Turn){
      console.log($turn.id);
    }

}
