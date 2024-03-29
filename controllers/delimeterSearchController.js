import { con } from "../config/config.js";

var tokens = ["_", "^", "$", "}", "{", ":"];
var data;

function id(list) {
    var query = "(id ";
    for (let i = 0; i < list.length; i++) {
      if (i == list.length - 1) {
        query += ` like '%${list[i]}%')`;
      } else {
        query += ` like '%${list[i]}%' or id`;
      }
    }
    if (list.length > 0) {
      return query;
    } else {
      return "(id like '%''%')";
    }
  }
  function name(list) {
    var query = "(Name ";
    for (let i = 0; i < list.length; i++) {
      if (i == list.length - 1) {
        query += ` like '%${list[i]}%')`;
      } else {
        query += ` like '%${list[i]}%' or Name`;
      }
    }
    if (list.length > 0) {
      return query;
    } else {
      return "(name like '%''%')";
    }
  }
  
  function gender(list) {
    var query = "(gender ";
    for (let i = 0; i < list.length; i++) {
      if (i == list.length - 1) {
        query += ` like '%${list[i]}%')`;
      } else {
        query += ` like '%${list[i]}%' or gender`;
      }
    }
    if (list.length > 0) {
      return query;
    } else {
      return "(gender like '%''%')";
    }
  }
  
  function caste(list) {
    var query = "(caste ";
    for (let i = 0; i < list.length; i++) {
      if (i == list.length - 1) {
        query += ` like '%${list[i]}%')`;
      } else {
        query += ` like '%${list[i]}%' or caste`;
      }
    }
    if (list.length > 0) {
      return query;
    } else {
      return "(caste like '%''%')";
    }
  }
  
  function contactNo(list) {
    var query = "(contactNo ";
    for (let i = 0; i < list.length; i++) {
      if (i == list.length - 1) {
        query += ` like '%${list[i]}%')`;
      } else {
        query += ` like '%${list[i]}%' or contactNo`;
      }
    }
    if (list.length > 0) {
      return query;
    } else {
      return "(contactNo like '%''%')";
    }
  }
  
  function fathersName(list) {
    var query = "(fathersName ";
    for (let i = 0; i < list.length; i++) {
      if (i == list.length - 1) {
        query += ` like '%${list[i]}%')`;
      } else {
        query += ` like '%${list[i]}%' or fathersName`;
      }
    }
    if (list.length > 0) {
      return query;
    } else {
      return "(fathersName like '%''%')";
    }
  }
  function sqt() {
    var  sql = "select * from Student_Master where ";
  
    var list = Object.keys(data);
    var val = Object.values(data);
    console.log(data);
    let k = 0;
    // console.log(list);
    for (let i = 0; i < list.length; i++) {
      // console.log(i);
      if (data[list[i]].length > 0) {
        k++;
        switch (list[i]) {
          case "_":
            sql = sql + id(data["_"]);
  
            break;
          case "^":
            sql =   sql+"and" + name(data["^"]);
  
            break;
          case "$":
            sql =   sql+"and" + gender(data["$"]);
  
            break;
          case "}":
            sql =   sql+"and" + caste(data["}"]);
  
            break;
          case "{":
            sql =   sql+"and" + contactNo(data["{"]);
  
            break;
          case ":":
            sql =   sql+"and" + fathersName(data[":"]);
  
          default:
            break;
        }
      }
    }
    if (k == 1) {
      sql = sql.split("and");
      return sql[0];
    }
    return sql;
  }
  function splitMulti(str, tokens) {
    var a = {};
    a["_"] = new Array();
    a["^"] = new Array();
    a["$"] = new Array();
    a["}"] = new Array();
    a["{"] = new Array();
    a[":"] = new Array();
  
    var temp = [];
    var b;
    for (let i = 0; i < str.length; i++) {
      if (tokens.includes(str[i])) {
        temp = [];
        for (let j = i + 1; j < str.length; j++) {
          if (tokens.includes(str[j])) {
            b = j;
            break;
          } else {
            temp.push(str[j]);
          }
        }
  
        a[str[i]].push(temp.join(""));
      }
    }
    return a;
  }

export const renderdelimeterSearch =  (req, res) => {
    var query = req.body.query;
  
    data = splitMulti(query, tokens);
    //   console.log(data);
    //   console.log();
  
    console.log(sqt());
  
    con.query(sqt(), (err, results, fields) => {
      console.log(results);
      if (err) {
        res.send("Enter a valid Input");
      } else if (results.length <= 0) {
        res.send("Enter a valid Input");
      }
  
      res.render("delimeter_search.ejs", { results: results, fields: fields });
    });
  }