import mysql from "mysql2";

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "Auhentication",
  multipleStatements: true,
});

con.connect(function (err) {
  if (err) throw err;
  console.log("database Connected Successfully");
});

export{con}