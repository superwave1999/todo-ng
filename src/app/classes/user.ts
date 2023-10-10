import { AbstractModel } from './abstract-model';

export class User extends AbstractModel {
  public id = 0; //Database IDs usually start at 1
  public name = '';
  public email = '';
}
