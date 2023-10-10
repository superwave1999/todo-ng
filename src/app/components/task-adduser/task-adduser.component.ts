import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-task-adduser',
  templateUrl: './task-adduser.component.html',
  styleUrls: ['./task-adduser.component.css'],
})
export class TaskAdduserComponent {

  public form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  })

  constructor(
    public dialogRef: MatDialogRef<TaskAdduserComponent>,
  ) {
  }

  submit() {
    this.dialogRef.close(this.form.value.email)
  }

  delete() {
    this.dialogRef.close();
  }
}
