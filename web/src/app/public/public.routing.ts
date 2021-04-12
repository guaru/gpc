import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { Url } from "../core/enums/Url";
import { PublicComponent } from "./public.component";

const routes: Routes =
[
    {
        path: Url.PUBLIC,
        component: PublicComponent,
        loadChildren: () => import('./child-routes.module').then(md => md.ChildRoutingModule)
    },
];

@NgModule
    ({
        exports: [RouterModule],
        imports: [RouterModule.forChild(routes)],
    })
export class PublicRoutingModule{}
