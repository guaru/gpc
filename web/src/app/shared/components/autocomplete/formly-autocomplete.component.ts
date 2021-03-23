import { Component, ViewChild } from '@angular/core';
import { MatInput } from '@angular/material/input';
import { FieldType } from '@ngx-formly/core';
import { Observable } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
   selector: 'app-form-autocomplete-type',
   template: `
     <input matInput 
       [matAutocomplete]="auto"
       [formControl]="formControl" 
       [formlyAttributes]="field">
     <mat-autocomplete #auto="matAutocomplete" [displayWith]="displayProperty">
       <mat-option *ngFor="let value of filter | async" [value]="value">
         {{ value.label }}
       </mat-option>
     </mat-autocomplete>
   `,
 })
export class FormlyAutocomplete extends FieldType {
   @ViewChild(MatInput) formFieldControl!: MatInput;

  //filter!: Observable<any[]>;
  filter!: Observable<any>;

  ngOnInit() {
   this.filter = this.formControl.valueChanges
   .pipe(
     startWith(''),
     switchMap(term => this.to.filter(term)),
   );
  }

  public displayProperty(value: any) {
   if (value) {
     return value.label;
   }

   return '';
 };
}