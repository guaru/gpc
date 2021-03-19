import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { tap } from 'rxjs/operators';
import { UserHttpService } from 'src/app/administrator/users/user-http.service';
import { AuthService } from 'src/app/core/auth/auth.service';
import { IEnabled } from 'src/app/core/interface/IEnabled';
import { IUserFormData } from 'src/app/core/interface/IUserFormData';
import { User } from 'src/app/core/models/user.model';
import { AlertService } from 'src/app/core/services/alert.service';
import { SpinnerService } from 'src/app/shared/components/spinner/spinner.service';
import { UserFormComponent } from 'src/app/shared/components/user-form/user-form.component';

@Injectable()
export class OperadorService {

  operadores: User[];
  private _selectOperador!:  User;

  public columns: string[] = ["name", "username", "enabled", "action"];

  constructor(private userHttpService:UserHttpService,
    private dialog:MatDialog,
    private loadingService:SpinnerService,
    private alertService: AlertService,
    private authService: AuthService
    ) {
    this.operadores = [];
  }


  public loadOperadores():Promise<boolean>
  {
    return new Promise(resolve => {
      this.loadingService.initLoading();
      this.userHttpService.getOperators(this.authService.user?.office?.id||'').subscribe(
        data=>{
          this.loadingService.endLoading();
          this.operadores =  data;
          resolve(true);
        },error =>{
          this.loadingService.endLoading();
           this.alertService.error("No fue posible cargar los operadores");
           resolve(false);
        }
      );
    });
  }

  create(){
    this._selectOperador = new User();
    this.openDialog();
  }

  update(id: string){
    this._selectOperador = this.operadores.find(_ => _.id === id) || new User();
    this.openDialog();
  }

  async delete(id: string) {
    const user = this.operadores.find(x => x.id === id);
    if (await this.alertService.confirm('Eliminara el operador ' + user?.userName)) {
      this.loadingService.initLoading();
      this.userHttpService.delete(id).subscribe(async response => {
        if (response) {
          this.loadingService.endLoading();
          await this.alertService.success();
          this.loadOperadores();
        }
      }, error => {
        this.loadingService.endLoading()
        this.alertService.error();
      }
      );
    }
  }

  async enabled(ienabled: IEnabled) {
    this.loadingService.initLoading();
    this.userHttpService.enabled(ienabled).subscribe(response => {
      if (response) {
        this.loadingService.endLoading();
        this.alertService.success();
      }
    }, error => {
      this.loadingService.endLoading()
      this.alertService.error();
    }
    );
  }


  private openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = { user: this._selectOperador, operator: true,
                         officeId: this.authService.user?.office?.id || '' ,
                         title:'Operador' } as IUserFormData ;

    const dialogRef = this.dialog.open(UserFormComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      async (data: User) => {
        if(data)
         await this.loadOperadores();
      }
    );
  }

}
