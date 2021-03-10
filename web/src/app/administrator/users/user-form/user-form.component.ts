import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/core/models/user.model';
import { UserHttpService } from '../user-http.service';
import { UserFormService } from './user-form.service';

@Component({
  selector: 'gpc-user-form',
  templateUrl: './user-form.component.html',
  providers:[UserFormService,UserHttpService]
})
export class UserFormComponent implements OnInit {

  constructor(public userFormService:UserFormService,
    private dialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) data: User) {
        this.userFormService.setModel(data);
        this.userFormService.buildFields();
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
