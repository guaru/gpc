import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  private _isLoading: boolean = false;

  private loadingSubject = new BehaviorSubject<boolean>(false);
  public isLoading$ = this.loadingSubject.asObservable();
  constructor() { }

  public initLoading(){
    this.loadingSubject.next(true);
  }

  public endLoading() {
    this.loadingSubject.next(false);
  }


}
