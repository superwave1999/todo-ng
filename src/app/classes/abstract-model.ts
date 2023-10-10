export abstract class AbstractModel {
  fromObject(props?: Partial<AbstractModel>) {
    Object.assign(this, props);
    return this;
  }
}
