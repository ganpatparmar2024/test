import { con } from "../config/config.js";
var q;
var len;

 export const  getSubmit = (req, res) => {
    const { startIndex } = req.pagination;
    var pid = req.query.page;
    var query;
    if (pid == undefined) {
      pid = 1;
    }
    query = q + ` limit ${startIndex},${10};`;
  
    con.query(query, (err, results, fields) => {
      if (err) throw err;
      
      res.render("search_table.ejs", { results: results, fields: fields, pid: pid,len:len });
    });
    // res.redirect("/submit")
  }
  
export const postsubmit =  (req, res) => {
    const { startIndex } = req.pagination;
    var pid = req.query.page;
    if (pid == undefined) {
      pid = 1;
    }
    var query = req.body.query;
    q = query;
    query = query + ` limit ${startIndex},${10};` + q+";";
    console.log(query);
    con.query(query, (err, results, fields) => {
      if (err) throw err;
      console.log(results[0]);
      // console.log(results[1]);
       len = results[1].length/10
      res.render("search_table.ejs", { results: results[0], fields: fields[0], pid: pid,len:len });
    });
}