import { Request, Response } from "express";
import { con } from "../config/config";
import { MysqlError } from "mysql";
import { QueryResult,FieldPacket } from "mysql2";
import { error } from "console";
import { all } from "../custom/custom";
export const renderTableData = async (req:Request<{},{},{},all>, res:Response) => {
  var { limit } = req.Pagination;
  var pid:string = req.query.page || '1';
  var order:string = req.query.order || 'asc';
  var field:string = req.query.field || 'id';

  const { startIndex, endIndex } = req.Pagination;
  
  con.query(`SELECT * FROM Student_Master order by ${field} ${order} limit ${startIndex},${10}`).then(([ rows,fields ]) => {
    res.render("table_with_orderby.ejs", {
      fields: fields,
      result: rows,
      pid: pid,
      order: order,
      field: field,
    });
}).catch((error)=>{
  throw error
})}
