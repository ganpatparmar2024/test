declare namespace Express {
    export interface Request {
      pagination:{
        page:number,
        limit:number,
        startIndex:number,
        endIndex:number
      }   
    }
  }