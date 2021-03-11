import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from '@angular/material/button';

import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { ButtonSubmitComponent } from './components/button-submit/button-submit.component';
import { ButtonDeleteComponent } from './components/button-delete/button-delete.component';
import { RouterModule } from '@angular/router';
import { SharedMaterialModule } from './shared-material.module';
import { SlideEnabledComponent } from './components/slide-enabled/slide-enabled.component';
import { ButtonCreateComponent } from './components/button-create/button-create.component';
import { ButtonCancelComponent } from './components/button-cancel/button-cancel.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { SearchTextComponent } from './components/search-text/search-text.component';



@NgModule({
  declarations: [
    BreadcrumbsComponent,
    SidebarComponent,
    HeaderComponent,
    ButtonSubmitComponent,
    ButtonDeleteComponent,
    SlideEnabledComponent,
    ButtonCreateComponent,
    ButtonCancelComponent,
    SpinnerComponent,
    SearchTextComponent
  ],
  exports:[
    BreadcrumbsComponent,
    SidebarComponent,
    HeaderComponent,
    ButtonSubmitComponent,
    SlideEnabledComponent,
    ButtonCreateComponent,
    ButtonDeleteComponent,
    ButtonCancelComponent,
    SpinnerComponent,
    SearchTextComponent
  ],
  imports: [
    CommonModule,
    SharedMaterialModule,
    FormsModule,
    RouterModule,
  ]
})
export class SharedModule { }
