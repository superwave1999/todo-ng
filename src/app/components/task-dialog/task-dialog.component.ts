import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { TaskListService } from '../../services/task-list.service';
import { TaskListDetail } from '../../classes/task-list-detail';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { TaskAdduserComponent } from '../task-adduser/task-adduser.component';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.css'],
  providers: [TaskListService],
})
export class TaskDialogComponent implements OnInit {
  public loading = true;

  public form: FormGroup = new FormGroup({
    name: new FormControl(''),
    items: new FormArray([]),
  });

  constructor(
    public readonly userDialog: MatDialog,
    private readonly formBuilder: FormBuilder,
    private readonly service: TaskListService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<TaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number }
  ) {}

  async ngOnInit() {
    if (this.data.id) {
      this.loading = false;
      const response = await this.service.getTaskDetail(this.data.id);

      if (!response) {
        return;
      }
      if (response instanceof TaskListDetail) {
        this.buildForm(response);
        return;
      }
      this.dialogRef.close();
      this._snackBar.open(response?.message);
    } else {
      this.loading = false;
      this.buildForm();
    }
  }

  private buildForm(existing: TaskListDetail | null = null) {
    const itemFormGroups = [];
    if (existing) {
      for (const item of existing.items) {
        itemFormGroups.push(
          this.formBuilder.group({
            isComplete: [item.isComplete],
            text: [item.text],
          })
        );
      }
    }
    this.form = this.formBuilder.group({
      name: [existing ? existing.name : ''],
      items: this.formBuilder.array(itemFormGroups),
    });
  }

  async addNewItem() {
    const itemForm = new FormGroup({
      isComplete: new FormControl(false),
      text: new FormControl(''),
    });
    const formArray = <FormArray>this.form.get('items');
    formArray.push(itemForm);
  }

  getControl(item: string) {
    return (this.form.get(item) as FormArray).controls;
  }

  removeItem(index: number) {
    const formArray = <FormArray>this.form.get('items');
    formArray.removeAt(index);
  }

  async delete() {
    if (this.data.id) {
      await this.service.deleteTask(this.data.id);
    }
    this.dialogRef.close();
  }

  async submit() {
    if (this.data.id) {
      await this.service.updateTask(this.data.id, this.form.value);
    } else {
      await this.service.createTask(this.form.value);
    }
    this.dialogRef.close(this.form.value);
  }

  addUser() {
    this.userDialog
      .open(TaskAdduserComponent, {
        maxHeight: '900px',
        maxWidth: '320px',
      })
      .afterClosed()
      .subscribe(async userEmail => {
        if (userEmail) {
          await this.service.shareWithUser(this.data.id, userEmail);
        }
      });
  }

  close() {
    this.dialogRef.close();
  }
}
