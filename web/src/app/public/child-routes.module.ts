import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { Url } from "../core/enums/Url";
import { PublicTurnComponent } from "./public-turn/public-turn.component";


const childRoutes: Routes =
  [
    { path: Url.SUCURSAL+Url.OFFICE_ID, component: PublicTurnComponent, data: { name: "Generar Turno" } },
  ];

@NgModule
  ({
    exports: [RouterModule],
    imports: [RouterModule.forChild(childRoutes)],
  }
  )
export class ChildRoutingModule { }
