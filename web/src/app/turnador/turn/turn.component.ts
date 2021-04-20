import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Turn } from 'src/app/core/models/turn.model';

@Component({
  selector: 'gpc-turn',
  templateUrl: './turn.component.html'
})
export class TurnComponent implements OnInit {

  @Input() turn!: Turn;
  @Output() eventAttented = new EventEmitter<Turn | null>();
  @Output() eventToAttention = new EventEmitter<Turn | null>();
  disabled:boolean =  false;
  labelAtendido = "Atendido";
  labelIngresar  = "Ingresar";

  constructor() { }

  ngOnInit(): void {

  }

  onAttented(){
    this.labelAtendido = "Loading..."
    this.disabled= true;
    this.eventAttented.emit(this.turn);
  }

  onToAttention(){
    this.labelIngresar = "Loading..."
    this.disabled = true;
    this.eventToAttention.emit(this.turn);
  }

}
