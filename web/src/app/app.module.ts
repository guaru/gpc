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
import { TurnadorModule } from './turnador/turnador.module';
import { PublicComponent } from './public/public.component';
import { PublicModule } from './public/public.module';





@NgModule({
  declarations: [
    AppComponent,
    PublicComponent,

  ],
  imports: [
    BrowserModule,
    CoreModule,
    AdministratorModule,
    OfficeModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TurnadorModule,
    PublicModule



  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
