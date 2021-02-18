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



@NgModule({
  declarations: [
    BreadcrumbsComponent,
    SidebarComponent,
    HeaderComponent,
    ButtonSubmitComponent,
    ButtonDeleteComponent
  ],
  exports:[
    BreadcrumbsComponent,
    SidebarComponent,
    HeaderComponent,
    ButtonSubmitComponent
  ],
  imports: [
    CommonModule,
    SharedMaterialModule,
    RouterModule,
  ]
})
export class SharedModule { }
