import {Component, OnInit} from '@angular/core';
import {TaskListService} from "../../services/task-list.service";
import {MatDialog} from "@angular/material/dialog";
import {TaskDialogComponent} from "../../components/task-dialog/task-dialog.component";

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css'],
  providers: [TaskListService],
})
export class DashComponent implements OnInit {

  public tasks = this.service.tasks.asReadonly();



  constructor(
      private readonly service: TaskListService,
      public dialog: MatDialog
  ) {}

  async ngOnInit() {
    await this.service.getTasks();
  }

  openTaskList(id = 0) {
    this.dialog.open(TaskDialogComponent, {
      data: {id},
      maxHeight: '900px',
      maxWidth: '640px'
    });
  }

  async setTaskComplete(id = 0) {
    await this.service.setItemsComplete(id);
  }
}
