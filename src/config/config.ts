import mysql,{Pool} from "mysql2/promise";

var con:Pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "Union_Of_All",
  multipleStatements: true,
});

// con.connect(function (err) {
//   if (err) throw err;
//   console.log("database Connected Successfully");
// });

export{con}