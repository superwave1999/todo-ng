import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TaskList } from '../../classes/task-list';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.css'],
})
export class TaskCardComponent {
  @Input({ required: true }) task!: TaskList;

  @Output() edit = new EventEmitter();

  @Output() completeTask = new EventEmitter();

  openEdit(id: number) {
    this.edit.emit(id);
  }

  setComplete(id: number) {
    this.completeTask.emit(id);
  }
}
