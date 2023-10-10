import {AbstractModel} from "./abstract-model";

export class User extends AbstractModel {

  public id: number = 0; //Database IDs usually start at 1
  public name: string = ''
  public email: string = ''

}
