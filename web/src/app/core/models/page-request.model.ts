import { IFilter } from "../interface/IFilter";

export class PageRequest{
  constructor(
    public offset?: number,
    public limit?: number,
    public sortField?: String,
    public sortOrder?: number,
    public filters?: IFilter[]
  ) {

    this.offset = 0;
    this.limit = 10;
    this.sortField = '';
  }

}
