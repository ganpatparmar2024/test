import { QueryResult } from "mysql2";

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

export interface Page {
  randCode: string;
  id:string;
}

export interface AttendanceQuery {
  page: string;
  month: string;
}

interface all{
  page:string;
  order:string;
  field:string;
  }
export interface FormData{
   
       name: string[],
       lastName: string[],
       designation: string[],
       gender: string[],
       contactNo: string[],
       email: string[],
       relationshipStatus:string[], 
       birthday: string[],
       city: string[],
       zipcode:string[],
       state: string[],
       address1:string[],
       address2?:string[],
       education1?:string[],
       education2?:string[],
       education3?:string[],
       education4?:string[],
       companyName1?: string[],
       companyName2?: string[],
       companyName3?: string[],
       Language1?: string[],
       ability1?: string[],
       Language2?: string[],
       ability2?: string[],
       Language3?:string[],
       ability3?:string[],
       technology1?:string[],
       level1?: string[],
       technology2?:string[],
       level2?: string[],
       technology3?:string[],
       level3?:string[],
       person1?: string[],
       person2?: string[],
       person3?: string[],
       location?: string[],
       noticePerid?: string[],
       expectedCtc?: string[],
       currentCtc?: string[],
       department?: string[],
   }

export interface BasicDetails extends QueryResult{
        name: string,
       lastName: string,
       designation: string,
       gender: string,
       contactNo: string,
       email: string,
       relationshipStatus:string, 
       birthday: string,
       city: string,
       zipcode:string,
       state: string,
       address1:string,
       address2?:string,
}