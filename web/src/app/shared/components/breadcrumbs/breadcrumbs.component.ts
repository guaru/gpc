import { Component, OnInit } from '@angular/core';
import {  ActivationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'gpc-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent {

  name: string ;
  constructor(private router:Router) {
    this.name = '';
    this.getDataRouter();
  }

  getDataRouter(){
    this.router.events
      .pipe(filter((event: any) => event instanceof ActivationEnd),
        filter((event: ActivationEnd) => event.snapshot.firstChild === null),
        map((event: ActivationEnd) => event.snapshot.data)
      )
      .subscribe(data => {
        this.name = data.name;
      });
  }

}
