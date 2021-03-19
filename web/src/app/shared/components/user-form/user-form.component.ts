import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IUserFormData } from 'src/app/core/interface/IUserFormData';
import { User } from 'src/app/core/models/user.model';
import { UserHttpService } from '../../../administrator/users/user-http.service';
import { UserFormService } from './user-form.service';

@Component({
  selector: 'gpc-user-form',
  templateUrl: './user-form.component.html',
  providers:[UserFormService,UserHttpService]
})
export class UserFormComponent implements OnInit {

  constructor(public userFormService:UserFormService,
    private dialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) data:IUserFormData) {
        this.userFormService.setModel(data.user);
        this.userFormService.buildFields(data.operator ?  data.operator :  false,
                                            data.officeId ?  data.officeId : '');
         if(data.title)
           this.userFormService._title = data.title;
     }

  ngOnInit(): void {

  }

  async onSave(){
     let user:User | null = await this.userFormService.save();
     if(user!=null)
       this.dialogRef.close(user);
  }

  onCancel(){
    this.dialogRef.close();
  }

}
