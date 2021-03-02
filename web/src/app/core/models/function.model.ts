export class Function {
  constructor(
    public id?:string,
    public name?: string,
    public icon?: string,
    public url?:string,
    public enabled?:boolean,
    public functionFather?:Function

  ) {

  }
}
