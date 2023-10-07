export class User {

  public id: number = 0; //Database IDs usually start at 1
  public name: string = ''
  public email: string = ''

  fromObject(props?: Partial<User>) {
    Object.assign(this, props);
    return this;
  }
}
