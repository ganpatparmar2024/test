import { Request, Response } from "express";
import { con } from "../config/config";
import { FieldPacket, QueryResult } from "mysql2";
import { error } from "console";

interface abcd {
  page: string;
  month: string;
}

export const renderAttendce = async (
  req: Request<{}, {}, {}, abcd>,
  res: Response
) => {
  var pid = req.query.page || "1";
  var month = req.query.month || "1";

  console.log(month);

  const { startIndex, endIndex } = req.Pagination;

  if (pid == undefined || pid == "1") {
    con
      .query(
        `SELECT Student_Master.id, Student_Master.Name, COUNT(*) AS cnt, concat(round(( count(*)/30 * 100 ),2),'%') AS percentage
      FROM Student_Master 
     INNER JOIN Attendance ON Student_Master.id = Attendance.fk_student_id 
     where month(Attendance.date) = ${month} and Attendance.attendance = '1' group by Attendance.attendance,Student_Master.id limit ${startIndex},${10}`
      )
      .then(([rows, fields]) => {
        res.render("attendance.ejs", {
          fields: fields,
          result: rows,
          pid: 1,
          month: month,
        });
      })
      .catch((error) => {
        throw error;
      });
    //   con.query(`SELECT Student_Master.id, Student_Master.Name, COUNT(*) AS cnt, concat(round(( count(*)/30 * 100 ),2),'%') AS percentage
    //   FROM Student_Master
    //  INNER JOIN Attendance ON Student_Master.id = Attendance.fk_student_id
    //  where month(Attendance.date) = ${month} and Attendance.attendance = '1' group by Attendance.attendance,Student_Master.id limit ${startIndex},${10}`, function (err:string, result:QueryResult, fields:FieldPacket[]) {
    //     console.log(result);
    //     if (err) throw err;

    //     res.render("attendance.ejs", {
    //       fields: fields,
    //       result: result,
    //       pid: 1,
    //       month:month

    //     })
    //   })
  } else {
    con
      .query(
        `SELECT Student_Master.id, Student_Master.Name, COUNT(*) AS cnt, concat(round(( count(*)/30 * 100 ),2),'%') AS percentage
      FROM Student_Master 
     INNER JOIN Attendance ON Student_Master.id = Attendance.fk_student_id 
     where month(Attendance.date) = ${month} and Attendance.attendance = '1' group by Attendance.attendance,Student_Master.id limit ${startIndex},${10}`
      )
      .then(([rows, fields]) => {
        res.render("attendance.ejs", {
          fields: fields,
          result: rows,
          pid: pid,
          month: month,
        });
      })
      .catch((error) => {
        throw error;
      });
    //   con.query(`SELECT Student_Master.id, Student_Master.Name, COUNT(*) AS cnt, concat(round(( count(*)/30 * 100 ),2),'%') AS percentage
    //   FROM Student_Master
    //  INNER JOIN Attendance ON Student_Master.id = Attendance.fk_student_id
    //  where month(Attendance.date) = ${month} and Attendance.attendance = '1' group by Attendance.attendance,Student_Master.id limit ${startIndex},${10}`, function (err:string, result:QueryResult, fields:FieldPacket[]) {
    //     if (err) throw err;
    //     res.render("attendance.ejs", {
    //       fields: fields,
    //       result: result,
    //       pid: pid,
    //       month:month

    //     })

    //   })
    // }
  }
};
