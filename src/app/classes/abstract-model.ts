

export abstract class AbstractModel {
  fromObject(props?: Partial<any>) {
    Object.assign(this, props);
    return this;
  }
}
