import { Request, Response } from "express";
import { con } from "../config/config";
import { MysqlError } from "mysql";
import { FieldPacket, QueryResult, RowDataPacket } from "mysql2";
import { error } from "console";


interface PageId{
  page:string
}

export const renderResult = (req:Request<{},{},{},PageId>,res:Response)=>{
    var pid = req.query.page||1
    if (pid==undefined) {
      pid="1"
    }
    const { startIndex, endIndex } = req.Pagination;

    con.query(`select Student_Master.id,Student_Master.Name, sum(Result.Practical_marks) as pm, sum(Result.Theory_marks) as tm  FROM Student_Master  inner JOIN Result  ON Student_Master.id = Result.sid  group by Result.sid,Result.examid  limit ${startIndex},${30}`).then(([rows,fields])=>{
      res.render('result.ejs',{result:rows,pid:pid})
    }).catch(error=>{
      throw error
    })
  
    
    
    
  }