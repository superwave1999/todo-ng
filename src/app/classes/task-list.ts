import { TaskListItem } from './task-list-item';
import { AbstractModel } from './abstract-model';

export class TaskList extends AbstractModel {
  public id = 0; //Database IDs usually start at 1
  public name = '';
  public items: TaskListItem[] = [];
}
