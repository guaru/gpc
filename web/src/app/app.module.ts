import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//MODULOS
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';


//COMPONENTS
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdministratorModule } from './administrator/administrator.module';
import { OfficeModule } from './office/office.module';





@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    CoreModule,
    AdministratorModule,
    OfficeModule,
    AppRoutingModule,
    BrowserAnimationsModule


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
