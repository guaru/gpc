import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DashboardComponent } from "../administrator/dashboard/dashboard.component";
import { Url } from "../core/enums/Url";
import { ConfigurationComponent } from "./configuration/configuration.component";
import { OperadorComponent } from "./operador/operador.component";

const childRoutes: Routes =
[
    { path: '', component: DashboardComponent, data: { name: "Dashboard" } },
    { path: Url.CONFIGURACION, component: ConfigurationComponent, data: { name: "Configuración", icon:"mdi mdi-settings" } },
    { path: Url.OPERADORES, component: OperadorComponent, data: { name: "Operadores", icon: "mdi mdi-account-settings-variant" } },

];

@NgModule
({
        exports: [RouterModule],
        imports: [RouterModule.forChild(childRoutes)],
 }
)
export class ChildRoutingModule{}
