import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Role } from '../core/enums/Role';
import { AuthGuard } from '../shared/guards/auth.guard';
import { RoleGuard } from '../shared/guards/role.guard';
import { AdministratorComponent } from './administrator.component';

const routes: Routes = [
  {
    path: 'administrador',
    component: AdministratorComponent,
    canActivate: [AuthGuard, RoleGuard],
    canLoad: [AuthGuard],
    loadChildren: () => import('./child-routes.module').then(md => md.ChildRoutesModule),
    data:{
         rol:[Role.ROLE_ADMIN]
    }

  }
];
@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [RouterModule]
})
export class AdministratorRoutingModule {}
