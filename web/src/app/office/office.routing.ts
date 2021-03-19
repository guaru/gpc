import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { Role } from "../core/enums/Role";
import { Url } from "../core/enums/Url";
import { AuthGuard } from "../shared/guards/auth.guard";
import { RoleGuard } from "../shared/guards/role.guard";
import { OfficeComponent } from "./office.component";

const routes: Routes =
[
    {
      path: Url.SUCURSAL,
      component : OfficeComponent,
      canActivate : [ AuthGuard,RoleGuard],
      canLoad:  [AuthGuard],
      loadChildren : ()=> import('./child-routes.module').then(md => md.ChildRoutingModule) ,
      data : {
        rol: [Role.ROLE_ADMIN_OFFICE]
      }
    }
];

@NgModule
    ({
        exports: [RouterModule],
        imports: [RouterModule.forChild(routes)]}
    )
export class OfficeRoutingModule{}
