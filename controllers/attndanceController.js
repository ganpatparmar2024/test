import { con } from "../config/config.js";

export const renderAttendce = async (req, res) => {
    var pid = req.query.page
    var month = req.query.month
  
    console.log(month);
  
    if (month  == undefined) {
      month = "1"    
    }
  
    const { startIndex, endIndex } = req.pagination;
  
    if (pid == undefined || pid == 1) {
      con.query(`SELECT Student_Master.id, Student_Master.Name, COUNT(*) AS cnt, concat(round(( count(*)/30 * 100 ),2),'%') AS percentage
      FROM Student_Master 
     INNER JOIN Attendance ON Student_Master.id = Attendance.fk_student_id 
     where month(Attendance.date) = ${month} and Attendance.attendance = '1' group by Attendance.attendance,Student_Master.id limit ${startIndex},${10}`, function (err, result, fields) {
        console.log(result);
        if (err) throw err;
  
        res.render("attendance.ejs", {
          fields: fields,
          result: result,
          pid: 1,
          month:month
  
        })
      })
    }
  
    else {
      con.query(`SELECT Student_Master.id, Student_Master.Name, COUNT(*) AS cnt, concat(round(( count(*)/30 * 100 ),2),'%') AS percentage
      FROM Student_Master 
     INNER JOIN Attendance ON Student_Master.id = Attendance.fk_student_id 
     where month(Attendance.date) = ${month} and Attendance.attendance = '1' group by Attendance.attendance,Student_Master.id limit ${startIndex},${10}`, function (err, result, fields) {
        if (err) throw err;
        res.render("attendance.ejs", {
          fields: fields,
          result: result,
          pid: pid,
          month:month
  
        })
  
      })
    }
  }