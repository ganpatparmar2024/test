import { Request, Response } from "express";
import { con } from "../config/config";

var tokens: string[] = ["_", "^", "$", "}", "{", ":"];

var data: { [key: string]: [string] } = {};

function id(list: string[]):string {
  var query: string = "(id ";
  for (let i: number = 0; i < list.length; i++) {
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
function name(list: string[]):string {
  var query: string = "(Name ";
  for (let i: number = 0; i < list.length; i++) {
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

function gender(list: string[]):string {
  var query: string = "(gender ";
  for (let i: number = 0; i < list.length; i++) {
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

function caste(list: string[]):string {
  var query: string = "(caste ";
  for (let i: number = 0; i < list.length; i++) {
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

function contactNo(list: string[]):string {
  var query: string = "(contactNo ";
  for (let i: number = 0; i < list.length; i++) {
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

function fathersName(list: string[]):string {
  var query: string = "(fathersName ";
  for (let i: number = 0; i < list.length; i++) {
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
function sqt():string {
  var sql: string | string[] = "select * from Student_Master where ";

  var list: string[] = ["_", "^", "$", "}", "{", ":"];
  
  let k: number = 0;
  for (let i: number = 0; i < list.length; i++) {
    if (data[list[i]].length > 0) {
      k++;
      switch (list[i]) {
        case "_":
          sql = sql + id(data["_"]);

          break;
        case "^":
          if (k == 1) {
            sql = sql + name(data["^"]);
          } else {
            sql = sql + "and" + name(data["^"]);
          }

          break;
        case "$":
          if (k == 1) {
            sql = sql + gender(data["$"]);
          } else {
            sql = sql + "and" + gender(data["$"]);
          }

          break;
        case "}":
          if (k == 1) {
            sql = sql + caste(data["}"]);
          } else {
            sql = sql + "and" + caste(data["}"]);
          }

          break;
        case "{":
          if (k == 1) {
            sql = sql + contactNo(data["{"]);
          } else {
            sql = sql + "and" + contactNo(data["{"]);
          }

          break;
        case ":":
          if (k == 1) {
            sql = sql + fathersName(data[":"]);
          } else {
            sql = sql + "and" + fathersName(data[":"]);
          }

        default:
          break;
      }
    }
  }
  if (k == 1) {
    sql = sql.split("and");
    if (sql[1] != undefined) {
      return sql[0] + sql[1];
    } else {
      return sql[0];
    }
  }
  return sql;
}
function splitMulti(str: string, tokens: string[]):{
  [key: string]: [string];
}{
  var a: { [key: string]: [string] } = {};
  var temp: Array<string> = [];
  var b: number;
  for (let i:number = 0; i < str.length; i++) {
    if (tokens.includes(str[i])) {
      temp = [];
      for (let j: number = i + 1; j < str.length; j++) {
        if (tokens.includes(str[j])) {
          b = j;
          break;
        } else {
          temp.push(str[j]);
        }
      }

      // a[str[i]].push(temp.join(""));
      a[str[i]] = [temp.join("")];
    }
  }
  return a;
}

export const renderdelimeterSearch = (req: Request, res: Response):void => {
  var query:string = req.body.query;

  data = splitMulti(query, tokens);
  

  con
    .query(sqt())
    .then(([result, fields]) => {
      if (result === null) {
        res.send("such data does not present in our databse");
      } else {
        res.render("delimeter_search.ejs", { results: result, fields: fields });
      }
    })
    .catch((error) => {
      res.send("Enter a valid input");
      throw error;
    });
};
