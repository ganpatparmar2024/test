import { con } from "../config/config.js";

export const renderResult = (req,res)=>{
    var pid = req.query.page
    if (pid==undefined) {
      pid=1
    }
    const { startIndex, endIndex } = req.pagination;
    
   con.query(`select Student_Master.id,Student_Master.Name, sum(Result.Practical_marks) as pm, sum(Result.Theory_marks) as tm  FROM Student_Master  inner JOIN Result  ON Student_Master.id = Result.sid  group by Result.sid,Result.examid  limit ${startIndex},${30}`,function(err,result,fields){
      console.log(result)
      if(err) throw err;
       for( let i = 0; i <result.length; i+=3 ) { 
        console.log(result[i].Name  );
         for( let j = i; j <i+3; j++) { 
            console.log(result[j].pm);
            console.log(result[j].tm); 
        }
    }
      res.render('result.ejs',{result:result,pid:pid})  
     
    })
    
    
    
  }