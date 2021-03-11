import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalConstantHttpService {

  public CONTENT_TIYPEAPPLICATION_FORM_URLENCODED :string = "application/x-www-form-urlencoded";

  constructor(private alertService:AlertService) { }


  public handleError(error: HttpErrorResponse) {
    console.log(error.status);

    if (error.status === 408) {
      alert("La funte de datos, tardo mas de lo esperado");
    }

    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);


    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
}
