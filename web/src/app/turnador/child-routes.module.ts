import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DashboardComponent } from "../administrator/dashboard/dashboard.component";
import { Url } from "../core/enums/Url";
import { ListTurnComponent } from "./turn/list-turn.component";


const childRoutes: Routes =
  [
    { path: '', component: ListTurnComponent, data: { name: "Turnos" } },
  ];

@NgModule
  ({
    exports: [RouterModule],
    imports: [RouterModule.forChild(childRoutes)],
  }
  )
export class ChildRoutingModule { }
