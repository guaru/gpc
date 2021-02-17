export class Function {
  constructor(
    public id?:number,
    public name?: string,
    public icon?: string,
    public url?:string,
    public enabled?:boolean,
    public functionFather?:Function

  ) {

  }
}
