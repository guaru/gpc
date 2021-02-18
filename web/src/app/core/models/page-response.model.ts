export class PageResponse<T>{


  constructor(public totalPages?: number,
              public totalElements?: number,
              public last?: boolean,
              public content?: T[]){

  }



}
