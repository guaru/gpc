import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'gpc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  recover : boolean
  constructor() {
    this.recover = false;
  }

  ngOnInit(): void {
  }

  onClickRecover(){
    this.recover = true;
  }

}
