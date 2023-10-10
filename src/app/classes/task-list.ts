import {TaskListItem} from "./task-list-item";
import {AbstractModel} from "./abstract-model";

export class TaskList extends AbstractModel {

  public id: number = 0; //Database IDs usually start at 1
  public name: string = ''
  public items: TaskListItem[] = [];

}
