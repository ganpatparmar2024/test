import { Request, Response } from "express";
import { con } from "../config/config";
import { MysqlError } from "mysql";
import { FieldPacket, QueryResult, RowDataPacket } from "mysql2";
var q:string;
var len:number;
interface PageId{
  page:string
}
 export const  getSubmit = (req:Request<{},{},{},PageId>, res:Response) => {
    const { startIndex } = req.Pagination;

    var pid = req.query.page||1;
    var query;
    
    query = q + ` limit ${startIndex},${10};`;
  
    con.query(query, (err:MysqlError, results:QueryResult, fields:FieldPacket[]) => {
      if (err) throw err;
      
      res.render("search_table.ejs", { results: results, fields: fields, pid: pid,len:len });
    });
    // res.redirect("/submit")
  }
  
export const postsubmit =  (req:Request<{},{},{},PageId>, res:Response) => {
    const { startIndex } = req.Pagination;
    var pid = req.query.page || '1';
    
    var query:string= req.body as string;
    q = query;
    query = query + ` limit ${startIndex},${10};` + q+";";
    console.log(query);
    con.query(query, (err:MysqlError, results:Array<RowDataPacket>, fields:FieldPacket[]) => {
      if (err) throw err;
      console.log(results[0]);
      // console.log(results[1]);
       len = results[1].length/10
      res.render("search_table.ejs", { results: results[0], fields: fields[0], pid: pid,len:len });
    });
}