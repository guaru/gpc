import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'gpc-search-text',
  templateUrl: './search-text.component.html'
})
export class SearchTextComponent implements OnInit {

  search:string = '';
  @Output() eventSearch = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
  }

  onSearch(){
    this.eventSearch.emit(this.search);
  }

  onClear(){
    this.search = '';
    this.eventSearch.emit('');
  }

}
