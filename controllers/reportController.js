import { con } from "../config/config.js";
export const renderReport = (req,res)=>{
    var sid = req.query.id
    //console.log(sid)
    con.query(`select Name as Subject_Name from Subject; select Name as Exam_Name from Exam; select Student_Master.Name, Exam.Name as Exam_Name, Subject.Name as Subject_Name,Exam.Theory_marks as Total_theory_Marks, Result.Theory_marks as Obtain_Marks_theory,Exam.Practical_marks as Total_Practical_marks, Result.Practical_marks as Obtain_Marks_Practical  from Result inner join Student_Master on Student_Master.id = Result.sid   inner join Exam on Result.examid = Exam.id  inner join Subject on Result.Subjectid = Subject.id where Student_Master.id = ${sid} order by Subject.id`, function (error, results, fields) {
      if (error) throw error;
      // `results` is an array with one element for every statement in the query:
      res.render("report.ejs",{ Subjects:results[0],exam:results[1],result:results[2], sid:sid})
      // console.log(results[0]); // [{1: 1}]
      // console.log(results[1]); // [{2: 2}]
      console.log(results[2]);
      for (let i = 0; i < results[2].length; i+=3) {
          console.log(results[2][i].Subject_Name);
          for (let j = i; j < 3+i; j++) {
              console.log(results[2][j].Obtain_Marks_theory);
              console.log(results[2][j].Obtain_Marks_Practical);          
          }
        
      }
      
    });
  }