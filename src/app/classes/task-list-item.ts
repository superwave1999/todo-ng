import {AbstractModel} from "./abstract-model";

export class TaskListItem extends AbstractModel {

  public text: string = '';
  public isComplete: boolean = false;

}
